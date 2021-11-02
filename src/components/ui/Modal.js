import { useRef, useEffect } from 'react'

const Modal = ({ children, openModal, setOpenModal, title }) => {
  const modalRef = useRef()
  useEffect(() => {
    const element = modalRef.current
    if (openModal) {
      element.style.display = 'block'
    } else {
      element.style.display = 'none'
      setOpenModal(false)
    }
    window.onclick = function (event) {
      if (event.target === element) {
        element.style.display = 'none'
        setOpenModal(false)
      }
    }
  }, [openModal, setOpenModal])

  const handleModalClose = () => {
    const element = modalRef.current
    element.style.display = 'none'
    setOpenModal(false)
  }

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={handleModalClose}>
            &times;
          </span>
          <h4>{title}</h4>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
