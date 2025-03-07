const mongoose = require("mongoose");
const Payment = require("../models/payment");
const Transaction = require("../models/transactions");

// Crear un pago
exports.createPayment = async (req, res) => {
    try {
        const { transactionId, amount, paymentMethod } = req.body;

        // Verificar si la transacción existe
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transacción no encontrada" });
        }

        // Crear el pago
        const payment = new Payment({
            user: req.user.id,
            transaction: transactionId,
            amount,
            paymentMethod,
            status: "pending"
        });

        await payment.save();
        res.status(201).json({ message: "Pago creado exitosamente", payment });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar el pago", error: error.message });
    }
};

// Obtener todos los pagos del usuario autenticado
exports.getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id }).populate("transaction").sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pagos", error: error.message });
    }
};

// Obtener un pago específico por ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate("transaction");
        if (!payment) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el pago", error: error.message });
    }
};
