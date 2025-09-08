// src/views/Venta/ProductoCard.tsx
import type { Producto } from "../../api/api";
import "../../Style/ProductoCard.css";

interface Props {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
}

export default function ProductoCard({ producto, onAgregar }: Props) {
  return (
    <div className="producto-card">
      <span className="producto-nombre">{producto.nombre}</span>
      <span className="producto-precio">
        {producto.precioVenta.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        })}
      </span>
      <button className="btn-agregar" onClick={() => onAgregar(producto)}>
        Agregar
      </button>
    </div>
  );
}
