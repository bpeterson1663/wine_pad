import * as React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import api from '../../api/api'

type TParams = { match: { params: { id: string } }; history: [string] }

interface WineType {
  name: string
  varietal: string
  vintage: string
  region: string
  appelation: string
  price: number
  cost: number
  tastingNotes: string
  cellarId: string
}

const EditWine: React.FunctionComponent<TParams> = (props): JSX.Element => {
  const { match, history } = props
  const [editWine, setEditWine] = useState<WineType>({
    name: '',
    varietal: '',
    vintage: '',
    region: '',
    appelation: '',
    price: 0,
    cost: 0,
    tastingNotes: '',
    cellarId: '',
  })
  const { handleSubmit, register, errors } = useForm()
  const wineId = match.params.id
  useEffect(() => {
    api.getWine(wineId).then((res) => {
      setEditWine(res.data.item)
    })
  }, [])

  const handleDelete = () => {
    api.deleteWine(wineId).then((res) => {
      history.push('/wines')
    })
  }

  const handleUpdate = (data: WineType) => {
    api
      .updateWine(wineId, data)
      .then((res) => {})
      .catch((error) => console.error(error))
  }
  return (
    <main>
      <h2>Edit Wine</h2>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <fieldset>
          <legend>New Wine</legend>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            defaultValue={editWine.name}
            name="name"
            ref={register({
              required: 'Required',
            })}
          />
          {errors.name && 'Name of the wine is require'}
          <label htmlFor="varietal">Varietal: </label>
          <input id="varietal" name="varietal" ref={register} defaultValue={editWine.varietal} />
          <label htmlFor="vintage">Vintage: </label>
          <input id="vintage" name="vintage" ref={register} defaultValue={editWine.vintage} />
          <label htmlFor="region">Region: </label>
          <input id="region" name="region" ref={register} defaultValue={editWine.region} />
          <label htmlFor="appelation">Appelation: </label>
          <input id="appelation" name="appelation" ref={register} defaultValue={editWine.appelation} />
          <label htmlFor="price">Price: </label>
          <input id="price" name="price" type="number" ref={register} defaultValue={editWine.price} />
          <label htmlFor="cost">Cost: </label>
          <input id="cost" name="cost" type="number" ref={register} defaultValue={editWine.cost} />
          <label htmlFor="tastingNotes">Tasting Notes: </label>
          <textarea id="tastingNotes" name="tastingNotes" ref={register} defaultValue={editWine.tastingNotes} />
          <button type="submit">Update</button>
          <button onClick={handleDelete}>Delete</button>
        </fieldset>
      </form>
    </main>
  )
}

export default EditWine
