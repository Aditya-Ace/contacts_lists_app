import { useContext, useState } from 'react'
import { ContactsContext } from '../../ContactsDataContext'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [contactsData, setContactsData] = useContext(ContactsContext)

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase())
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const tempData = [...contactsData]
    const sortedArray = tempData.sort((a, b) => {
      if (a.firstName < b.firstName) return -1
      return a.firstName > b.firstName ? 1 : 0
    })
    setContactsData(sortedArray)
    if (search !== '') {
      const data = tempData.filter(
        (element) => element.firstName.toLowerCase().search(search) !== -1
      )
      const updatedData = tempData.filter((tdata) => tdata.id !== data[0].id)
      setContactsData((prev) => [...data, ...updatedData])
    }
  }
  return (
    <form className="search__form" role="search" onSubmit={handleSearchSubmit}>
      <label className="search__label" htmlFor="search">
        Search contacts
      </label>
      <input
        className="search__input"
        name="search"
        value={search}
        id="search"
        type="search"
        placeholder="Search..."
        autoFocus
        onChange={handleSearchChange}
      />
      <button className="search__button" type="submit">
        Go
      </button>
    </form>
  )
}
export default SearchBar
