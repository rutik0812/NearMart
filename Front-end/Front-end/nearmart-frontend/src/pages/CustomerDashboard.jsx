import { useNavigate } from "react-router-dom";

function CustomerDashboard() {

    const navigate = useNavigate();

    const name =
        localStorage.getItem("name") || "Customer";


    // ============================
    // LOGOUT
    // ============================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");

        navigate("/login");

    };


    return (

        <main className="dashboard-page">

            <div className="dashboard-container">


                {/* ============================
                    HEADER
                ============================ */}

                <div className="dashboard-header">

                    <h1>
                        Welcome, {name}
                    </h1>

                    <p>
                        Your NearMart customer dashboard
                    </p>

                </div>


                {/* ============================
                    DASHBOARD CARDS
                ============================ */}

                <div className="dashboard-grid">


                    {/* ============================
                        EXPLORE SHOPS
                    ============================ */}

                    <div className="dashboard-card">

                        <h2>
                            Explore Shops
                        </h2>

                        <p>
                            Browse shops and discover
                            products available near you.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/shops")}
                        >
                            View Shops
                        </button>

                    </div>


                    {/* ============================
                        SHOPPING CART
                    ============================ */}

                    <div className="dashboard-card">

                        <h2>
                            Shopping Cart
                        </h2>

                        <p>
                            View your selected products
                            and place your order.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/cart")}
                        >
                            View Cart
                        </button>

                    </div>


                    {/* ============================
                        MY ORDERS
                    ============================ */}

                    <div className="dashboard-card">

                        <h2>
                            My Orders
                        </h2>

                        <p>
                            View your previous orders
                            and bills.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/orders")}
                        >
                            My Orders
                        </button>

                    </div>


                </div>


                {/* ============================
                    LOGOUT
                ============================ */}

                <button
                    type="button"
                    className="dashboard-logout"
                    onClick={logout}
                >
                    Logout
                </button>


            </div>

        </main>

    );

}

export default CustomerDashboard;