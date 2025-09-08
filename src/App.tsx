import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Inventario from "./pages/inventario/Inventario";
import Caja from "./pages/caja/VentaPage";
import Reportes from "./pages/Reportes/Reportes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="inventario" element={<Inventario />} />
        <Route path="caja" element={<Caja />} />
        <Route path="reportes" element={<Reportes />} />
      </Route>
    </Routes>
  );
}

export default App;
