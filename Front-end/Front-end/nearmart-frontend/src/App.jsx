import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================
// Pages
// =========================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginSelection from "./pages/LoginSelection";

import CustomerDashboard from "./pages/CustomerDashboard";
import ShopDashboard from "./pages/ShopDashboard";

import Shops from "./pages/Shops";
import ShopDetails from "./pages/ShopDetails";
import Cart from "./pages/Cart";
import Bill from "./pages/Bill";
import Orders from "./pages/Orders";

import RegisterShop from "./pages/RegisterShop";
import AddInventory from "./pages/AddInventory";

// =========================
// Components
// =========================

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            {/* Navigation Bar */}

            <Navbar />

            <Routes>

                {/* =====================================
                    PUBLIC ROUTES
                ===================================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Login Selection */}

                <Route
                    path="/login"
                    element={<LoginSelection />}
                />

                {/* Customer Login */}

                <Route
                    path="/customer-login"
                    element={
                        <Login loginType="CUSTOMER" />
                    }
                />

                {/* Shop Owner Login */}

                <Route
                    path="/shop-login"
                    element={
                        <Login loginType="SHOP_OWNER" />
                    }
                />

                {/* Customer Registration */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* =====================================
                    SHOP REGISTRATION
                    PUBLIC - NO LOGIN REQUIRED
                ===================================== */}

                <Route
                    path="/register-shop"
                    element={<RegisterShop />}
                />


                {/* =====================================
                    CUSTOMER DASHBOARD
                ===================================== */}

                <Route
                    path="/customer-dashboard"
                    element={
                        <ProtectedRoute role="CUSTOMER">
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    SHOP OWNER DASHBOARD
                ===================================== */}

                <Route
                    path="/shop-dashboard"
                    element={
                        <ProtectedRoute role="SHOP_OWNER">
                            <ShopDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    CUSTOMER FEATURES
                ===================================== */}

                {/* Shops */}

                <Route
                    path="/shops"
                    element={
                        <ProtectedRoute role="CUSTOMER">
                            <Shops />
                        </ProtectedRoute>
                    }
                />

                {/* Shop Details */}

                <Route
                    path="/shops/:id"
                    element={
                        <ProtectedRoute role="CUSTOMER">
                            <ShopDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Cart */}

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute role="CUSTOMER">
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                {/* Orders */}

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute role="CUSTOMER">
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                {/* Bill */}

                <Route
                    path="/bill/order/:orderId"
                    element={
                        <ProtectedRoute role="CUSTOMER">
                            <Bill />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    SHOP OWNER FEATURES
                ===================================== */}

                {/* Add Inventory */}

                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute role="SHOP_OWNER">
                            <AddInventory />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;