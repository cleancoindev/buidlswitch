var SwitchController = function (view) {
    var context = this;
    context.view = view;

    context.transferEvent = window.web3.utils.sha3("Transfer(address,address,uint256)");

    context.loadItems = async function loadItems() {
        context.view.loading = true;
        context.view.forceUpdate();
        var items = {};
        var addr = window.addressBarParams.addr;
        var id = window.addressBarParams.id;
        delete window.addressBarParams.addr;
        delete window.addressBarParams.id;
        if(addr && id) {
            await context.renderItemsOfToken(context.view, window.newContract(window.context.ERC721ABI, addr), items, id);
        } else {
            await context.renderItemsOfToken(context.view, window.arte, items);
            await context.renderItemsOfToken(context.view, window.etra, items);
        }
        delete context.view.loading;
        context.view.forceUpdate();
    };

    context.renderItemsOfToken = async function renderItemsOfToken(view, token, items, id) {
        var tokenAddress = token.options.address;
        var ticker = await window.blockchainCall(token.methods.symbol);
        var balanceOf = parseInt(await window.blockchainCall(token.methods.balanceOf, window.context.robeAddress));
        for(var i = balanceOf - 1; i >= 0; i--) {
            var tokenId = await window.blockchainCall(token.methods.tokenOfOwnerByIndex, window.context.robeAddress, i);
            if(id && (tokenId + "") !== (id + "")) {
                continue;
            }
            var metadataLink = await window.blockchainCall(token.methods.tokenURI, tokenId);
            if(!metadataLink) {
                try {
                    var metadata = await window.blockchainCall(token.methods.metadata, tokenId);
                } catch(e) {
                    try {
                        var owner = await window.ethArt.getAddress(tokenId + "_owner");
                        if(owner === window.voidEthereumAddress) {
                            continue;
                        }
                    } catch(e) {
                        continue;
                    }
                }
            }
            var item = items[tokenId + "_" + tokenAddress] = {
                key: tokenId + "_" + tokenAddress,
                tokenId,
                metadataLink,
                openSeaLink : window.context.openSeaURL + tokenAddress + '/' + tokenId,
                etherscanLink : window.getNetworkElement('etherscanURL') + 'token/' + tokenAddress + '?a=' + tokenId,
                tokenAddress,
                ticker,
                artist : await context.getArtist(tokenAddress, tokenId),
                token,
                loading: true
            };
            view.setState({items});
            var metadata = {};
            try {
                metadata = await window.AJAXRequest(item.metadataLink.split('ipfs://').join('//gateway.ipfs.io/'));
            } catch(e) {
            }
            Object.keys(metadata).forEach(key => item[key] = metadata[key]);
            Object.keys(item).forEach(key => {
                try {
                    item[key] = item[key].split('ipfs://').join('//gateway.ipfs.io/');
                } catch(e) {
                }
            });
            delete item.loading;
            if(id && (tokenId + "") !== (id + "")) {
                delete context.view.loading;
            }
            view.setState({items});
            if(id && (tokenId + "") !== (id + "")) {
                break;
            }
        }
    };

    context.getArtist = async function getArtist(tokenAddress, tokenId, bruteforce) {
        var topics = [
            context.transferEvent,
            window.voidEthereumAddressExtended,
            []
        ];
        !bruteforce && topics.push(window.web3.eth.abi.encodeParameter("uint256", tokenId));
        var logs = await window.web3.eth.getPastLogs({
            address: tokenAddress,
            topics,
            fromBlock: '0'
        });
        if(logs.length === 0 && !bruteforce) {
            return await context.getArtist(tokenAddress, tokenId, true);
        }
        var creator = undefined;
        for(var log of logs) {
            var id = window.web3.eth.abi.decodeParameter("uint256", log.topics[3] || log.data);
            if(id === (tokenId + "")) {
                creator = window.web3.eth.abi.decodeParameter("address", log.topics[2]);
                break;
            }
        }
        return creator;
    };
};