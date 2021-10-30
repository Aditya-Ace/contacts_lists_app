import { useState } from 'react'
import ContactForm from './components/ui/ContactForm'
import Header from './components/ui/Header'
import Modal from './components/ui/Modal'
import Button from './components/controls/Button'
import ContactCard from './components/ui/ContactsCard'
import { ContactsDataProvider } from './ContactsDataContext'

function App() {
  const [openModal, setOpenModal] = useState(false)

  const handleClick = () => {
    setOpenModal(true)
  }

  return (
    <ContactsDataProvider>
      <div className="App">
        <Header title="Contact List App" />
        <Button title="Add" onClick={handleClick} backgroundColor="#f5cba7" />
        <ContactCard />
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <ContactForm setOpenModal={setOpenModal} />
        </Modal>
      </div>
    </ContactsDataProvider>
  )
}

export default App
