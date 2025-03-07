const axios = require("axios");
const qs = require("querystring");
const config = require("../config/config");

const PAYPAL_API = config.paypalApi;
const CLIENT_ID = config.paypalClientId;
const CLIENT_SECRET = config.paypalClientSecret;

// Función para obtener el token de autenticación de PayPal
const getAccessToken = async () => {
    try {
        const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

        const response = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token`,
            qs.stringify({ grant_type: "client_credentials" }),
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        throw new Error("Error al obtener el token de PayPal: " + error.message);
    }
};

// Función para crear un pago con PayPal
const createPayPalPayment = async (amount, currency = "USD") => {
    try {
        const accessToken = await getAccessToken();

        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [{
                    amount: {
                        currency_code: currency,
                        value: amount
                    }
                }]
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error("Error al crear el pago con PayPal: " + error.message);
    }
};

module.exports = {
    getAccessToken,
    createPayPalPayment
};
