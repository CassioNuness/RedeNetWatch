import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import incidentRoutes from "./routes/incident-routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/incidents", incidentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API RedeNetWatch 🚀",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});