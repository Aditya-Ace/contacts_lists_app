import { useState, createContext, useEffect, useCallback } from 'react'
import { DUMMY_DATA } from './common/Constants'

export const ContactsContext = createContext(
  JSON.parse(localStorage.getItem('contactData') || '[]')
)

export const ContactsDataProvider = ({ children }) => {
  const [contactsData, setContactsData] = useState([])
  const [searchData, setSearchData] = useState([])

  const saveContactsData = useCallback((contacts) => {
    localStorage.setItem('contactData', JSON.stringify(contacts))
    setContactsData(contacts)
  }, [])

  useEffect(() => {
    const getDataFromLS = localStorage.getItem('contactData') || '[]'
    let contacts = JSON.parse(getDataFromLS)
    if (!contacts.length) {
      contacts = DUMMY_DATA
      saveContactsData(contacts)
    }
    setContactsData(contacts)
  }, [saveContactsData])

  return (
    <ContactsContext.Provider
      value={[contactsData, saveContactsData, searchData, setSearchData]}
    >
      {children}
    </ContactsContext.Provider>
  )
}
