// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/main.css'; // ✅ Link to external CSS

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/login/', formData);
            localStorage.setItem('token', res.data.access);
            navigate('/loans');
        } catch (err) {
            if (err.response?.status === 401) {
                if (window.confirm("User not found. Sign up instead?")) {
                    navigate('/signup');
                }
            } else {
                alert('Login failed: ' + (err.response?.data?.detail || 'Unknown error'));
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Staff Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Login</button>
                <p className="auth-link">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
