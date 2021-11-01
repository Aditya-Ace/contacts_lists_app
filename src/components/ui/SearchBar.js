import { useContext, useState, useCallback, memo } from 'react'
import { ContactsContext } from '../../ContactsDataContext'
import { sortArray } from '../../common/utils'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [contactsData, saveContactsData] = useContext(ContactsContext)
  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim().toLowerCase())
  }
  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const tempData = [...contactsData]
      sortArray(tempData)
      const searchData =
        search &&
        tempData.filter(
          (element) =>
            element.firstName.toLowerCase().includes(search) ||
            element.lastName.toLowerCase().includes(search) ||
            element.email.toLowerCase().includes(search)
        )

      if (searchData.length) {
        const newData = tempData.filter(
          (value, index) => value.id !== searchData[0].id
        )
        const updatedList = [...searchData, ...newData]
        saveContactsData(updatedList)
        setSearch('')
      } else {
        saveContactsData(tempData)
      }
    },
    [contactsData, saveContactsData, search]
  )

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
export default memo(SearchBar)
