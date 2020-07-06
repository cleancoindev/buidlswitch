var IndexController = function (view) {
    var context = this;
    context.view = view;

    context.loadData = async function loadData() {
        var length = await window.blockchainCall(window.vasaPowerSwitch.methods.length);
        var slots = [];
        var currentSlot = null;
        var currentBlock = parseInt(await window.web3.eth.getBlockNumber());
        for(var i = 0; i < length; i++) {
            var data = await window.blockchainCall(window.vasaPowerSwitch.methods.timeWindow, i);
            slots.push(data);
            !currentSlot && currentBlock <= parseInt(data[0]) && (currentSlot = data);
        }
        var approved = !window.walletAddress ? false : parseInt(await window.blockchainCall(window.oldToken.methods.allowance, window.walletAddress, window.vasaPowerSwitch.options.address)) > 0;
        var balanceOf = !window.walletAddress ? '0' : await window.blockchainCall(window.oldToken.methods.balanceOf, window.walletAddress);
        var totalMintable = await window.blockchainCall(window.vasaPowerSwitch.methods.totalMintable);
        context.view.setState({slots, currentSlot, currentBlock, approved, balanceOf, totalMintable, newVotingTokenAddress : (await window.web3.eth.dfoHub.votingToken).options.address});
    };
};