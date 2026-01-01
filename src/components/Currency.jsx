import React, { useState } from 'react'
import '../css/currency.css'
import { FaArrowRight } from "react-icons/fa6";
import axios from 'axios';


let API_KEY = ''

function Currency() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [result, setResult] = useState(0);

    const exchange = async () => {
        try {
            const response = await axios.get(
                'https://api.freecurrencyapi.com/v1/latest',
                {
                    params: {
                        apikey: API_KEY,
                        base_currency: fromCurrency
                    }
                }
            );

            const rate = response.data.data[toCurrency];
            const converted = (amount * rate).toFixed(2);

            setResult(converted);
        } catch (error) {
            console.error("Döviz çevirme hatası:", error);
        }
    };


    return (
        <div className='currency-div'>
            <div className='title'>
                <h3>DÖVİZ KURU UYGULAMASI</h3>
            </div>

            <div className='currency-section'>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='amount' placeholder='Miktar' />

                <select onChange={(e) => setFromCurrency(e.target.value)} className='from-currency-option' value={fromCurrency}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                </select>

                <FaArrowRight style={{ fontSize: '25px', color: '#555' }} />

                <select onChange={(e) => setToCurrency(e.target.value)} className='to-currency-option' value={toCurrency}>
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <input value={result} readOnly type="number" className='result' placeholder='Sonuç' />
            </div>

            <div>
                <button onClick={exchange} className='convert-btn'>Çevir</button>
            </div>
        </div>
    )
}

export default Currency