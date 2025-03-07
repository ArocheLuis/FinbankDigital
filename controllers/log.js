const Log = require("../models/log");

exports.createLog = async (req, res) => {
    try {
        const { action, details, ipAddress } = req.body;

        if (!action || !details || !ipAddress) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const log = new Log({
            user: req.user.id,
            action,
            details,
            ipAddress
        });

        await log.save();
        res.status(201).json({ message: "Log registrado exitosamente", log });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el log", error: error.message });
    }
};

// Obtener todos los logs
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find().populate("user", "name email").sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los logs", error: error.message });
    }
};

// Obtener un log específico por ID
exports.getLogById = async (req, res) => {
    try {
        const log = await Log.findById(req.params.id).populate("user", "name email");
        if (!log) {
            return res.status(404).json({ message: "Log no encontrado" });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el log", error: error.message });
    }
};
