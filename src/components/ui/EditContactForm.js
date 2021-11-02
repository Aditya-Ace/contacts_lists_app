import { useContext, useCallback, memo } from 'react'
import { ContactsContext } from '../../ContactsDataContext'
import Button from '../controls/Button'
import Container from './Container'
import { Form, useForm } from '../../hooks/useForm'
import { initialFormValues } from '../../common/Constants'

const EditContactForm = ({ setOpenModal, editData, setEditData }) => {
  const [contactsData, saveContactsData, searchData, setSearchData] =
    useContext(ContactsContext)
  const { values, resetForm, handleInputChange } = useForm(editData)

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (
        values.firstName !== '' &&
        values.lastName !== '' &&
        values.email !== ''
      ) {
        const tempData = [...contactsData]
        const index = tempData.findIndex((obj) => obj.id === editData.id)
        const tempElement = { ...tempData[index] }
        tempElement.firstName = values.firstName
        tempElement.lastName = values.lastName
        tempElement.email = values.email
        tempElement.tag = values.tag
        tempData[index] = tempElement
        saveContactsData(tempData)
        setSearchData(tempData)
      }
      resetForm()
      setOpenModal(false)
      setEditData(initialFormValues)
    },
    [
      contactsData,
      editData.id,
      resetForm,
      saveContactsData,
      setEditData,
      setOpenModal,
      values.email,
      values.firstName,
      values.lastName,
      values.tag
    ]
  )

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <p>
          <label>First name</label>
          <br />
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            autoComplete="off"
            onChange={handleInputChange}
            className="form__input"
          />
        </p>
        <p>
          <label>Last name</label>
          <br />
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            autoComplete="off"
            onChange={handleInputChange}
            className="form__input"
          />
        </p>
        <p>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={values.email}
            required
            autoComplete="off"
            onChange={handleInputChange}
            className="form__input"
          />
        </p>
        <p>
          <label>Tag</label>
          <br />
          <select name="tag" value={values.tag} onChange={handleInputChange}>
            <option value="Family">Family</option>
            <option value="Friend">Friend</option>
            <option value="School">School</option>
            <option value="Work">Work</option>
          </select>
        </p>
        <div className="form__btn__group">
          <Button
            type="submit"
            title="Update"
            backgroundColor="#0575e6"
            color="#eee"
          />
          <Button
            type="reset"
            title="Reset From"
            onClick={resetForm}
            backgroundColor="#E74C3C"
            color="#eee"
          />
        </div>
      </Form>
    </Container>
  )
}

export default memo(EditContactForm)
