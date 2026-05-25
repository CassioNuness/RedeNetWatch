import express from "express";

import {
  listIncidents,
  showIncident,
  addIncident,
  editIncident,
  removeIncident,
} from "../controllers/incident-controller.js";

const router = express.Router();

// Listar todos os incidentes
router.get("/", listIncidents);

// Buscar incidente por ID
router.get("/:id", showIncident);

// Criar incidente
router.post("/", addIncident);

// Atualizar incidente
router.put("/:id", editIncident);

// Remover incidente
router.delete("/:id", removeIncident);

export default router;