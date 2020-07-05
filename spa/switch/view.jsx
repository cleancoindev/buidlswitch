var Switch = React.createClass({
    
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    
    render() {
        return (<section>
            <section className="switchBox">
            <h3>Switch</h3>
                <section className="switchTools">
                    <a className="switchAll">Max</a>
                    <input type="number"></input>
                    <a className="switchLink">$BUIDL<b> V1</b></a>
                    <img src="/assets/img/buidl-logo.png"></img>
                </section>
            <h3>For</h3>
                <section className="switchTools">
                    <span className="switchFinal">250</span>
                    <a className="switchLink">$buidl<b> V2</b></a>
                    <img src="/assets/img/buidlv2-logo.png"></img>
                </section>
                <section className="switchActions">
                    <a className="switchAction active">Approve</a>
                    <a className="switchAction">Switch</a>
                </section>
                <p>Current Switch bonus is <b>X1.5</b> until the block n. </p>
                <p>Disclamer: Switching $BUIDL V1 to $buidl V2 is an irreversible action, do it at your own risk</p>
            </section>
        </section>);
    }
});