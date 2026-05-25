import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadIncidents() {
      try {
        const response = await api.get("/incidents");
        setIncidents(response.data);
      } catch (error) {
        console.error("Erro ao buscar incidentes:", error);
      }
    }

    loadIncidents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚨 RedeNetWatch</h1>

      <h2>Incidentes</h2>

      {incidents.length === 0 ? (
        <p>Nenhum incidente encontrado.</p>
      ) : (
        incidents.map((incident) => (
          <div
            key={incident.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{incident.title}</h3>
            <p>
              <strong>Equipamento:</strong> {incident.equipment}
            </p>
            <p>
              <strong>Status:</strong> {incident.status}
            </p>
            <p>
              <strong>Prioridade:</strong> {incident.priority}
            </p>
            <p>{incident.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;