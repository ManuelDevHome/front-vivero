
import React, { useEffect, useState } from "react";
import { getGanancias, getGananciasPorRango } from "../../api/reportes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../Style/Reportes.css";

interface GananciasResponse {
  totalIngresos: number;
  totalCostos: number;
  gananciaNeta: number;
  margen: number;
}

const ReportesPage: React.FC = () => {
  const [data, setData] = useState<GananciasResponse | null>(null);
  const [periodo, setPeriodo] = useState("mes");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const mesActual = new Date().toLocaleString("es-ES", { month: "long", year: "numeric" });

  useEffect(() => {
    getGanancias(periodo)
      .then(setData)
      .catch((err) => console.error(err));
  }, [periodo]);

  const handleConsultarRango = () => {
    if (fechaInicio && fechaFin) {
      getGananciasPorRango(fechaInicio, fechaFin)
        .then(setData)
        .catch((err) => console.error(err));
    }
  };

  const chartData = data
    ? [
        {
          name: "Resumen",
          Ingresos: data.totalIngresos,
          Costos: data.totalCostos,
          Ganancia: data.gananciaNeta,
        },
      ]
    : [];

  return (
    <div className="reportes-container">
      <h2>Reporte de Ganancias ({mesActual})</h2>
      <div className="reportes-controls">
       
        <div className="rango-fechas">
          <label>
            Desde:
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </label>
          <label>
            Hasta:
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </label>
          <button onClick={handleConsultarRango}>Consultar</button>
        </div>
      </div>

      <div className="reportes-content">
        <div className="grafica-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ingresos" fill="#4CAF50" />
              <Bar dataKey="Costos" fill="#F44336" />
              <Bar dataKey="Ganancia" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {data && (
          <div className="reporte-detalles">
            <p><strong>Total Ingresos:</strong> ${data.totalIngresos.toLocaleString()}</p>
            <p><strong>Total Costos:</strong> ${data.totalCostos.toLocaleString()}</p>
            <p><strong>Ganancia Neta:</strong> ${data.gananciaNeta.toLocaleString()}</p>
            <p><strong>Margen:</strong> {data.margen.toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportesPage;

