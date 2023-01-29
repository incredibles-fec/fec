import ReactDom from 'react-dom';

const Modal = ({ children, close }) =>
  ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={close}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header-actions">
            <button onClick={close}>X</button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );

export default Modal;
