import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import api from "../services/api";

=======

import api from "../services/api";

import {
    createPaymentOrder,
    verifyPayment
} from "../services/paymentService";


>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
function Orders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

<<<<<<< HEAD
=======
    // Keeps track of which order is currently being paid
    const [payingOrderId, setPayingOrderId] = useState(null);

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)

    // ================================
    // FETCH MY ORDERS
    // ================================

    useEffect(() => {
<<<<<<< HEAD

        fetchOrders();

=======
        fetchOrders();
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    }, []);


    const fetchOrders = async () => {

        try {

            setLoading(true);
            setError("");

<<<<<<< HEAD
            console.log("Fetching logged-in customer orders...");

            // JWT identifies the customer
=======
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
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

<<<<<<< HEAD
            console.error(
                "Backend response:",
                error.response?.data
            );

=======
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
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
<<<<<<< HEAD

=======
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
            }

        } finally {

            setLoading(false);
<<<<<<< HEAD

        }

=======
        }
    };


    // ================================
    // RAZORPAY PAYMENT
    // ================================

    const handlePayment = async (order) => {

        try {

            setPayingOrderId(order.orderId);

            /*
             * IMPORTANT:
             * Change "userId" below according to whatever
             * key you use when saving the logged-in user.
             */
            const userId =
                localStorage.getItem("userId");

            if (!userId) {

                alert(
                    "User information not found. Please login again."
                );

                setPayingOrderId(null);

                navigate("/login");
                return;
            }


            // --------------------------------
            // STEP 1: Create Razorpay Order
            // --------------------------------

            const paymentOrder =
                await createPaymentOrder({

                    orderId: order.orderId,

                    userId: Number(userId),

                    amount: Number(
                        order.totalPrice
                    )
                });


            console.log(
                "Payment order created:",
                paymentOrder
            );


            // --------------------------------
            // STEP 2: Configure Razorpay
            // --------------------------------

            const options = {

                key: paymentOrder.key,

                amount: Math.round(
                    Number(paymentOrder.amount) * 100
                ),

                currency:
                    paymentOrder.currency,

                name: "NearMart",

                description:
                    `Payment for Order #${order.orderId}`,

                order_id:
                    paymentOrder.razorpayOrderId,


                // --------------------------------
                // STEP 3: Payment successful
                // --------------------------------

                handler: async function (
                    response
                ) {

                    console.log(
                        "Razorpay response:",
                        response
                    );


                    try {

                        // --------------------------------
                        // STEP 4: Verify payment
                        // --------------------------------

                        const verificationResult =
                            await verifyPayment({

                                razorpayOrderId:
                                    response.razorpay_order_id,

                                razorpayPaymentId:
                                    response.razorpay_payment_id,

                                razorpaySignature:
                                    response.razorpay_signature
                            });


                        console.log(
                            "Payment verified:",
                            verificationResult
                        );


                        if (
                            verificationResult.status
                            === "SUCCESS"
                        ) {

                            alert(
                                "Payment successful!"
                            );

                            // Reload orders
                            await fetchOrders();

                        }

                    } catch (error) {

                        console.error(
                            "Payment verification failed:",
                            error
                        );

                        alert(
                            "Payment verification failed."
                        );

                    } finally {

                        setPayingOrderId(null);
                    }
                },


                theme: {}
            };


            // --------------------------------
            // STEP 5: Open Razorpay
            // --------------------------------

            const razorpay =
                new window.Razorpay(options);


            // --------------------------------
            // PAYMENT FAILURE
            // --------------------------------

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "Payment failed:",
                        response.error
                    );

                    alert(
                        response.error?.description
                        || "Payment failed."
                    );

                    setPayingOrderId(null);
                }
            );


            razorpay.open();


        } catch (error) {

            console.error(
                "Unable to start payment:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message
                || "Unable to start payment."
            );

            setPayingOrderId(null);
        }
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
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
<<<<<<< HEAD

        );

=======
        );
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
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

<<<<<<< HEAD
                        <p>
                            {error}
                        </p>

                        <button
                            onClick={() =>
                                navigate("/customer-dashboard")
=======
                        <p>{error}</p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/customer-dashboard"
                                )
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                            }
                        >
                            Back to Dashboard
                        </button>

                    </div>

                </div>

            </main>
<<<<<<< HEAD

        );

=======
        );
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
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

<<<<<<< HEAD
                        <h2>
                            No Orders Yet
                        </h2>

                        <p>
                            You haven't placed any orders yet.
=======
                        <h2>No Orders Yet</h2>

                        <p>
                            You haven't placed any
                            orders yet.
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
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
<<<<<<< HEAD

        );

=======
        );
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    }


    // ================================
    // ORDERS PAGE
    // ================================

    return (

        <main className="orders-page">

            <div className="orders-container">

                <div className="orders-header">

                    <div>

<<<<<<< HEAD
                        <h1>
                            My Orders
                        </h1>
=======
                        <h1>My Orders</h1>
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)

                        <p>
                            View your previous orders
                        </p>

                    </div>

                    <button
                        onClick={() =>
<<<<<<< HEAD
                            navigate("/customer-dashboard")
=======
                            navigate(
                                "/customer-dashboard"
                            )
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
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

<<<<<<< HEAD

=======
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                                <p>
                                    <strong>
                                        Total:
                                    </strong>{" "}
                                    ₹
                                    {Number(
                                        order.totalPrice || 0
                                    ).toFixed(2)}
                                </p>

<<<<<<< HEAD

=======
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                                <p>
                                    <strong>
                                        Date:
                                    </strong>{" "}
                                    {order.createdAt
                                        ? new Date(
                                            order.createdAt
                                        ).toLocaleString()
<<<<<<< HEAD
                                        : "N/A"
                                    }
=======
                                        : "N/A"}
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                                </p>

                            </div>


<<<<<<< HEAD
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

=======
                            <div className="order-actions">

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


                                {/* PAY NOW BUTTON */}

                                <button
                                    className="pay-now-btn"
                                    disabled={
                                        payingOrderId
                                        === order.orderId
                                    }
                                    onClick={() =>
                                        handlePayment(order)
                                    }
                                >

                                    {payingOrderId
                                        === order.orderId
                                        ? "Processing..."
                                        : `Pay ₹${Number(
                                            order.totalPrice || 0
                                        ).toFixed(2)}`
                                    }

                                </button>

                            </div>

                        </div>
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                    ))}

                </div>

            </div>

        </main>
<<<<<<< HEAD

    );

=======
    );
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
}

export default Orders;