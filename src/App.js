import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

 const BASE_URL = 'https://api.exchangerate.host/latest/' //base: EUR

// const BASE_URL = 'https://currencyapi.net/api/v1/rates?key=POV1YHX3Alaoy2MdcEAnnaKpLYdkBcdmFRqP'

function App() {

  const [currencyOptions, setcurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState() 
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [date, setDate] = useState()
  // const [symbols, setSymbols] = useState()
  

  // console.log(setDate);

  let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }

  console.log(setAmountInFromCurrency)
  console.log(setAmount)
  // console.log(exchangeRate)
  //console.log(setDate)


  // console.log(currencyOptions)

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      
      const firstCurrency = Object.keys(data.rates)[66] // INR
      setcurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
      // setDate((data.date).split("-").reverse().join("-"));
      const date = ((data.date).split("-").reverse().join("-"));
      setDate(date)
      
    })
  }, []) 

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
      console.log("fromCurrency", fromCurrency)
      console.log("toCurrency", toCurrency)
    }    
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    
    <div className="container">
      <form>
      <h1>Currency Converter</h1> <br/>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)} 
      
        onChangeAmount={handleFromAmountChange}
        amount = {fromAmount}
      />
      <div className='equals'>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount = {toAmount}
      /> <br />
      <p>Exchange Rate: <span>1</span> {fromCurrency} = <span> {exchangeRate} </span> {toCurrency} </p>
<br />
      <p>Updated on: {date} </p>

 


      </form>
    </div>
  );
}

export default App;
