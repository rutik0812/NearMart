import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Orders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ================================
    // FETCH MY ORDERS
    // ================================

    useEffect(() => {

        fetchOrders();

    }, []);


    const fetchOrders = async () => {

        try {

            setLoading(true);
            setError("");

            console.log("Fetching logged-in customer orders...");

            // JWT identifies the customer
            const response = await api.get(
                "/orders/my-orders"
            );

            console.log(
                "Orders received:",
                response.data
            );

            setOrders(response.data);

        } catch (error) {

            console.error(
                "Error fetching orders:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            if (error.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (error.response?.status === 403) {

                setError(
                    "You are not authorized to view orders."
                );

            } else if (
                error.response?.data?.message
            ) {

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Unable to load your orders."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (

            <main className="orders-page">

                <div className="orders-container">

                    <h1>My Orders</h1>

                    <p>
                        Loading your orders...
                    </p>

                </div>

            </main>

        );

    }


    // ================================
    // ERROR
    // ================================

    if (error) {

        return (

            <main className="orders-page">

                <div className="orders-container">

                    <h1>My Orders</h1>

                    <div className="orders-error">

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={() =>
                                navigate("/customer-dashboard")
                            }
                        >
                            Back to Dashboard
                        </button>

                    </div>

                </div>

            </main>

        );

    }


    // ================================
    // NO ORDERS
    // ================================

    if (orders.length === 0) {

        return (

            <main className="orders-page">

                <div className="orders-container">

                    <h1>My Orders</h1>

                    <div className="no-orders">

                        <h2>
                            No Orders Yet
                        </h2>

                        <p>
                            You haven't placed any orders yet.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/shops")
                            }
                        >
                            Start Shopping
                        </button>

                    </div>

                </div>

            </main>

        );

    }


    // ================================
    // ORDERS PAGE
    // ================================

    return (

        <main className="orders-page">

            <div className="orders-container">

                <div className="orders-header">

                    <div>

                        <h1>
                            My Orders
                        </h1>

                        <p>
                            View your previous orders
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/customer-dashboard")
                        }
                    >
                        Dashboard
                    </button>

                </div>


                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.orderId}
                        >

                            <div className="order-header">

                                <h2>
                                    Order #{order.orderId}
                                </h2>

                                <span
                                    className={`order-status ${
                                        order.status
                                            ? order.status.toLowerCase()
                                            : ""
                                    }`}
                                >
                                    {order.status || "PLACED"}
                                </span>

                            </div>


                            <div className="order-details">

                                <p>
                                    <strong>
                                        Shop:
                                    </strong>{" "}
                                    {order.shopName || "N/A"}
                                </p>


                                <p>
                                    <strong>
                                        Total:
                                    </strong>{" "}
                                    ₹
                                    {Number(
                                        order.totalPrice || 0
                                    ).toFixed(2)}
                                </p>


                                <p>
                                    <strong>
                                        Date:
                                    </strong>{" "}
                                    {order.createdAt
                                        ? new Date(
                                            order.createdAt
                                        ).toLocaleString()
                                        : "N/A"
                                    }
                                </p>

                            </div>


                            <button
                                className="view-order-btn"
                                onClick={() =>
                                    navigate(
                                        `/bill/order/${order.orderId}`
                                    )
                                }
                            >
                                View Bill
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </main>

    );

}

export default Orders;