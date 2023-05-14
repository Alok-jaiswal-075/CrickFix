import React from "react";
import  ReactDOM  from "react-dom";

const modal_styles = {
    position : "fixed",
    top: "50%",
    left : '50%',
    transform : 'translate(-50%,-50%)',
    zIndex : 1000
}

const overlay_styles = {
    position : 'fixed',
    top : '0',
    left : '0',
    right : '0',
    bottom : '0',
    backgroundColor : 'rgba(0,0,0,0.7)',
    zIndex : 1000
}


const Modal = ({open,onClose,children}) => {
    if(!open) return null

    return ReactDOM.createPortal(
        <>
            <div style={overlay_styles} />
            <div style={modal_styles}>
                <div className="card text-center mb-3">
                <div className="card-body">
                    <h5 className="card-title">{children}</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button className="btn btn-success" onClick={onClose}> Close </button>
                </div>
                </div>
            </div>
        </>,
        document.getElementById('modal')
    )
}

export default Modal