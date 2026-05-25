import pool from "../database/db.js";

// Buscar todos os incidentes
export async function getAllIncidents() {
  const result = await pool.query(`
    SELECT * FROM incidents
    ORDER BY created_at DESC
  `);

  return result.rows;
}

// Criar incidente
export async function createIncident(data) {
  const {
    equipment,
    title,
    description,
    status,
    priority,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO incidents
    (equipment, title, description, status, priority)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [equipment, title, description, status, priority]
  );

  return result.rows[0];
}