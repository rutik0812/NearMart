
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Bill() {

    const { orderId } = useParams();
    const navigate = useNavigate();

    const [bill, setBill] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Payment states
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);


    // ==========================================
    // FETCH BILL BY ORDER ID
    // ==========================================

    useEffect(() => {

        fetchBill();

    }, [orderId]);


    const fetchBill = async () => {

        try {

            setLoading(true);
            setError("");

            console.log(
                "Fetching bill for order:",
                orderId
            );

            const response = await api.get(
                `/bills/order/${orderId}`
            );

            console.log(
                "Bill received:",
                response.data
            );

            setBill(response.data);

        } catch (error) {

            console.error(
                "Error fetching bill:",
                error
            );

            console.error(
                "Backend Response:",
                error.response?.data
            );

            if (error.response?.data?.message) {

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Unable to load bill."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
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

        );

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

        );

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

        );

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
                        </p>

                    </div>


                    <div>

                        <p>
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
                        </p>

                    </div>


                    <div>

                        <p>
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

                </div>


                {/* ==================================
                    BILL ITEMS
                ================================== */}

                <div className="bill-items">

                    <h2>
                        Order Details
                    </h2>

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
                        ₹
                        {
                            Number(
                                bill.totalPrice
                            ).toFixed(2)
                        }
                    </strong>

                </div>


                {/* ==================================
                    ACTION BUTTONS
                ================================== */}

                <div className="bill-actions">

                    {/* PRINT BILL */}

                    <button
                        onClick={() =>
                            window.print()
                        }
                    >
                        Print Bill
                    </button>


                    {/* PAYMENT */}

                    {!paymentSuccess && (

                        <button
                            className="payment-btn"
                            onClick={handlePayment}
                        >
                            Pay ₹
                            {
                                Number(
                                    bill.totalPrice
                                ).toFixed(2)
                            }
                        </button>

                    )}


                    {/* BACK HOME */}

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Back to Home
                    </button>

                </div>


                {/* ==================================
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
                    PAYMENT SUCCESS
                ================================== */}

                {paymentSuccess && (

                    <div className="payment-success">

                        <div className="success-icon">
                            ✓
                        </div>

                        <h2>
                            Payment Successful
                        </h2>

                        <p>
                            Your payment has been processed successfully.
                        </p>

                        <p>
                            Order ID: #{bill.orderId}
                        </p>

                        <button
                            onClick={() =>
                                window.print()
                            }
                        >
                            Print Paid Bill
                        </button>

                    </div>

                )}

            </div>

        </main>

    );

}

export default Bill;

