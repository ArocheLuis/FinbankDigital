const express = require("express");
const router = express.Router();
const { createPayment, getUserPayments, getPaymentById } = require("../controllers/payment");
const authMiddleware = require("../middlewares/auth");

const { processPayPalPayment } = require("../controllers/payments.controller");

// Rutas protegidas para pagos
router.post("/", authMiddleware, createPayment); 
router.get("/", authMiddleware, getUserPayments); 
router.get("/:id", authMiddleware, getPaymentById); 

router.post("/paypal", authMiddleware, processPayPalPayment);


module.exports = router;
