import * as React from 'react'
import { useState } from 'react'
import api from '../../api/api'
import { useForm } from 'react-hook-form'
import { Spin, message } from 'antd'
import { WineItem } from '../../constants/Types'

const NewWine: React.FunctionComponent = (): JSX.Element => {
  const { handleSubmit, register, errors, reset } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const createWine = (data: WineItem) => {
    setIsLoading(true)
    api
      .createWine({
        ...data,
        cellarId: 'cellarId',
      })
      .then(() => {
        message.success('Wine was created successfully')
        reset()
      })
      .catch((error) => message.error(`An error occurred: ${error}`))
      .finally(() => setIsLoading(false))
  }
  return (
    <main>
      <h2>New Wine</h2>
      <Spin tip="Loading..." spinning={isLoading}>
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
            <label htmlFor="vintage">Vintage: </label>
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
      </Spin>
    </main>
  )
}

export default NewWine
