import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        deliveryAddress: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await api.post(
                "/users/register",
                formData
            );

            console.log(response.data);

            setMessage("Registration successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);

            if (error.response) {

                setError(
                    error.response.data?.message ||
                    "Registration failed."
                );

            } else {

                setError(
                    "Unable to connect to server."
                );

            }

        }
    };

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Join NearMart and shop from local stores.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Name */}

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Phone */}

                    <div className="form-group">

                        <label>Phone</label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter 10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            pattern="[6-9][0-9]{9}"
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Delivery Address */}

                    <div className="form-group">

                        <label>Delivery Address</label>

                        <textarea
                            name="deliveryAddress"
                            placeholder="Enter your delivery address"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            rows="3"
                            required
                        />

                    </div>


                    {/* Success Message */}

                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}


                    {/* Error Message */}

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Create Account
                    </button>

                </form>


                <p className="login-link">

                    Already have an account?

                    <span
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Register;