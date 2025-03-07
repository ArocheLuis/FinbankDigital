const Transaction = require("../models/transactions");

// Crear una nueva transacción
exports.createTransaction = async (req, res) => {
    try {
        const { amount, type } = req.body;
        
        if (!amount || !type) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        
        const transaction = new Transaction({
            user: req.user.id,
            amount,
            type,
            status: "pending"
        });
        
        await transaction.save();
        res.status(201).json({ message: "Transacción creada exitosamente", transaction });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar la transacción", error: error.message });
    }
};

// Obtener todas las transacciones del usuario autenticado
exports.getUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las transacciones", error: error.message });
    }
};

// Obtener una transacción específica por ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transacción no encontrada" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la transacción", error: error.message });
    }
};
