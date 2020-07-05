var StatusController = function (view) {
    var context = this;
    context.view = view;

    context.vote = async function vote(item, wei) {
        if(parseInt(await window.web3.eth.getBlockNumber()) >= parseInt(await window.blockchainCall(window.contest.methods.getSurveyEndBlock))) {
            return alert('Survey has ended!');
        }
        await window.blockchainCall(wei, window.contest.methods.vote, item.token.options.address, item.tokenId, item.artist);
        $.publish('leading/refresh');
    }
};