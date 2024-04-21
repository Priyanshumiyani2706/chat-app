import React, { useState } from 'react';
import './Register.css'; 
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Store/user/user.action';

const Register = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            dispatch(registerUser({ username }))
            setUsername('');
            setError('');
        } else {
            setError('Username is required');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="username-container">
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onFocus={() => setError(null)}
                            onChange={handleUsernameChange}
                            className="username-input"
                        />
                    </div>
                    <button className='button' type="submit">Register</button>
                </form>
            </div>
        </div>

    );
};

export default Register;
