import express from "express";

import {
  listIncidents,
  addIncident,
} from "../controllers/incident-controller.js";

const router = express.Router();

// GET
router.get("/", listIncidents);

// POST
router.post("/", addIncident);

export default router;