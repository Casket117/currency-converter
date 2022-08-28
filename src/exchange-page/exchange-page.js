import './exchange-page.scss';

import { useState, useEffect } from 'react';

import { CbrServices } from '../services/CbrServices';

const ExchangePage = () => {

    const currencyInfo = new CbrServices();

    const [currency, setCurrency] = useState([]);
    const [basicCurrency, setBasicCurrency] = useState(['RUB', 'USD']);
    const [valute, setValute] = useState({});
    const [valuteChange, setValuteChange] = useState(['', ''])

    const getCourse = () => {
        currencyInfo.getAllCurr()
            .then(res => {
                let valutes = [{ID: 1, CharCode: 'RUB', Value: 1}, ...Object.values(res.Valute)];
                
                setCurrency(valutes);  
            })
    }
    
    const getCourseRate = () => {
        currencyInfo.getAllCurrRate()
            .then(res => {
                let valutesState = Object.keys(res.rates).reduce(function (acc, v) {
                    acc[v.toLowerCase()] = res.rates[v];
                    return acc;
                }, {rub: 1});
                console.log(valutesState)
                setValute(valutesState);
            })
    }

    useEffect(() => {
        getCourse();
        getCourseRate();
    }, [])

    console.log(currency);

    function renderExchangeBlock(arr) {
        const btnsFilter = arr.filter(item => item.CharCode === 'EUR' || item.CharCode === 'USD' || item.CharCode === 'RUB');

        const leftBtns = btnsFilter.map(item => {

            return (
                <button
                    className={item.CharCode === 'RUB' ? 'active' : null}
                    value={item.CharCode}
                    key={item.ID}
                    onClick={(e) => onValueChange(e, basicCurrency)}>
                    {item.CharCode}
                </button>
            )
        })

        const rightBtns = btnsFilter.map(item => {

            return (
                <button
                    className={item.CharCode === 'USD' ? 'active' : null}
                    value={item.CharCode}
                    key={item.ID}
                    onClick={onValueChange}>
                    {item.CharCode}
                </button>
            )
        })

        const inputInfo = () => {
            
            return (
                <>
                    <div className="calc-block">
                        <div className="calc-block-input">
                            <input name={'firstValute'} value={(+valuteChange[0]).toFixed(0)} onChange={onChange} type="number" />       
                        </div>
                        <div className="calc-block-input">
                            <input name='secondValute' value={(+valuteChange[1]).toFixed(0)} onChange={onChange} type="number" />       
                        </div>
                    </div>  
                </>
            )
        }

        const input = inputInfo();
    
        return (
            <>
            <div className="currency_switcher">
                <div className="currency_name">
                    {leftBtns}
                </div>      
                <div className="currency_name">
                    {rightBtns}
                </div>
            </div>
            {input}
            </>
        )
    }

    const onChange = (e) => {   

        let val = basicCurrency[0].toLowerCase(),
            val2 = basicCurrency[1].toLowerCase(),
            value = e.target.value,
            name = e.target.name,
            firstValute = '',
            secondValute = '';
            

        if (name === 'firstValute') {
            firstValute = value;
            secondValute = value * (1 / valute[val2] / 1 * valute[val]);
            setValuteChange([firstValute, secondValute])
        }

        if (name === 'secondValute') {
            firstValute =  (1 / valute[val2] / 1 * valute[val]) * value ;
            secondValute = value;
            setValuteChange([firstValute, secondValute])
        }

        if (basicCurrency[0] === basicCurrency[1]) {
            firstValute = value;
            secondValute = value;
            setValuteChange([firstValute, secondValute])
        }
        
    }

    const onValueChange = (e, baza) => {
        e.preventDefault();

        let btn = e.target;

        baza === basicCurrency 
            ? setBasicCurrency(basicCurrency => [btn.value, basicCurrency[1]])
            : setBasicCurrency(basicCurrency => [basicCurrency[0], btn.value]);

        btn.parentElement.childNodes.forEach(item => {
            item.classList.remove('active');
        });

        btn.classList.add('active');
    }

    const items = renderExchangeBlock(currency);

    console.log(basicCurrency);

    
    return (
        <>
            {items}
        </>
    )
}

export {ExchangePage};
