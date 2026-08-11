import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterShop() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        shopAddress: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // ==========================================
    // REGISTER SHOP
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {

            const response = await api.post(
                "/shops",
                formData
            );

            console.log(
                "Shop Registered:",
                response.data
            );

            setSuccess(
                "Shop registered successfully!"
            );

            setFormData({
                shopName: "",
                ownerName: "",
                shopAddress: ""
            });

            // After successful registration,
            // go to shop owner login

            setTimeout(() => {

                navigate("/shop-login");

            }, 1500);

        } catch (error) {

            console.error(
                "Shop Registration Error:",
                error
            );

            if (error.response) {

                console.log(
                    "Status:",
                    error.response.status
                );

                console.log(
                    "Backend Response:",
                    error.response.data
                );

                setError(
                    error.response.data?.message ||
                    "Unable to register shop."
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

    return (

        <main className="register-shop-page">

            <div className="register-shop-card">

                <h1>
                    Register Your Shop
                </h1>

                <p className="register-shop-subtitle">
                    Join NearMart and start selling
                    your products.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* SHOP NAME */}

                    <div className="form-group">

                        <label>
                            Shop Name
                        </label>

                        <input
                            type="text"
                            name="shopName"
                            placeholder="Enter shop name"
                            value={formData.shopName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* OWNER NAME */}

                    <div className="form-group">

                        <label>
                            Owner Name
                        </label>

                        <input
                            type="text"
                            name="ownerName"
                            placeholder="Enter owner name"
                            value={formData.ownerName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* SHOP ADDRESS */}

                    <div className="form-group">

                        <label>
                            Shop Address
                        </label>

                        <textarea
                            name="shopAddress"
                            rows="4"
                            placeholder="Enter complete shop address"
                            value={formData.shopAddress}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* SUCCESS MESSAGE */}

                    {success && (

                        <p className="success-message">
                            {success}
                        </p>

                    )}

                    {/* ERROR MESSAGE */}

                    {error && (

                        <p className="error-message">
                            {error}
                        </p>

                    )}

                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        className="register-shop-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Registering..."
                            : "Register Shop"
                        }

                    </button>

                </form>

                {/* BACK TO LOGIN */}

                <p className="register-link">

                    Already have a shop account?

                    <span
                        onClick={() =>
                            navigate("/shop-login")
                        }
                    >
                        Login
                    </span>

                </p>

            </div>

        </main>
    );
}

export default RegisterShop;