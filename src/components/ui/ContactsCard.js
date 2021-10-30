import { useContext, useState } from 'react'
import { ContactsContext } from '../../ContactsDataContext'
import EditContactForm from './EditContactForm'
import Modal from './Modal'
import Button from '../controls/Button'

const initialFormValues = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  tag: ''
}
const ContactCard = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState(initialFormValues)
  const [contactsData, setContactsData] = useContext(ContactsContext)

  const handleContactEdit = (id) => {
    const toEditData = contactsData.find((contact) => contact.id === id)
    setOpenEdit(true)
    setEditData(toEditData)
  }

  const handleContactDelete = (id) => {
    const newContacts = contactsData.filter((contact) => contact.id !== id)
    setContactsData((prev) => [...newContacts])
  }
  return (
    <main className="card__body">
      <header className="card__header">
        {contactsData.length < 1 ? (
          <h4>Hi! Your contacts are empty. Start filling in ...</h4>
        ) : (
          <h4>Checkout your contacts List</h4>
        )}
      </header>
      <div className="card__content">
        {contactsData.map((contact, index) => {
          return (
            <main className="profile" key={index}>
              <article>
                {contact.firstName} {contact.lastName}
              </article>
              <article>{contact.email}</article>
              <article>TAG: {contact.tag}</article>
              <div className="card__btn__group">
                <Button
                  onClick={() => handleContactEdit(contact.id)}
                  title="Edit"
                  backgroundColor="#F8C471"
                />
                <Button
                  onClick={() => handleContactDelete(contact.id)}
                  title="X"
                  backgroundColor="#E74C3C"
                />
              </div>
            </main>
          )
        })}
      </div>
      {editData.firstName !== '' && (
        <Modal
          openModal={openEdit}
          setOpenModal={setOpenEdit}
          setEditData={setEditData}
        >
          <EditContactForm
            setOpenModal={setOpenEdit}
            editData={editData}
            setEditData={setEditData}
          />
        </Modal>
      )}
    </main>
  )
}

export default ContactCard
