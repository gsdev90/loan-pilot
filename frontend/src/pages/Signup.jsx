// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/main.css'; // ✅ Shared with Login for consistent styling

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/signup/', formData);
            const loginRes = await axios.post('http://localhost:8000/api/login/', {
                username: formData.username,
                password: formData.password
            });
            localStorage.setItem('token', loginRes.data.access);
            alert('Signup and login successful!');
            navigate('/loans');
        } catch (err) {
            alert('Error: ' + (err.response?.data?.detail || err.response?.data?.error || 'Unknown error'));
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSignup}>
                <h2>Sign Up</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Sign Up</button>
                <p className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
