import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../Components/LineChart/LineChart';

const Coin = () => {

  const {coinId} = useParams();

  const [coinData, setCoinData]=useState();
  const [historicalData, setHistoricalData]=useState();
  const {Currency}=useContext(CoinContext);

  const fetchCoinData =async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BGt5PxWXhq4iMBtKVAFJV5Lk'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res =>setCoinData(res))
      .catch(err => console.error(err));

  }
const fetchhistoricalData = async()=>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BGt5PxWXhq4iMBtKVAFJV5Lk'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${Currency.name}&days=10&interval=daily`, options)
    .then(res => res.json())
    .then(res => setHistoricalData(res))
    .catch(err => console.error(err));
}

useEffect(()=>{
  fetchCoinData();
  fetchhistoricalData();
},[Currency])

if(coinData && historicalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
       <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
       </div>

       <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{Currency.symbol} {coinData.market_data.current_price[Currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{Currency.symbol}{coinData.market_data.market_cap[Currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour high</li>
          <li>{Currency.symbol}{coinData.market_data.high_24h[Currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>{Currency.symbol}{coinData.market_data.low_24h[Currency.name].toLocaleString()}</li>
        </ul>
       </div>
    </div>
  )
}else{
  return (
    <div className='spinner'>
      <div className="spin">

      </div>
     
      </div>
       
    
  )
 

}
}

export default Coin