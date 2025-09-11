// src/api/api.ts

const API_URL = "http://localhost:3000/inventario"; // cambia según tu backend
const API_VENTA ="http://localhost:3000"
// src/api/api.ts
export interface Producto {
  id: number;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
}

// Tipo solo para el formulario
export interface ProductoForm {
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
}
export interface VentaItemPayload {
  productoId: number;
  cantidad: number;
}

export interface VentaResponse {
  id: number;
  total: number;
  fecha: string;
}


// ✅ Obtener todos los productos
export async function getProductos(): Promise<Producto[]> {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) {
    throw new Error("Error al cargar productos");
  }
  return res.json();
}

// ✅ Crear un producto
export async function createProducto(producto: Omit<Producto, "id">): Promise<Producto> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (res.status !== 201) {
    throw new Error("Error al crear producto");
  }

  return res.json();
}

export async function deleteProducto(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar producto con id ${id}`);
  }
}

// Actualizar producto
export async function updateProducto(id: number, producto: Omit<Producto, "id">): Promise<Producto> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) {
    throw new Error("Error al actualizar producto");
  }
  return res.json();
}

export async function registrarVenta(
  items: VentaItemPayload[]
): Promise<VentaResponse> {
  const res = await fetch(`${API_VENTA}/venta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error al registrar venta: ${msg}`);
  }

  return res.json();
}