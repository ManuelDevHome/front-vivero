import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Importar las vistas
import Inventario from "./pages/inventario/Inventario.tsx";
import Caja from "./pages/caja/Caja.tsx";
import Reportes from "./pages/Reportes/Reportes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />}>
          <Route path="inventario" element={<Inventario />} />
          <Route path="caja" element={<Caja />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
