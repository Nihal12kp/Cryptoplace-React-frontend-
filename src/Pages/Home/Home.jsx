import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../Context/CoinContext';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const Home = () => {
    const { allCoin, Currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');
    
    const navigate = useNavigate();  // Navigation hook

    // Check authentication status
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    const inputHandler = (e) => {
        setInput(e.target.value);
        if (e.target.value === "") {
            setDisplayCoin(allCoin);
        }
    };

    const searchHandler = async (e) => {
        e.preventDefault();
        const coins = allCoin.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );
        setDisplayCoin(coins);
    };

    const handleCoinClick = (id) => {
        if (isAuthenticated) {
            // If authenticated, navigate to coin details
            navigate(`/coin/${id}`);
        } else {
            // If not authenticated, show alert and navigate to login
            alert("Please log in or sign up to view coin details.");
            navigate('/login');
        }
    };

    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin]);

    return (
        <div className='home'>
            <div className="hero">
                <h1>Largest <br /> Crypto Marketplace</h1>
                <p>World’s largest crypto marketplace.
                    Sign up to discover crypto.</p>
                <form onSubmit={searchHandler}>
                    <input 
                        onChange={inputHandler} 
                        list='coinlist' 
                        value={input} 
                        type='text' 
                        placeholder='Search crypto' 
                        required 
                    />
                    <datalist id='coinlist'>
                        {allCoin.map((item, index) => (
                            <option key={index} value={item.name} />
                        ))}
                    </datalist>
                    <button type='submit'>Search</button>
                </form>
            </div>
            
            <div className="crypto-table">
                <div className="table-layout">
                    <p></p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>

                {displayCoin.slice(0, 10).map((item, index) => (
                    <div 
                        className="table-layout clickable" 
                        key={index} 
                        onClick={() => handleCoinClick(item.id)}
                    >
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{Currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                            {Math.floor(item.price_change_percentage_24h * 100) / 100}
                        </p>
                        <p className='market-cap'>{Currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
