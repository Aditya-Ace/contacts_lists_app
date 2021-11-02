import { useContext, memo, useCallback } from 'react'
import { ContactsContext } from '../../ContactsDataContext'
import Button from '../controls/Button'
import Container from './Container'
import { Form, useForm } from '../../hooks/useForm'
import { initialFormValues } from '../../common/Constants'
import { sortArray } from '../../common/utils'

const ContactForm = ({ setOpenModal }) => {
  const { values, resetForm, handleInputChange } = useForm(initialFormValues)
  const [contactsData, saveContactsData] = useContext(ContactsContext)
  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (
        values.firstName !== '' &&
        values.lastName !== '' &&
        values.email !== ''
      ) {
        const tempData = [...contactsData]
        values['id'] = tempData.length + 1
        tempData.push(values)
        saveContactsData(sortArray(tempData))
        resetForm()
        setOpenModal(false)
      }
    },
    [contactsData, resetForm, saveContactsData, setOpenModal, values]
  )
  return (
    <Container>
      <Form onSubmit={(e) => handleFormSubmit(e)}>
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
            required
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
            required
          />
        </p>
        <p>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleInputChange}
            className="form__input"
            required
          />
        </p>
        <p>
          <label>Tag</label>
          <br />
          <select name="tag" values={values.tag} onChange={handleInputChange}>
            <option value="Select">Select</option>
            <option value="Family">Family</option>
            <option value="Friend">Friend</option>
            <option value="School">School</option>
            <option value="Work">Work</option>
          </select>
        </p>
        <div className="form__btn__group">
          <Button
            type="submit"
            title="Add"
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

export default memo(ContactForm)
