import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");


    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");

        navigate("/login");

    };


    return (

        <nav className="navbar">

            <div className="navbar-container">


                {/* LOGO */}

                <Link
                    to="/"
                    className="logo"
                >
                    NearMart
                </Link>


                <div className="nav-links">


                    {/* HOME */}

                    <Link to="/">
                        Home
                    </Link>


                    {/* CUSTOMER */}

                    {token &&
                        role === "CUSTOMER" && (

                            <>
                                <Link to="/customer-dashboard">
                                    Dashboard
                                </Link>

                                <Link to="/shops">
                                    Shops
                                </Link>

                                <Link to="/cart">
                                    Cart
                                </Link>
                            </>

                        )
                    }


                    {/* SHOP OWNER */}

                    {token &&
                        role === "SHOP_OWNER" && (

                            <Link to="/shop-dashboard">
                                Shop Dashboard
                            </Link>

                        )
                    }


                    {/* NOT LOGGED IN */}

                    {!token && (

                        <>
                            <Link
                                to="/login"
                                className="login-btn"
                            >
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>

                    )}


                    {/* LOGOUT */}

                    {token && (

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;