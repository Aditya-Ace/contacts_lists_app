import { useState, createContext } from 'react'

export const ContactsContext = createContext()

export const ContactsDataProvider = ({ children }) => {
  const [contactsData, setContactsData] = useState([])

  return (
    <ContactsContext.Provider value={[contactsData, setContactsData]}>
      {children}
    </ContactsContext.Provider>
  )
}
