var Status = React.createClass({
    
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],

    render() {
        return (
        <section>
            <section className="statusBox">
                <h2>Flippening Watch</h2>
                <section className="statusTitle">
                    <section className="statusFlip">
                        <img src="/assets/img/buidl-logo.png"></img> 
                        <a>$BUIDL V1</a>
                        <h3>25000</h3> 
                        <h6>Circulating Supply</h6>
                    </section>
                    <section className="statusFlip">
                    <img src="/assets/img/buidlv2-logo.png"></img> 
                        <a>$buidl V2</a>
                        <h3>30000</h3> 
                        <h6>Circulating Supply</h6>
                    </section>
                </section>
            </section>
            <section className="statusBox">
                <h2>Switch Status:</h2>
                <ul>
                    <li>
                        <h1>x 1.5</h1>
                        <h5>End Block: <a></a></h5>
                        <h5>Status: <a>Finished</a></h5>
                    </li>
                    <li>
                        <h1>x 1.4</h1>
                        <h5>End Block: <a></a></h5>
                        <h5>Status: <a>Active</a></h5>
                    </li>
                    <li>
                        <h1>x 1.3</h1>
                        <h5>End Block: <a></a></h5>
                        <h5>Status: <a>Next</a></h5>
                    </li>
                    <li>
                        <h1>x 1.2</h1>
                        <h5>End Block: <a></a></h5>
                        <h5>Status: <a>Next</a></h5>
                    </li>
                </ul>
            </section>
        </section>
        );
    }
});