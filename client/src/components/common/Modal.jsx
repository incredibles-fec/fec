import React from 'react';
import ReactDom from 'react-dom';

export default function Modal({ children, close }) {
  return ReactDom.createPortal(
    <div className="modal-overlay" onClick={close}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-actions">
          <button type="button" onClick={close}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}
