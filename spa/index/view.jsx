var Index = React.createClass({
    requiredModules: [
        "spa/info"
    ],
    requiredScripts: [
        'spa/bigLoader.jsx',
        'spa/loader.jsx'
    ],
    getInitialState() {
        return {
            element: "Info"
        };
    },
    getDefaultSubscriptions() {
        return {
            'ethereum/ping' : this.controller.loadData
        };
    },
    onClick(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        this.changeView(e.currentTarget.innerHTML);
    },
    changeView(element) {
        var _this = this;
        this.domRoot.children().find('a').removeClass("selected").each((i, it) => {
            if(it.innerHTML.toLowerCase() === element.toLowerCase()) {
                return $(it).addClass('selected');
            }
        });
        ReactModuleLoader.load({
            modules : [
                'spa/' + element.toLowerCase()
            ],
            callback: function() {
                _this.setState({element});
            }
        });
    },
    componentDidMount() {
        this.controller.loadData();
    },
    render() {
        var props = {};
        this.state && Object.entries(this.state).forEach(data => props[data[0]] = data[1]);
        return (
            <section className="OnePage">
                <section className="DisclamerBanner">
                    <h1>Disclamer</h1>
                    <p>The Switch Manager will start working at the ETH Block n 10432000</p>
                    <a href="https://etherscan.io/block/countdown/10432000" target="_Blank">Coountdown</a>
                </section>
                <header className="Head">
                    <section className="HBrand">
                        <h6>$buidl Switch</h6>
                    </section>
                    <section className="HActions">
                        <a href="https://dfohub.com" target="_Blank">#dfohub</a>
                        <a href="https://github.com/b-u-i-d-l/brand-contest" target="_Blank">#github</a>
                        <a href={window.getNetworkElement("etherscanURL") + "address/" + window.vasaPowerSwitch.options.address} target="_Blank">#etherscan</a>
                    </section>
                </header>
                <section className="PagerMenu">
                    <ul className="Menu">
                        <a href="javascript:;" className="InfoOpener selected" onClick={this.onClick}>Info</a>
                        <a href="javascript:;" className="SwitchOpener" onClick={this.onClick}>Switch</a>
                        <a href="javascript:;" className="StakeOpener" onClick={this.onClick}>Status</a>
                    </ul>
                </section>
                    {!props.slots && [<br/>, <Loader/>]}
                    {props.slots && React.createElement(window[this.state.element], props)}
            </section>
        );
    }
});