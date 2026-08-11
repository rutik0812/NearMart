import { useNavigate } from "react-router-dom";

function ShopDashboard() {

    const navigate = useNavigate();

    const name =
        localStorage.getItem("name") ||
        "Shop Owner";


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


                <div className="dashboard-header">

                    <h1>
                        Welcome, {name}
                    </h1>

                    <p>
                        Manage your NearMart shop
                    </p>

                </div>


                <div className="dashboard-grid">


                    {/* ADD SHOP */}

                    <div className="dashboard-card">

                        <h2>
                            Add Shop
                        </h2>

                        <p>
                            Register your shop on
                            NearMart.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/register-shop"
                                )
                            }
                        >
                            Register Shop
                        </button>

                    </div>


                    {/* INVENTORY */}

                    <div className="dashboard-card">

                        <h2>
                            Add Inventory
                        </h2>

                        <p>
                            Add products, prices and
                            stock to your shop.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/inventory"
                                )
                            }
                        >
                            Add Inventory
                        </button>

                    </div>


                    {/* MY SHOPS */}

                    <div className="dashboard-card">

                        <h2>
                            My Shops
                        </h2>

                        <p>
                            View and manage your
                            registered shops.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/shops")
                            }
                        >
                            Manage Shops
                        </button>

                    </div>


                    {/* PRODUCTS */}

                    <div className="dashboard-card">

                        <h2>
                            Manage Products
                        </h2>

                        <p>
                            Manage products and
                            inventory.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/inventory"
                                )
                            }
                        >
                            Manage Inventory
                        </button>

                    </div>

                </div>


                <button
                    className="dashboard-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </main>

    );

}

export default ShopDashboard;