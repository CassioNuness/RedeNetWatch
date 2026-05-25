import {
  getAllIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
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

// Buscar incidente por ID
export async function showIncident(req, res) {
  try {
    const { id } = req.params;

    const incident = await getIncidentById(id);

    if (!incident) {
      return res.status(404).json({
        error: "Incidente não encontrado",
      });
    }

    res.status(200).json(incident);
  } catch (error) {
    console.error("Erro ao buscar incidente:", error);

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

// Atualizar incidente
export async function editIncident(req, res) {
  try {
    const { id } = req.params;

    const updatedIncident = await updateIncident(
      id,
      req.body
    );

    res.status(200).json(updatedIncident);
  } catch (error) {
    console.error("Erro ao atualizar incidente:", error);

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

// Deletar incidente
export async function removeIncident(req, res) {
  try {
    const { id } = req.params;

    const deletedIncident = await deleteIncident(id);

    res.status(200).json({
      message: "Incidente removido com sucesso",
      deletedIncident,
    });
  } catch (error) {
    console.error("Erro ao remover incidente:", error);

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}