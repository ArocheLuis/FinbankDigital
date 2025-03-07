const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }
    
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token no válido." });
    }
};
