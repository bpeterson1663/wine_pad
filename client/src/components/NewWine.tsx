import React from 'react'
import api from '../api/index'
import { useForm } from 'react-hook-form'

const NewWine: React.FunctionComponent = (): JSX.Element => {
  const { handleSubmit, register, errors } = useForm()

  const createWine = (data) => {
    api
      .createWine({
        name: data.name,
      })
      .then(() => {})
      .catch((error) => console.error(error))
  }
  return (
    <div>
      <form onSubmit={handleSubmit(createWine)}>
        <label>Name: </label>
        <input
          name="name"
          ref={register({
            required: 'Required',
          })}
        />
        <button type="submit">Create Test Wine</button>
      </form>
      {errors.name && 'Name of the wine is require'}
    </div>
  )
}

export default NewWine
