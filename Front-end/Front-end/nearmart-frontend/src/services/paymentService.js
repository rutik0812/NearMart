import axios from "axios";

const PAYMENT_API = "http://localhost:8084/api/payments";

export const createPaymentOrder = async (paymentData) => {
    const response = await axios.post(
        `${PAYMENT_API}/create-order`,
        paymentData
    );

    return response.data;
};

export const verifyPayment = async (verificationData) => {
    const response = await axios.post(
        `${PAYMENT_API}/verify`,
        verificationData
    );

    return response.data;
};