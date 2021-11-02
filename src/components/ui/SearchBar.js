import { useContext, useState, useCallback, memo } from 'react'
import { ContactsContext } from '../../ContactsDataContext'
import { sortArray } from '../../common/utils'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [contactsData, saveContactsData, setSearchData] =
    useContext(ContactsContext)

  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim().toLowerCase())
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const tempData = [...contactsData]
      const searchResult =
        search &&
        tempData.filter(
          (element) =>
            element.firstName.toLowerCase().includes(search) ||
            element.lastName.toLowerCase().includes(search) ||
            element.email.toLowerCase().includes(search)
        )

      if (searchResult.length) {
        // let newData
        // searchData.forEach(
        //   (data) => (newData = tempData.filter((value) => value.id !== data.id))
        // )
        // const updatedList = [...searchData, ...newData]
        // saveContactsData(updatedList)
        setSearchData(searchResult)
      } else {
        setSearchData([])
        setSearch('')
        sortArray(tempData)
        saveContactsData(tempData)
      }
    },
    [contactsData, saveContactsData, search, setSearchData]
  )

  return (
    <form className="search__form" role="search" onSubmit={handleSubmit}>
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
      <button className="search__button" type="button">
        Go
      </button>
    </form>
  )
}
export default memo(SearchBar)
