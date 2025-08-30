import type { ReactNode } from "react";
import "../../Style/Modal.css"

interface Props {
  titulo: string;
  children: ReactNode;
  onClose: () => void;
  accionesExtra?: ReactNode;
}

export default function Modal({ titulo, children, onClose, accionesExtra }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{titulo}</h3>
        
        <div className="modal-content">{children}</div>

        <div className="modal-actions">
          {accionesExtra}
          <button className="btn-cerrar" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
