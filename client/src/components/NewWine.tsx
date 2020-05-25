import * as React from 'react'
import api from '../api/api'
import { useForm } from 'react-hook-form'

interface wineItem {
  name: string
  varietal: string
  vintage: string
  region: string
  appelation: string
  price: number
  cost: number
  tastingNotes: string
}

const NewWine: React.FunctionComponent = (): JSX.Element => {
  const { handleSubmit, register, errors } = useForm()

  const createWine = (data: wineItem): void => {
    api
      .createWine({
        ...data,
      })
      .then(() => {})
      .catch((error) => console.error(error))
  }
  return (
    <div>
      <form onSubmit={handleSubmit(createWine)}>
        <fieldset>
          <legend>New Wine</legend>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            ref={register({
              required: 'Required',
            })}
          />
          {errors.name && 'Name of the wine is require'}
          <label htmlFor="varietal">Varietal: </label>
          <input id="varietal" name="varietal" ref={register} />
          <label htmlFor="vintage">vintage: </label>
          <input id="vintage" name="vintage" ref={register} />
          <label htmlFor="region">Region: </label>
          <input id="region" name="region" ref={register} />
          <label htmlFor="appelation">Appelation: </label>
          <input id="appelation" name="appelation" ref={register} />
          <label htmlFor="price">Price: </label>
          <input id="price" name="price" type="number" ref={register} />
          <label htmlFor="cost">Cost: </label>
          <input id="cost" name="cost" type="number" ref={register} />
          <label htmlFor="tastingNotes">Tasting Notes: </label>
          <textarea id="tastingNotes" name="tastingNotes" ref={register} />
          <button type="submit">Create</button>
        </fieldset>
      </form>
    </div>
  )
}

export default NewWine
