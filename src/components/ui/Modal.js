import { useRef, useEffect } from 'react'

const initialFormValues = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  tag: ''
}
const Modal = ({ children, openModal, setOpenModal, setEditData }) => {
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
        setEditData(initialFormValues)
      }
    }
  }, [openModal, setOpenModal, setEditData])

  const handleModalClose = () => {
    const element = modalRef.current
    element.style.display = 'none'
    setOpenModal(false)
    setEditData(initialFormValues)
  }

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={handleModalClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal
