import "../../Style/Modal.css";

interface Props {
  producto: {
    nombre: string;
    precioCompra: string | number;
    precioVenta: string | number;
    stock: string | number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  modo?: "crear" | "editar";
}

export default function FormularioProducto({ producto, onChange, onSubmit, modo = "crear" }: Props) {
  return (
    <form className="form-producto" onSubmit={onSubmit}>

      <div className="form-group">
        <label htmlFor="nombre">Nombre del producto</label>
        <input 
          id="nombre"
          name="nombre"
          type="text"
          value={producto.nombre}
          onChange={onChange}
          placeholder="Ej: Café Orgánico"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="precioCompra">Precio de compra</label>
          <input 
            id="precioCompra"
            name="precioCompra"
            type="number"
            value={producto.precioCompra}
            onChange={onChange}
            placeholder="$ 0.00"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precioVenta">Precio de venta</label>
          <input 
            id="precioVenta"
            name="precioVenta"
            type="number"
            value={producto.precioVenta}
            onChange={onChange}
            placeholder="$ 0.00"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock disponible</label>
        <input 
          id="stock"
          name="stock"
          type="number"
          value={producto.stock}
          onChange={onChange}
          placeholder="Ej: 50"
          required
        />
      </div>

      <button type="submit" className="btn-guardar">
        {modo === "crear" ? "Guardar producto" : "Actualizar producto"}
      </button>
    </form>
  );
}
