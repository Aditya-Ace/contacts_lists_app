import { useContext } from 'react'
import { ContactsContext } from '../../ContactsDataContext'
import Button from '../controls/Button'
import Container from './Container'
import { Form, useForm } from '../../hooks/useForm'

const initialFormValues = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  tag: 'Family'
}
const ContactForm = ({ setOpenModal }) => {
  const { values, resetForm, handleInputChange } = useForm(initialFormValues)
  const [contactsData, setContactsData] = useContext(ContactsContext)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (
      values.firstName !== '' &&
      values.lastName !== '' &&
      values.email !== ''
    ) {
      values['id'] = contactsData.length + 1
      setContactsData((prev) => [...prev, values])
    }
    resetForm()
    setOpenModal(false)
  }
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
          />
        </p>
        <p>
          <label>Tag</label>
          <br />
          <select name="tag" values={values.tag} onChange={handleInputChange}>
            <option>Family</option>
            <option>Friend</option>
            <option>School</option>
            <option>Work</option>
          </select>
        </p>
        <div className="form__btn__group">
          <Button type="submit" title="Add" />
          <Button type="reset" title="Reset From" onClick={resetForm} />
        </div>
      </Form>
    </Container>
  )
}

export default ContactForm
