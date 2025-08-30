interface Props {
  paginaActual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

export default function Paginacion({ paginaActual, totalPaginas, onChange }: Props) {
  return (
    <div className="paginacion">
      <button onClick={() => onChange(paginaActual - 1)} disabled={paginaActual === 1}>
        ◀
      </button>
      <span>
        Página {paginaActual} de {totalPaginas}
      </span>
      <button onClick={() => onChange(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
        ▶
      </button>
    </div>
  );
}
