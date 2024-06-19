import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [amt, setAmt] = useState(1);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("INR");
  const [convAmt, setConvAmt] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const exchange = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurr}`;

        const res = await axios.get(url);
        setExchangeRate(res.data.rates[toCurr]);
      } catch (error) {
        console.log("Error fetching ", error);
      }
    };
    exchange();
  }, [fromCurr, toCurr]);

  useEffect(()=> {
    if(exchangeRate!==null)
      {
        setConvAmt((amt * exchangeRate).toFixed(2));
      }
  },[amt, exchangeRate]);

  const amtChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmt(isNaN(value) ? 0 : value);
  };

  const fromCurrChange = (e) => {
    setFromCurr(e.target.value);
  };

  const toCurrChange = (e) => {
    setToCurr(e.target.value);
  };

  return (
    <>
      <h1>Currency Converter</h1>

      <input type="number" id="amt" value={amt} onChange={amtChange} />

      <select id="fromCurrency" value={fromCurr} onChange={fromCurrChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="JPY">JPY</option>
        <option value="BRL">BRL</option>
      </select>

      <select id="toCurrency" value={toCurr} onChange={toCurrChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="JPY">JPY</option>
        <option value="BRL">BRL</option>
      </select>

      <h2>
        {amt} {fromCurr} is equal to {convAmt} {toCurr}{" "}
      </h2>
    </>
  );
}

export default App;
