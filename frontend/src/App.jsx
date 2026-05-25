import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [incidents, setIncidents] = useState([]);

  const [formData, setFormData] = useState({
    equipment: "",
    title: "",
    description: "",
    status: "Aberto",
    priority: "Média",
  });

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const response = await api.get("/incidents");
        setIncidents(response.data);
      } catch (error) {
        console.error("Erro ao buscar incidentes:", error);
      }
    }

    fetchIncidents();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/incidents", formData);

      setIncidents([response.data, ...incidents]);

      setFormData({
        equipment: "",
        title: "",
        description: "",
        status: "Aberto",
        priority: "Média",
      });
    } catch (error) {
      console.error("Erro ao cadastrar incidente:", error);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🚨 RedeNetWatch</h1>
      <p>Sistema de Monitoramento e Gestão de Incidentes</p>

      <hr />

      <h2>Novo Incidente</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "600px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          name="equipment"
          placeholder="Equipamento ou dispositivo"
          value={formData.equipment}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Título do incidente"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descrição do incidente"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Aberto">Aberto</option>
          <option value="Em análise">Em análise</option>
          <option value="Resolvido">Resolvido</option>
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
          <option value="Crítica">Crítica</option>
        </select>

        <button type="submit">Cadastrar Incidente</button>
      </form>

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
            <p><strong>Equipamento:</strong> {incident.equipment}</p>
            <p><strong>Status:</strong> {incident.status}</p>
            <p><strong>Prioridade:</strong> {incident.priority}</p>
            <p>{incident.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;