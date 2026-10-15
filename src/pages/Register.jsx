import React, { useState } from 'react'
import { validateName, validateEmail, , validatePassword, validateConfirmPassword } from '../utils/validation';

function Register() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [errors, setErrors] = useState({});

    function validateForm() {
        const newErrors = {
            name: validateName(name),
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPass: validateConfirmPassword(password, confirmPass)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }


    }


    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <input
                    type="password"
                    name="confirmPass"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    minLength={8}
                    required
                />

                {errors.confirmPass && <p className="error">{errors.confirmPass}</p>}
                <button type='submit' >Register</button>
            </form>

        </div>
    )
}

export default Register