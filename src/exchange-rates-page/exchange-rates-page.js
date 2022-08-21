import './exchange-rates-page.scss';

import {useEffect, useState} from 'react';

import {CbrServices} from '../services/CbrServices';

const ExchangeRatesPage = () => {

    const currencyInfo = new CbrServices();

    const [currency, setCurrency] = useState([]);
    const [valute, setValute] = useState({});
    const [basicCurrency, setBasicCurrency] = useState('RUB');
    const [usd, setUsd] = useState('');
    const [eur, setEur] = useState('');
    const [rub, setRub] = useState('');

    const getCourse = () => {
        currencyInfo.getAllCurr()
            .then(res => {

                let valutes = [{ID: 1, CharCode: 'RUB', Value: 1}, ...Object.values(res.Valute)],
                    valutesState = Object.keys(res.Valute).reduce(function (acc, v) {
                        acc[v.toLowerCase()] = res.Valute[v].Value;
                        return acc;
                    }, {rub: 1});

                console.log(valutes)
                console.log(valutesState)

                const {rub, usd, eur} = valutesState;
                setRub(rub);
                setUsd(usd);
                setEur(eur);
                setCurrency(valutes);
                setValute(valutesState);
            })
    }

    useEffect(() => {
        getCourse();
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
            let firstValute = {},
                secondValute = {};

            function changeInputInfo(currency) {

            }

            let mapping = {
                rub: ['USD', 'EUR'],
                usd: ['RUB', 'EUR'],
                eur: ['RUB', 'USD']
            }

            let val = basicCurrency.toLowerCase(),
                mapTo = mapping[val]

            firstValute = {name: mapTo[0], value: valute[mapTo[0].toLowerCase()]}
            secondValute = {name: mapTo[1], value: valute[mapTo[1].toLowerCase()]}


            // if (basicCurrency === 'RUB') {
            //     firstValute = {
            //         name: 'USD',
            //         value: usd
            //     }
            //     secondValute = {
            //         name: 'EUR',
            //         value: eur
            //     }
            // }
            //
            // if (basicCurrency === 'USD') {
            //     firstValute = {
            //         name: 'RUB',
            //         value: usd / rub
            //     }
            //     secondValute = {
            //         name: 'EUR',
            //         value: usd / eur
            //     }
            // }
            //
            // if (basicCurrency === 'EUR') {
            //     firstValute = {
            //         name: 'RUB',
            //         value: rub / eur
            //     }
            //     secondValute = {
            //         name: 'USD',
            //         value: usd / eur
            //     }
            // }

            return (
                <>
                    <div className="rate-info">
                        <span>Цена {firstValute.name}</span>
                        <input value={firstValute.value} type="text" readOnly/>
                        <hr/>
                    </div>
                    <div className="rate-info">
                        <span>Цена {secondValute.name}</span>
                        <input value={secondValute.value} type="text" readOnly/>
                        <hr/>
                    </div>
                </>
            )
        }

        const input = inputInfo();

        return (
            <>
                <div className="dropdown">
                    <button className="dropbtn">{basicCurrency}</button>
                    <div className="dropdown-content">
                        {btns}
                    </div>
                </div>
                {input}
            </>
        )
    }

    const onValueChange = (e) => {
        e.preventDefault();
        setBasicCurrency(e.target.value);
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