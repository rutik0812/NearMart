import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ loginType }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/users/login",
                formData
            );

            console.log(
                "Login Response:",
                response.data
            );

            const data = response.data;

            // ======================================
            // CHECK TOKEN
            // ======================================

            if (!data.token) {

                setError(
                    "Login successful but JWT token was not received."
                );

                return;
            }

            // ======================================
            // CHECK LOGIN TYPE
            // ======================================

            if (
                loginType === "CUSTOMER" &&
                data.role !== "CUSTOMER"
            ) {

                setError(
                    "This account is not a customer account."
                );

                return;
            }

            if (
                loginType === "SHOP_OWNER" &&
                data.role !== "SHOP_OWNER"
            ) {

                setError(
                    "This account is not a shop owner account."
                );

                return;
            }

            // ======================================
            // SAVE JWT
            // ======================================

            localStorage.setItem(
                "token",
                data.token
            );

            // ======================================
            // SAVE USER INFORMATION
            // ======================================

            localStorage.setItem(
                "userId",
                data.userId
            );

            localStorage.setItem(
                "name",
                data.name
            );

            localStorage.setItem(
                "role",
                data.role
            );

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            setMessage(
                "Login successful!"
            );

            // ======================================
            // REDIRECT
            // ======================================

            setTimeout(() => {

                if (data.role === "CUSTOMER") {

                    navigate(
                        "/customer-dashboard"
                    );

                } else if (
                    data.role === "SHOP_OWNER"
                ) {

                    navigate(
                        "/shop-dashboard"
                    );

                } else if (
                    data.role === "ADMIN"
                ) {

                    navigate("/");

                } else {

                    navigate("/");

                }

            }, 700);

        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            if (error.response) {

                setError(
                    error.response.data?.message ||
                    error.response.data ||
                    "Invalid phone or password."
                );

            } else {

                setError(
                    "Unable to connect to server."
                );

            }

        } finally {

            setLoading(false);
        }
    };

    // ==========================================
    // LOGIN TITLE
    // ==========================================

    const title =
        loginType === "SHOP_OWNER"
            ? "Shop Owner Login"
            : "Customer Login";

    // ==========================================
    // LOGIN SUBTITLE
    // ==========================================

    const subtitle =
        loginType === "SHOP_OWNER"
            ? "Login to manage your NearMart shop."
            : "Login to continue shopping with NearMart.";

    return (

        <main className="login-page">

            <div className="login-card">

                <h1>
                    {title}
                </h1>

                <p className="login-subtitle">
                    {subtitle}
                </p>

                <form onSubmit={handleSubmit}>

                    {/* PHONE */}

                    <div className="form-group">

                        <label>
                            Phone
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            pattern="[6-9][0-9]{9}"
                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    {/* SUCCESS */}

                    {message && (

                        <p className="success-message">
                            {message}
                        </p>

                    )}

                    {/* ERROR */}

                    {error && (

                        <p className="error-message">
                            {error}
                        </p>

                    )}

                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>

                {/* =================================
                    REGISTER LINK
                ================================= */}

                <p className="register-link">

                    {loginType === "SHOP_OWNER"
                        ? "Don't have a shop?"
                        : "Don't have an account?"
                    }

                    <span
                        onClick={() => {

                            if (
                                loginType === "SHOP_OWNER"
                            ) {

                                navigate(
                                    "/register-shop"
                                );

                            } else {

                                navigate(
                                    "/register"
                                );

                            }

                        }}
                    >

                        {loginType === "SHOP_OWNER"
                            ? " Register Shop"
                            : " Create Account"
                        }

                    </span>

                </p>

                {/* CHANGE LOGIN TYPE */}

                <button
                    className="back-login-btn"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Change Login Type
                </button>

            </div>

        </main>
    );
}

export default Login;