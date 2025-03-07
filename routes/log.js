const express = require("express");
const router = express.Router();
const { createLog, getAllLogs, getLogById } = require("../controllers/log");
const authMiddleware = require("../middlewares/auth");

// Rutas protegidas para logs de auditoría
router.post("/", authMiddleware, createLog); 
router.get("/", authMiddleware, getAllLogs); 
router.get("/:id", authMiddleware, getLogById); 

module.exports = router;
