import ReactDom from 'react-dom';

const Modal = ({ children, close }) =>
  ReactDom.createPortal(
    <>
      <div className="modalOverlay" onClick={close}>
        <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
          <div>
            <button onClick={close}>X</button>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );

export default Modal;
