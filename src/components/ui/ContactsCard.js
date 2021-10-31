import { useContext, useState, useCallback, memo, useEffect } from 'react'
import { ContactsContext } from '../../ContactsDataContext'
import EditContactForm from './EditContactForm'
import Modal from './Modal'
import Button from '../controls/Button'
import { initialFormValues } from '../../common/Constants'

const ContactCard = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState(initialFormValues)
  const [contactsData, saveContactsData] = useContext(ContactsContext)

  const handleContactEdit = useCallback(
    (id) => {
      const tempData = [...contactsData]
      const toEditData = tempData.find((contact) => contact.id === id)
      setOpenEdit(true)
      setEditData(toEditData)
    },
    [contactsData]
  )

  useEffect(() => {
    !openEdit && setEditData(initialFormValues)
  }, [openEdit])

  const handleContactDelete = (id) => {
    const tempData = [...contactsData]
    const newContacts = tempData.filter((contact) => contact.id !== id)
    saveContactsData(newContacts)
  }
  return (
    <main className="card__body">
      <header className="card__header">
        {contactsData.length < 1 ? (
          <h4>Hi! Your contacts are empty. Start filling in ...</h4>
        ) : (
          <h4>Contacts List</h4>
        )}
      </header>
      <div className="card__content">
        {contactsData.map((contact, index) => {
          return (
            <main className="profile" key={index}>
              <div className="article__body">
                <article
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    fontSize: '2rem'
                  }}
                >
                  {contact.firstName} {contact.lastName}
                </article>
                <article style={{ marginBottom: '0.5rem' }}>
                  {contact.email}
                </article>
                <article style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>TAG</span>: {contact.tag}
                </article>
              </div>
              <div className="card__btn__group">
                <Button
                  onClick={() => handleContactEdit(contact.id)}
                  title="Edit"
                  backgroundColor="#0575e6"
                  color="#eee"
                />
                <Button
                  onClick={() => handleContactDelete(contact.id)}
                  title="X"
                  backgroundColor="#E74C3C"
                  color="#eee"
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
          title="Edit contact"
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

export default memo(ContactCard)
