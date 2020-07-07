var StatusController = function (view) {
    var context = this;
    context.view = view;

    context.refreshTotalSupply = async function refreshTotalSupply() {
        context.view.setState({
            oldSupply : await window.blockchainCall(window.oldToken.methods.totalSupply),
            newSupply : await window.blockchainCall((await window.web3.eth.dfoHub.votingToken).methods.totalSupply)
        });
    }
};