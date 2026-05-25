import {
  getAllIncidents,
  createIncident,
} from "../models/incident-model.js";

// Listar incidentes
export async function listIncidents(req, res) {
  try {
    const incidents = await getAllIncidents();

    res.status(200).json(incidents);
  } catch (error) {
    console.error("Erro ao buscar incidentes:", error);

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

// Criar incidente
export async function addIncident(req, res) {
  try {
    const newIncident = await createIncident(req.body);

    console.log(
      `[INFO] Novo incidente criado: ${newIncident.title}`
    );

    res.status(201).json(newIncident);
  } catch (error) {
    console.error("Erro ao criar incidente:", error);

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}