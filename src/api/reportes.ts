const API_URL = "http://localhost:3000/reportes";

export interface GananciasResponse {
  fecha: string;   // día (ej: "2025-10-01")
  total: number;   // ventas totales del día
  costo: number;   // costo total de los productos vendidos
  ganancias: number; // total - costo
}

export async function getGanancias(periodo: string) {
     const res = await fetch(`${API_URL}/ganancias?periodo=${periodo}`);
      if (!res.ok) { 
            throw new Error("Error al obtener ganancias");
          } return res.json(); }

export async function getGananciasPorRango(from: string, to: string) {
  const res = await fetch(`${API_URL}/ganancias?from=${from}&to=${to}`);
  if (!res.ok) {
    throw new Error("Error al obtener ganancias por rango");
  }
  return res.json();
}
