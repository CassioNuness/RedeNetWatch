import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

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

  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter((item) => item.status === "Aberto").length;
  const criticalIncidents = incidents.filter((item) => item.priority === "Crítica").length;
  const resolvedIncidents = incidents.filter((item) => item.status === "Resolvido").length;

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1>🚨 RedeNetWatch</h1>
          <p>Sistema de Monitoramento e Gestão de Incidentes</p>
        </div>
      </header>

      <section className="dashboard">
        <div className="dashboard-card">
          <span>Total</span>
          <strong>{totalIncidents}</strong>
        </div>

        <div className="dashboard-card">
          <span>Abertos</span>
          <strong>{openIncidents}</strong>
        </div>

        <div className="dashboard-card">
          <span>Críticos</span>
          <strong>{criticalIncidents}</strong>
        </div>

        <div className="dashboard-card">
          <span>Resolvidos</span>
          <strong>{resolvedIncidents}</strong>
        </div>
      </section>

      <main className="content-grid">
        <section className="card">
          <h2>Novo Incidente</h2>

          <form onSubmit={handleSubmit} className="form-grid">
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

            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>

            <button type="submit">Cadastrar Incidente</button>
          </form>
        </section>

        <section className="card">
          <h2>Incidentes</h2>

          <div className="incident-list">
            {incidents.length === 0 ? (
              <p>Nenhum incidente encontrado.</p>
            ) : (
              incidents.map((incident) => (
                <article key={incident.id} className="incident-card">
                  <div className="incident-header">
                    <h3>{incident.title}</h3>
                    <span className={`status status-${incident.status.replace(" ", "-")}`}>
                      {incident.status}
                    </span>
                  </div>

                  <p className="equipment">{incident.equipment}</p>

                  <div className="badges">
                    <span className={`badge priority-${incident.priority}`}>
                      {incident.priority}
                    </span>
                  </div>

                  <p>{incident.description}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;