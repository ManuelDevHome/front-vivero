// src/views/Venta/VentaPage.tsx
import { useEffect, useState,useMemo } from "react";
import { 
  getProductos,
  registrarVenta, 
  type Producto,  
  type VentaItemPayload 
} from "../../api/api";
import ProductoCard from "./ProductoCard";
import "../../Style/Venta.css";
import Swal from "sweetalert2";

interface ItemTicket {
  producto: Producto;
  cantidad: number;
}

export default function VentaPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [ticket, setTicket] = useState<ItemTicket[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await getProductos();
        setProductos(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
  );

  // ➕ agrega (o incrementa) producto en ticket
  const handleAgregar = (producto: Producto) => {
    setTicket((prev) => {
      const idx = prev.findIndex((item) => item.producto.id === producto.id);
      if (idx >= 0) {
        const copia = [...prev];
        copia[idx] = { ...copia[idx], cantidad: copia[idx].cantidad + 1 };
        return copia;
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  };

  const handleIncrement = (id: number) => {
    setTicket((prev) =>
      prev.map((item) =>
        item.producto.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setTicket((prev) =>
      prev
        .map((item) =>
          item.producto.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const handleRemove = (id: number) => {
    setTicket((prev) => prev.filter((item) => item.producto.id !== id));
  };

   // 💰 calcular total
  const total = useMemo(
    () =>
      ticket.reduce(
        (acc, item) => acc + item.producto.precioVenta * item.cantidad,
        0
      ),
    [ticket]
  );

  
  // 🧾 COBRAR
  const handleCobrar = async () => {
    if (ticket.length === 0) return Swal.fire("Atención", "No hay productos en el ticket", "warning");

    const payload: VentaItemPayload[] = ticket.map((item) => ({
      productoId: item.producto.id,
      cantidad: item.cantidad,
    }));

    try {
      const venta = await registrarVenta(payload);

      // prepara texto productos vendidos
      const lista = ticket
        .map((i) => `${i.cantidad} x ${i.producto.nombre}`)
        .join("<br>");

      await Swal.fire({
        icon: "success",
        title: "Venta registrada",
        html: `Se ha registrado la venta de:<br>${lista}<br><br><b>Total: $${total.toLocaleString()}</b>`,
        confirmButtonText: "OK",
      });

      setTicket([]); // limpia el ticket
    } catch (err: any) {
      Swal.fire("Error", err.message || "Error al registrar la venta", "error");
    }
  };

  return (
    <div className="venta-container">
      <div className="catalogo">
        <header className="catalogo-header">
          <h1>Punto de Venta</h1>
          <input
            type="text"
            placeholder="Buscar producto..."
            className="buscador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </header>

        {loading && <p>Cargando productos...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="catalogo-grid">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <ProductoCard key={p.id} producto={p} onAgregar={handleAgregar} />
              ))
            ) : (
              <p className="sin-resultados">No hay productos que coincidan</p>
            )}
          </div>
        )}
      </div>

      {/* Ticket */}
      <aside className="ticket">
        <div className="ticket-header">
          <h2>Ticket de Venta</h2>
        </div>

        <div className="ticket-body">
          {ticket.length === 0 ? (
            <p>No hay productos aún</p>
          ) : (
            <ul className="ticket-lista">
              {ticket.map((item) => (
                <li key={item.producto.id} className="ticket-item">
                  <div className="item-info">
                    <span className="item-nombre">{item.producto.nombre}</span>
                    <span className="item-precio">
                       ${(item.cantidad * Number(item.producto.precioVenta)).toLocaleString("es-CO")}
                    </span>
                  </div>
                  <div className="item-controles">
                    <button onClick={() => handleDecrement(item.producto.id)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => handleIncrement(item.producto.id)}>+</button>
                    <button className="btn-remove" onClick={() => handleRemove(item.producto.id)}>
                      🗑
                    </button>
                  </div>
                 
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ticket-footer">
          <div className="ticket-total">
            Total: $ {total.toLocaleString("es-CO")}
          </div>
          <button className="btn-cobrar" onClick={handleCobrar}>
            Cobrar
          </button>
        </div>
      </aside>
    </div>
  );
}
