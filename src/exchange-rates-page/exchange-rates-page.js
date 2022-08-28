import './exchange-rates-page.scss';

import { useState, useEffect } from 'react';

import { CbrServices } from '../services/CbrServices';

const ExchangeRatesPage = () => {

    const currencyInfo = new CbrServices();

    const [currency, setCurrency] = useState([]);
    const [basicCurrency, setBasicCurrency] = useState('RUB');
    const [valute, setValute] = useState({});

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

    function renderExchangeBlock(arr) {
        const btnsFilter = arr.filter(item => item.CharCode === 'EUR' || item.CharCode === 'USD' || item.CharCode === 'RUB');

        const btns = btnsFilter.map(item => {
            return (
                <button
                    value={item.CharCode}
                    key={item.ID}
                    onClick={onValueChange}>
                    {item.CharCode}
                </button>
            )
        })

        const inputInfo = () => {
            let mapping = {
                rub: ['USD', 'EUR'],
                usd: ['RUB', 'EUR'],
                eur: ['RUB', 'USD']
            }

            let val = basicCurrency.toLowerCase(),
                mapTo = mapping[val],
                firstValute = {},
                secondValute = {name: mapTo[1], value: (1 / valute[mapTo[1].toLowerCase()] / 1 * valute[val]).toFixed(4)};

            val === 'rub' 
                ? firstValute = {name: mapTo[0], value: (1 / valute[mapTo[0].toLowerCase()]).toFixed(4)} 
                : firstValute = {name: mapTo[0], value: (1 / valute[val]).toFixed(4)};

            return (
                <>
                    <div className="rate-info">
                        <span>Цена {firstValute.name}</span>
                        <input value={firstValute.value} type="text" readOnly/>
                        <hr/>
                    </div>
                    <div className="rate-info">
                        <span>Цена {secondValute.name}</span>
                        <input value={secondValute.value}type="text" readOnly/>
                        <hr/>
                    </div>
                </>
            )
        }

        const input = inputInfo();

        return (
            <>
            <div className="dropdown">
                <button onClick={onActiveCurrency} 
                        className="dropbtn">{basicCurrency}</button>
                <div className="dropdown-content">
                    {btns}
                </div>
            </div>
            {input}
            </>
        )
    }

    const changeActive = (active) => {
        active.contains('active') === true ? active.remove('active') : active.add('active');
    }

    const onValueChange = (e) => {
        e.preventDefault();
        setBasicCurrency(e.target.value); 
        e.target.parentElement.previousElementSibling.classList.toggle('active');

        let target = e.target.parentElement.classList;

        changeActive(target);
    }

    const onActiveCurrency = (e) => {
        e.preventDefault(); 
        e.target.nextElementSibling.classList.toggle('active');

        let target = e.currentTarget.classList;

        let dropBtn = document.querySelector('.dropbtn'),
            dropContent = document.querySelector('.dropdown-content');

        function hideActive() {
                dropBtn.classList.remove('active');
                dropContent.classList.remove('active');
        }

        document.addEventListener('click', (e) => {
            if (e.target !== dropBtn) { 
                hideActive();
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') { 
                hideActive();
            }
        })
        
        changeActive(target);
    }

    const items = renderExchangeBlock(currency);

    return (
        <div className="exchange-rate-block">
            <p id='rate'>Курсы валют</p>
            <p>Выбрать валюту</p>
            {items}
        </div>
    )
}

export {ExchangeRatesPage};