const express = require("express");
const router = express.Router();
const { createTransaction, getUserTransactions, getTransactionById } = require("../controllers/transactions");
const authMiddleware = require("../middlewares/auth");

// Rutas protegidas para transacciones
router.post("/new", authMiddleware, createTransaction); 
router.get("/", authMiddleware, getUserTransactions); 
router.get("/:id", authMiddleware, getTransactionById); 

module.exports = router;