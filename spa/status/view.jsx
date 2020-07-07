var Status = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    componentDidMount() {
        this.controller.refreshTotalSupply();
    },
    render() {
        return (
        <section>
            <section className="statusBox">
                <h2>Flippening Watch</h2>
                <section className="statusTitle">
                    <section className="statusFlip">
                        <img src="/assets/img/buidl-logo.png"></img> 
                        <a>$BUIDL V1</a>
                        <h3>{this.state && this.state.oldSupply && window.fromDecimals(this.state.oldSupply, 18)}</h3> 
                        <h6>Circulating Supply</h6>
                    </section>
                    <section className="statusFlip">
                    <img src="/assets/img/buidlv2-logo.png"></img> 
                        <a>$buidl V2</a>
                        <h3>{this.state && this.state.newSupply && window.fromDecimals(this.state.newSupply, 18)}</h3> 
                        <h6>Circulating Supply</h6>
                    </section>
                </section>
            </section>
            <section className="statusBox">
                <h2>Switch Status:</h2>
                <ul>
                        
                    {this.props.slots && this.props.slots.map((it, i) => <li key={i}>
                        <h1>x {window.numberToString(parseInt(it[1]) / parseInt(it[2]))}</h1>
                        <h5>End Block: <a href={window.getNetworkElement("etherscanURL") + "block/" + it[0]} target="_blank">{it[0]}</a></h5>
                        <h5>Status: <a className={this.props.slots.indexOf(this.props.currentSlot) === i ? "Active" : this.props.slots.indexOf(this.props.currentSlot) < i ? "Next" : "Ended"}>{this.props.slots.indexOf(this.props.currentSlot) === i ? "Active" : this.props.slots.indexOf(this.props.currentSlot) < i ? "Next" : "Ended"}</a></h5>
                    </li>)}
                </ul>
            </section>
        </section>
        );
    }
});