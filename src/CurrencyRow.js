import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <div>
            <input type="number" className='input' value={amount} onChange={onChangeAmount} min="1"/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map((option,i) => (
                    <option key={i} value={option}> {option} </option>
                ))}
                
            </select>
        </div>
    )
}