import { useState } from 'react'

export function useForm(initialFormValues) {
  const [values, setValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const resetForm = () => {
    setValues(initialFormValues)
  }

  return {
    values,
    errors,
    setErrors,
    setValues,
    resetForm,
    handleInputChange
  }
}

export function Form({ children, ...other }) {
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  )
}
