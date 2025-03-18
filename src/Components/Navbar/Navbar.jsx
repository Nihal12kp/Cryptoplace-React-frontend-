import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';
import { CoinContext } from '../../Context/CoinContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);  // Store current user info
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (token === 'true' && user) {
      setIsLoggedIn(true);
      setCurrentUser(user);  // Load user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/login');
  };

  const CurrencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": setCurrency({ name: "usd", symbol: "$" }); break;
      case "eur": setCurrency({ name: "eur", symbol: "€" }); break;
      case "inr": setCurrency({ name: "inr", symbol: "₹" }); break;
      default: setCurrency({ name: "usd", symbol: "$" }); break;
    }
  };

  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img className='logo' src={logo} alt="Logo" />
      </Link>

      <ul>
        <Link to={'/'}> <li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="nav-right">
        <select onChange={CurrencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>

        <div 
          className="dropdown-container"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="btn-dropdown">
            Account <img src={arrow_icon} alt="Arrow" />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  {/* Display current user's name or email */}
                  <div className="dropdown-item user-info">
                    👤 {currentUser?.username || currentUser?.email}
                  </div>
                  <Link to="/" className="dropdown-item">Profile</Link>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="dropdown-item">Login</Link>
                  <Link to="/signup" className="dropdown-item">Signup</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
