const { createPayPalPayment } = require("../services/paypal.service");

// Procesar un pago con PayPal
exports.processPayPalPayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount) {
            return res.status(400).json({ message: "El monto es requerido" });
        }

        const paymentResponse = await createPayPalPayment(amount, currency || "USD");

        res.status(201).json({
            message: "Pago creado exitosamente en PayPal",
            orderId: paymentResponse.id,
            links: paymentResponse.links
        });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar el pago con PayPal", error: error.message });
    }
};
