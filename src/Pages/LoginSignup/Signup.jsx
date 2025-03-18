import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters long";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExists = users.some(user => user.email === formData.email);

    if (isUserExists) {
      alert('User already exists. Please login.');
    } else {
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful! Redirecting to login...');
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={formData.username} 
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required 
        />
        {errors.username && <p className="error">{errors.username}</p>}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required 
        />
        {errors.email && <p className="error">{errors.email}</p>}
        
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required 
        />
        {errors.password && <p className="error">{errors.password}</p>}
        
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
