import { useNavigate } from "react-router-dom";

function LoginSelection() {

    const navigate = useNavigate();

    return (

        <main className="login-selection-page">

            <div className="login-selection-container">

                <h1>
                    Welcome to NearMart
                </h1>

                <p>
                    Choose how you want to continue
                </p>


                <div className="login-options">


                    {/* CUSTOMER */}

                    <div className="login-option-card">

                        <h2>
                            Customer
                        </h2>

                        <p>
                            Browse shops, explore products,
                            add products to your cart and
                            place orders.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/customer-login")
                            }
                        >
                            Customer Login
                        </button>

                    </div>


                    {/* SHOP OWNER */}

                    <div className="login-option-card">

                        <h2>
                            Shop Owner
                        </h2>

                        <p>
                            Manage your shop, add products
                            and manage your inventory.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/shop-login")
                            }
                        >
                            Shop Owner Login
                        </button>

                    </div>

                </div>

            </div>

        </main>

    );

}

export default LoginSelection;