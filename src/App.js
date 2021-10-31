import { useState } from 'react'
import ContactForm from './components/ui/ContactForm'
import Header from './components/ui/Header'
import Modal from './components/ui/Modal'
import Button from './components/controls/Button'
import ContactCard from './components/ui/ContactsCard'
import { ContactsDataProvider } from './ContactsDataContext'
import SearchBar from './components/ui/SearchBar'

function App() {
  const [openModal, setOpenModal] = useState(false)

  const handleClick = () => {
    setOpenModal(true)
  }

  return (
    <ContactsDataProvider>
      <div className="App">
        <Header title="Contacts" />
        <Button
          title="Add"
          onClick={handleClick}
          backgroundColor="#0575e6"
          color="#eee"
          className="add__btn"
        />
        <SearchBar />
        <ContactCard />
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          title="Add a new contact"
        >
          <ContactForm setOpenModal={setOpenModal} />
        </Modal>
      </div>
    </ContactsDataProvider>
  )
}

export default App
