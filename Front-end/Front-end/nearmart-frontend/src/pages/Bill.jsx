<<<<<<< HEAD

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Bill() {

    const { orderId } = useParams();
=======
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import {
    createPaymentOrder,
    verifyPayment
} from "../services/paymentService";


function Bill() {

    const { orderId } = useParams();

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    const navigate = useNavigate();

    const [bill, setBill] = useState(null);

    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
    const [error, setError] = useState("");

    // Payment states
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
=======

    const [error, setError] = useState("");

    const [paymentProcessing, setPaymentProcessing] =
        useState(false);

    const [paymentSuccess, setPaymentSuccess] =
        useState(false);
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)


    // ==========================================
    // FETCH BILL BY ORDER ID
    // ==========================================

    useEffect(() => {

        fetchBill();

    }, [orderId]);


    const fetchBill = async () => {

        try {

            setLoading(true);
<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
            setError("");

            console.log(
                "Fetching bill for order:",
                orderId
            );

<<<<<<< HEAD
            const response = await api.get(
                `/bills/order/${orderId}`
            );
=======

            const response =
                await api.get(
                    `/bills/order/${orderId}`
                );

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)

            console.log(
                "Bill received:",
                response.data
            );

<<<<<<< HEAD
            setBill(response.data);

=======

            setBill(response.data);


>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
        } catch (error) {

            console.error(
                "Error fetching bill:",
                error
            );

<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
            console.error(
                "Backend Response:",
                error.response?.data
            );

<<<<<<< HEAD
            if (error.response?.data?.message) {
=======

            if (
                error.response?.data?.message
            ) {
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Unable to load bill."
                );
<<<<<<< HEAD

            }

        } finally {

            setLoading(false);

        }

=======
            }


        } finally {

            setLoading(false);
        }
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    };


    // ==========================================
<<<<<<< HEAD
    // OPEN PAYMENT
    // ==========================================

    const handlePayment = () => {

        setShowPayment(true);

        setPaymentSuccess(false);

    };


    // ==========================================
    // PROCESS DUMMY PAYMENT
    // ==========================================

    const processPayment = () => {

        setPaymentProcessing(true);

        // Simulate payment gateway processing
        setTimeout(() => {

            setPaymentProcessing(false);

            setPaymentSuccess(true);

        }, 2000);

=======
    // RAZORPAY PAYMENT
    // ==========================================

    const handlePayment = async () => {

        try {

            setPaymentProcessing(true);


            // ======================================
            // GET LOGGED-IN USER
            // ======================================

            const userId =
                localStorage.getItem("userId");


            if (!userId) {

                alert(
                    "Please login before making payment."
                );

                setPaymentProcessing(false);

                navigate("/login");

                return;
            }


            // ======================================
            // CHECK BILL
            // ======================================

            if (!bill) {

                alert(
                    "Bill information is not available."
                );

                setPaymentProcessing(false);

                return;
            }


            // ======================================
            // CHECK AMOUNT
            // ======================================

            const amount =
                Number(bill.totalPrice);


            if (
                !amount ||
                amount <= 0
            ) {

                alert(
                    "Invalid payment amount."
                );

                setPaymentProcessing(false);

                return;
            }


            // ======================================
            // CHECK RAZORPAY SCRIPT
            // ======================================

            if (!window.Razorpay) {

                alert(
                    "Razorpay Checkout is not loaded. Please refresh the page."
                );

                console.error(
                    "window.Razorpay is undefined"
                );

                setPaymentProcessing(false);

                return;
            }


            // ======================================
            // CREATE RAZORPAY ORDER
            // ======================================

            const paymentOrder =
                await createPaymentOrder({

                    orderId:
                        Number(bill.orderId),

                    userId:
                        Number(userId),

                    amount:
                        amount
                });


            console.log(
                "Payment Order Created:",
                paymentOrder
            );


            // ======================================
            // VALIDATE PAYMENT ORDER
            // ======================================

            if (
                !paymentOrder ||
                !paymentOrder.razorpayOrderId
            ) {

                alert(
                    "Unable to create Razorpay order."
                );

                setPaymentProcessing(false);

                return;
            }


            // ======================================
            // RAZORPAY OPTIONS
            // ======================================

            const options = {

                // Razorpay Key ID
                key:
                    paymentOrder.key,


                // Amount in paise
                amount:
                    Math.round(
                        Number(
                            paymentOrder.amount
                        ) * 100
                    ),


                currency:
                    paymentOrder.currency ||
                    "INR",


                name:
                    "NearMart",


                description:
                    `Payment for Order #${bill.orderId}`,


                // Razorpay Order ID
                order_id:
                    paymentOrder.razorpayOrderId,


                // ==================================
                // PAYMENT SUCCESS
                // ==================================

                handler: async function (
                    response
                ) {

                    console.log(
                        "Razorpay Payment Response:",
                        response
                    );


                    try {

                        // ==============================
                        // VERIFY PAYMENT WITH BACKEND
                        // ==============================

                        const verificationResult =
                            await verifyPayment({

                                razorpayOrderId:
                                    response
                                        .razorpay_order_id,

                                razorpayPaymentId:
                                    response
                                        .razorpay_payment_id,

                                razorpaySignature:
                                    response
                                        .razorpay_signature
                            });


                        console.log(
                            "Payment Verification Result:",
                            verificationResult
                        );


                        // ==============================
                        // CHECK VERIFICATION STATUS
                        // ==============================

                        if (
                            verificationResult
                                .status ===
                            "SUCCESS"
                        ) {

                            setPaymentSuccess(
                                true
                            );


                            alert(
                                "Payment successful!"
                            );


                        } else {

                            alert(
                                "Payment could not be verified."
                            );
                        }


                    } catch (error) {

                        console.error(
                            "Payment Verification Failed:",
                            error
                        );


                        console.error(
                            "Backend Response:",
                            error.response?.data
                        );


                        alert(
                            error.response
                                ?.data?.message ||
                            "Payment verification failed."
                        );


                    } finally {

                        setPaymentProcessing(
                            false
                        );
                    }
                },


                // ==================================
                // CUSTOMER INFORMATION
                // ==================================

                prefill: {

                    name:
                        bill.customerName ||
                        ""

                },


                // ==================================
                // EXTRA INFORMATION
                // ==================================

                notes: {

                    orderId:
                        String(
                            bill.orderId
                        ),

                    shop:
                        bill.shopName ||
                        "NearMart"
                },


                // ==================================
                // CUSTOMER CLOSES PAYMENT WINDOW
                // ==================================

                modal: {

                    ondismiss: function () {

                        console.log(
                            "Razorpay Checkout Closed"
                        );

                        setPaymentProcessing(
                            false
                        );
                    }
                }
            };


            // ======================================
            // CREATE RAZORPAY CHECKOUT
            // ======================================

            const razorpay =
                new window.Razorpay(
                    options
                );


            // ======================================
            // PAYMENT FAILED
            // ======================================

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "Razorpay Payment Failed:",
                        response.error
                    );


                    alert(
                        response.error
                            ?.description ||
                        "Payment failed."
                    );


                    setPaymentProcessing(
                        false
                    );
                }
            );


            // ======================================
            // OPEN RAZORPAY CHECKOUT
            // ======================================

            razorpay.open();


        } catch (error) {

            console.error(
                "Unable to Start Payment:",
                error
            );


            console.error(
                "Backend Response:",
                error.response?.data
            );


            if (
                error.response?.data?.message
            ) {

                alert(
                    error.response.data.message
                );

            } else if (
                typeof error.response?.data ===
                "string"
            ) {

                alert(
                    error.response.data
                );

            } else {

                alert(
                    "Unable to start payment. Check browser console."
                );
            }


            setPaymentProcessing(
                false
            );
        }
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <main className="bill-page">

                <div className="bill-loading">

                    <h2>
                        Generating your bill...
                    </h2>

                    <p>
                        Please wait.
                    </p>

                </div>

            </main>
<<<<<<< HEAD

        );

=======
        );
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <main className="bill-page">

                <div className="bill-error">

                    <h2>
                        Unable to Load Bill
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Go to Home
                    </button>

                </div>

            </main>
<<<<<<< HEAD

        );

=======
        );
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    }


    // ==========================================
    // BILL NOT FOUND
    // ==========================================

    if (!bill) {

        return (

            <main className="bill-page">

                <div className="bill-error">

                    <h2>
                        Bill Not Found
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Go to Home
                    </button>

                </div>

            </main>
<<<<<<< HEAD

        );

=======
        );
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
    }


    // ==========================================
    // BILL PAGE
    // ==========================================

    return (

        <main className="bill-page">

            <div className="bill-container">


                {/* ==================================
                    BILL HEADER
                ================================== */}

                <div className="bill-header">

                    <h1>
                        NearMart
                    </h1>

                    <h2>
                        Order Bill
                    </h2>

                    <p>
                        Thank you for shopping with us!
                    </p>

                </div>


                {/* ==================================
                    BILL INFORMATION
                ================================== */}

                <div className="bill-info">

<<<<<<< HEAD
                    <div>

                        <p>
                            <strong>
                                Bill ID:
                            </strong>{" "}
                            {bill.billId}
                        </p>

                        <p>
                            <strong>
                                Order ID:
                            </strong>{" "}
                            {bill.orderId}
=======

                    <div>

                        <p>

                            <strong>
                                Bill ID:
                            </strong>{" "}

                            {bill.billId}

                        </p>


                        <p>

                            <strong>
                                Order ID:
                            </strong>{" "}

                            {bill.orderId}

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                        </p>

                    </div>


                    <div>

                        <p>
<<<<<<< HEAD
                            <strong>
                                Customer:
                            </strong>{" "}
                            {bill.customerName}
                        </p>

                        <p>
                            <strong>
                                Shop:
                            </strong>{" "}
                            {bill.shopName}
=======

                            <strong>
                                Customer:
                            </strong>{" "}

                            {bill.customerName}

                        </p>


                        <p>

                            <strong>
                                Shop:
                            </strong>{" "}

                            {bill.shopName}

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                        </p>

                    </div>


                    <div>

                        <p>
<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                            <strong>
                                Date:
                            </strong>{" "}

                            {bill.createdAt
                                ? new Date(
                                    bill.createdAt
                                ).toLocaleString()
                                : "N/A"
                            }

                        </p>

                    </div>

<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                </div>


                {/* ==================================
                    BILL ITEMS
                ================================== */}

                <div className="bill-items">

                    <h2>
                        Order Details
                    </h2>

<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    Subtotal
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {bill.items &&
                                bill.items.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <tr
<<<<<<< HEAD
                                            key={index}
                                        >

                                            <td>
                                                {
                                                    item.productName
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.quantity
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    Number(
                                                        item.price
                                                    ).toFixed(2)
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    Number(
                                                        item.subTotal
                                                    ).toFixed(2)
                                                }
=======
                                            key={
                                                index
                                            }
                                        >

                                            <td>

                                                {
                                                    item
                                                        .productName
                                                }

                                            </td>


                                            <td>

                                                {
                                                    item
                                                        .quantity
                                                }

                                            </td>


                                            <td>

                                                ₹
                                                {
                                                    Number(
                                                        item
                                                            .price
                                                    )
                                                        .toFixed(
                                                            2
                                                        )
                                                }

                                            </td>


                                            <td>

                                                ₹
                                                {
                                                    Number(
                                                        item
                                                            .subTotal
                                                    )
                                                        .toFixed(
                                                            2
                                                        )
                                                }

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>


                {/* ==================================
                    TOTAL
                ================================== */}

                <div className="bill-total">

                    <span>
                        Total Amount
                    </span>

                    <strong>
<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                        ₹
                        {
                            Number(
                                bill.totalPrice
                            ).toFixed(2)
                        }
<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                    </strong>

                </div>


                {/* ==================================
                    ACTION BUTTONS
                ================================== */}

                <div className="bill-actions">

<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                    {/* PRINT BILL */}

                    <button
                        onClick={() =>
                            window.print()
                        }
                    >
<<<<<<< HEAD
                        Print Bill
                    </button>


                    {/* PAYMENT */}
=======

                        Print Bill

                    </button>


                    {/* ==================================
                        RAZORPAY BUTTON
                    ================================== */}
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)

                    {!paymentSuccess && (

                        <button
<<<<<<< HEAD
                            className="payment-btn"
                            onClick={handlePayment}
                        >
                            Pay ₹
                            {
                                Number(
                                    bill.totalPrice
                                ).toFixed(2)
                            }
=======

                            className="payment-btn"

                            onClick={
                                handlePayment
                            }

                            disabled={
                                paymentProcessing
                            }

                        >

                            {
                                paymentProcessing

                                    ? "Processing..."

                                    : `Pay ₹${Number(
                                        bill.totalPrice
                                    ).toFixed(2)}`
                            }

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                        </button>

                    )}


                    {/* BACK HOME */}

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
<<<<<<< HEAD
                        Back to Home
                    </button>

=======

                        Back to Home

                    </button>


>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                </div>


                {/* ==================================
<<<<<<< HEAD
                    PAYMENT MODAL
                ================================== */}

                {showPayment && !paymentSuccess && (

                    <div className="payment-overlay">

                        <div className="payment-modal">

                            <button
                                className="payment-close"
                                onClick={() =>
                                    setShowPayment(false)
                                }
                            >
                                ×
                            </button>


                            <h2>
                                Secure Payment
                            </h2>

                            <p className="payment-subtitle">
                                Complete your payment for Order #
                                {bill.orderId}
                            </p>


                            <div className="payment-amount">

                                <span>
                                    Amount Payable
                                </span>

                                <strong>
                                    ₹
                                    {
                                        Number(
                                            bill.totalPrice
                                        ).toFixed(2)
                                    }
                                </strong>

                            </div>


                            {/* PAYMENT METHODS */}

                            <div className="payment-methods">

                                <label>

                                    <input
                                        type="radio"
                                        value="upi"
                                        checked={
                                            paymentMethod === "upi"
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(
                                                e.target.value
                                            )
                                        }
                                    />

                                    UPI

                                </label>


                                <label>

                                    <input
                                        type="radio"
                                        value="card"
                                        checked={
                                            paymentMethod === "card"
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(
                                                e.target.value
                                            )
                                        }
                                    />

                                    Credit / Debit Card

                                </label>


                                <label>

                                    <input
                                        type="radio"
                                        value="netbanking"
                                        checked={
                                            paymentMethod === "netbanking"
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(
                                                e.target.value
                                            )
                                        }
                                    />

                                    Net Banking

                                </label>


                                <label>

                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={
                                            paymentMethod === "cod"
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(
                                                e.target.value
                                            )
                                        }
                                    />

                                    Cash on Delivery

                                </label>

                            </div>


                            {/* PAYMENT FORM */}

                            {paymentMethod === "upi" && (

                                <div className="payment-input">

                                    <label>
                                        UPI ID
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="example@upi"
                                    />

                                </div>

                            )}


                            {paymentMethod === "card" && (

                                <div className="card-payment-form">

                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        maxLength="16"
                                    />

                                    <div className="card-row">

                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            maxLength="5"
                                        />

                                        <input
                                            type="password"
                                            placeholder="CVV"
                                            maxLength="3"
                                        />

                                    </div>

                                </div>

                            )}


                            {paymentMethod === "netbanking" && (

                                <div className="payment-input">

                                    <label>
                                        Select Bank
                                    </label>

                                    <select>

                                        <option>
                                            Select Bank
                                        </option>

                                        <option>
                                            State Bank of India
                                        </option>

                                        <option>
                                            HDFC Bank
                                        </option>

                                        <option>
                                            ICICI Bank
                                        </option>

                                        <option>
                                            Axis Bank
                                        </option>

                                    </select>

                                </div>

                            )}


                            {paymentMethod === "cod" && (

                                <div className="cod-message">

                                    <p>
                                        Pay the amount when your order
                                        is delivered.
                                    </p>

                                </div>

                            )}


                            {/* PAY BUTTON */}

                            <button
                                className="confirm-payment-btn"
                                onClick={processPayment}
                                disabled={paymentProcessing}
                            >

                                {paymentProcessing
                                    ? "Processing Payment..."
                                    : paymentMethod === "cod"
                                        ? "Confirm Order"
                                        : `Pay ₹${Number(
                                            bill.totalPrice
                                        ).toFixed(2)}`
                                }

                            </button>

                        </div>

                    </div>

                )}


                {/* ==================================
=======
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                    PAYMENT SUCCESS
                ================================== */}

                {paymentSuccess && (

                    <div className="payment-success">

                        <div className="success-icon">
                            ✓
                        </div>

<<<<<<< HEAD
=======

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                        <h2>
                            Payment Successful
                        </h2>

<<<<<<< HEAD
                        <p>
                            Your payment has been processed successfully.
                        </p>

                        <p>
                            Order ID: #{bill.orderId}
                        </p>

=======

                        <p>
                            Your payment has been
                            verified successfully.
                        </p>


                        <p>

                            Order ID: #
                            {bill.orderId}

                        </p>


                        <p>

                            Amount Paid: ₹
                            {
                                Number(
                                    bill.totalPrice
                                ).toFixed(2)
                            }

                        </p>


>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                        <button
                            onClick={() =>
                                window.print()
                            }
                        >
<<<<<<< HEAD
                            Print Paid Bill
=======

                            Print Paid Bill

                        </button>


                        <button
                            onClick={() =>
                                navigate(
                                    "/orders"
                                )
                            }
                        >

                            My Orders

>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
                        </button>

                    </div>

                )}

<<<<<<< HEAD
            </div>

        </main>

    );

}

export default Bill;

=======

            </div>

        </main>
    );
}


export default Bill;
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
