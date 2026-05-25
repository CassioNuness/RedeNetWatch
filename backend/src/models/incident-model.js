import pool from "../database/db.js";

// Buscar todos os incidentes
export async function getAllIncidents() {
  const result = await pool.query(`
    SELECT * FROM incidents
    ORDER BY created_at DESC
  `);

  return result.rows;
}

// Buscar incidente por ID
export async function getIncidentById(id) {
  const result = await pool.query(
    `
    SELECT * FROM incidents
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

// Criar incidente
export async function createIncident(data) {
  const { equipment, title, description, status, priority } = data;

  const result = await pool.query(
    `
    INSERT INTO incidents
    (equipment, title, description, status, priority)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [equipment, title, description, status || "Aberto", priority || "Média"]
  );

  return result.rows[0];
}

// Atualizar incidente
export async function updateIncident(id, data) {
  const { equipment, title, description, status, priority } = data;

  const result = await pool.query(
    `
    UPDATE incidents
    SET
      equipment = $1,
      title = $2,
      description = $3,
      status = $4,
      priority = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    `,
    [equipment, title, description, status, priority, id]
  );

  return result.rows[0];
}

// Deletar incidente
export async function deleteIncident(id) {
  const result = await pool.query(
    `
    DELETE FROM incidents
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
}