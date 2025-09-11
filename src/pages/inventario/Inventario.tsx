import { useState, useEffect } from "react";
import { getProductos, createProducto, deleteProducto, updateProducto } from "../../api/api";
import type { Producto } from "../../api/api";
import "../../Style/Inventario.css";
import Swal from "sweetalert2";
import TablaProductos from "./TablaProductos";
import Paginacion from "./Paginacion";
import Modal from "./Modal";
import FormularioProducto from "./FormularioProducto";

function Inventario() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  // Modal + Formulario
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null); // 👈 producto en edición

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precioCompra: "",
    precioVenta: "",
    stock: "",
  });

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  // 🔹 EDITAR PRODUCTO
  const handleEdit = (producto: Producto) => {
    setEditando(producto); // lo guardamos en el estado
    setMostrarModal(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editando) return;

  try {
    const { id, ...productoSinId } = editando; // quitar id
    // productoSinId es exactamente Omit<Producto, "id">

    const productoActualizado = await updateProducto(id, productoSinId);

    setProductos(productos.map((p) => (p.id === id ? productoActualizado : p)));

    Swal.fire({
      icon: "success",
      title: "Actualizado",
      text: `El producto "${productoActualizado.nombre}" fue actualizado correctamente.`,
      confirmButtonColor: "#8B5E3C",
    });

    setMostrarModal(false);
    setEditando(null);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar el producto. Intenta nuevamente.",
      confirmButtonColor: "#8B5E3C",
    });
  }
};



  // 🔹 ELIMINAR PRODUCTO (como ya lo tienes)
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8B5E3C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProducto(id);
          setProductos(productos.filter((p) => p.id !== id));

          Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "El producto se eliminó correctamente.",
            confirmButtonColor: "#8B5E3C",
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el producto.",
            confirmButtonColor: "#8B5E3C",
          });
        }
      }
    });
  };

// 🔹 INPUT HANDLER (sirve para crear y editar)
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type } = e.target;
  const parsedValue = type === "number" ? Number(value) : value;

  if (editando) {
    setEditando({ ...editando, [name]: parsedValue } as Producto);
  } else {
    setNuevoProducto({ ...nuevoProducto, [name]: parsedValue });
  }
};

  // 🔹 CREAR PRODUCTO
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productoCreado = await createProducto({
        nombre: nuevoProducto.nombre,
        precioCompra: Number(nuevoProducto.precioCompra),
        precioVenta: Number(nuevoProducto.precioVenta),
        stock: Number(nuevoProducto.stock),
      });

      setProductos([...productos, productoCreado]);

      setNuevoProducto({
        nombre: "",
        precioCompra: "",
        precioVenta: "",
        stock: "",
      });

      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: `El producto "${productoCreado.nombre}" fue agregado correctamente.`,
        confirmButtonColor: "#8B5E3C",
      });

      setMostrarModal(false);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto. Intenta nuevamente.",
        confirmButtonColor: "#8B5E3C",
      });
    }
  };

  // Paginación
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPagina = productos.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <h2>Inventario</h2>

        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          className="input-busqueda"
        />

        <button
          className="btn-agregar-inventario"
          onClick={() => {
            setEditando(null); // 👈 importante: al agregar, no estamos editando
            setMostrarModal(true);
          }}
        >
          ➕ Agregar productos
        </button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <TablaProductos
            productos={productosPagina}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onChange={setPaginaActual}
          />
        </>
      )}

      {mostrarModal && (
        <Modal
          titulo={editando ? "Editar Producto" : "Agregar Producto"}
          onClose={() => {
            setMostrarModal(false);
            setEditando(null);
          }}
        >
          <FormularioProducto
            producto={editando || nuevoProducto}
            onChange={handleInputChange}
            onSubmit={editando ? handleUpdateProduct : handleAddProduct}
          />
        </Modal>
      )}
    </div>
  );
}

export default Inventario;
