import type { Producto } from "../../api/api";
import "../../Style/Tabla.css"

interface Props {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

// 👇 Formateador para pesos colombianos
const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0, // sin decimales, puedes cambiar a 2 si lo prefieres
});

export default function TablaProductos({ productos, onEdit, onDelete }: Props) {
  return (
    <div className="tabla-wrapper">
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{formatter.format(p.precioCompra)}</td>
              <td>{formatter.format(p.precioVenta)}</td>
              <td>{p.stock.toLocaleString("es-CO")}</td> {/* 👈 stock con separador 1.000 */}
              <td className="acciones">
                <button className="btn-accion editar" onClick={() => onEdit(p)}>
                  ✏️
                </button>
                <button className="btn-accion eliminar" onClick={() => onDelete(p.id)}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
