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
                
                setValute(valutesState);
            })
    }

    useEffect(() => {
        getCourse();
        getCourseRate();
    }, [])

    function renderExchangeBlock(arr) {

        const btnsFilter = arr;
        const leftBtns = btnsFilter.map(item => {

            var f = function(e){  
                onValueChange(e, basicCurrency)
                calcInputLeft(e)
            }

            return (
                <button
                    id='leftBtn'
                    className={item.CharCode === 'RUB' ? 'active' : null}
                    value={item.CharCode}
                    key={item.ID}
                    onClick={f}>
                    {item.CharCode}
                </button>
            )
        })

        const rightBtns = btnsFilter.map(item => {

            var f = function(e){  
                onValueChange(e)
                calcInputRight(e)
            }

            return (
                <button
                    className={item.CharCode === 'USD' ? 'active' : null}
                    value={item.CharCode}
                    key={item.ID}
                    onClick={f}>
                    {item.CharCode}
                </button>
            )
        })

        const inputInfo = () => {
            
            return (
                <>
                    <div className="calc-block">
                        <div className="calc-block-input">
                            <input 
                            id="left" 
                            name='firstValute' 
                            value={valuteChange[0]} 
                            onChange={(e) => z(e.target.value, e.target.name)} 
                            type="number" />       
                        </div>
                        <div className="calc-block-input">
                            <input 
                            id="right"
                            name='secondValute' 
                            value={valuteChange[1]} 
                            onChange={(e) => z(e.target.value, e.target.name)} 
                            type="number" />       
                        </div>
                    </div>  
                </>
            )
        }

        const input = inputInfo();
    
        return (
            <>
            <div className="currency_switcher">
                <div id="leftbtn" className="currency_name">
                    {leftBtns}
                </div>      
                <div id="rightbtn" className="currency_name">
                    {rightBtns}
                </div>
            </div>
            {input}
            </>
        )
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

    const calcInputLeft = function() {
        let inputVal = document.querySelector('#left').value,
            btnLeftValue = document.querySelector('#leftbtn .active').value.toLowerCase(),
            btnRightValue = document.querySelector('#rightbtn .active').value.toLowerCase();
             

        let s = calcInput(inputVal, btnLeftValue,  btnRightValue)

        setValuteChange([inputVal, s])
    }

    const calcInputRight = function(   ) {
        let inputVal = document.querySelector('#right').value,
            btnLeftValue = document.querySelector('#leftbtn .active').value.toLowerCase(),
            btnRightValue = document.querySelector('#rightbtn .active').value.toLowerCase();

        let s = calcInput(inputVal, btnRightValue, btnLeftValue)

        setValuteChange([s, inputVal])
    }

    const calcInput = (value, val, val2) => {   
        
        let calc = +(value * (1 / valute[val] / 1 * valute[val2])).toFixed(2);

        return calc;
    }

    const z = function (value, name) {

        let val = basicCurrency[0].toLowerCase(),
        val2 = basicCurrency[1].toLowerCase(),
        firstValute = value,
        secondValute = +(value * (1 / valute[val] / 1 * valute[val2])).toFixed(2);
        setValuteChange([firstValute, secondValute])

        if (name === 'secondValute') {
            firstValute =  +(value * (1 / valute[val2] / 1 * valute[val])).toFixed(2) ;
            secondValute = value;
            setValuteChange([firstValute, secondValute])

            console.log(basicCurrency[0], basicCurrency[1])
        } 
    }

    const items = renderExchangeBlock(currency.filter(item =>['EUR','USD','RUB'].indexOf(item.CharCode) !== -1));

    console.log(process.env.USER_ID);

    return (
        <>
            {items}
        </>
    )
}

export {ExchangePage};
