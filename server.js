const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");
const userRoutes = require("./routes/user");
const transactionsRoutes = require("./routes/transactions");
const paymentRoutes = require("./routes/payment");
const logRoutes = require("./routes/log");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(config.mongoURI, {
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((error) => console.error("Error al conectar a MongoDB:", error));

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/logs", logRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando correctamente");
});

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
