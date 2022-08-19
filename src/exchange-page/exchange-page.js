import './exchange-page.scss';

const ExchangePage = () => {
    return (
        <>
            <div className="currency_switcher">
                <div className="currency_name">
                    <button>USD</button>
                    <button>EUR</button>
                    <button>RUB</button>
                </div>      
                <div className="currency_name">
                    <button>USD</button>
                    <button>EUR</button>
                    <button>RUB</button>
                </div>
            </div>
            <div className="calc-block">
                <div className="calc-block-input">
                    <input type="text" />       
                </div>
                <div className="calc-block-input">
                    <input type="text" />       
                </div>
            </div>
        </>
    )
}

export {ExchangePage};
