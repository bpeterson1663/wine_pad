import * as React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spin, Result, Button, message } from 'antd'
import api from '../../api/api'
import { WineItem } from '../../constants/Types'
type TParams = { match: { params: { id: string } }; history: [string] }

const EditWine: React.FunctionComponent<TParams> = (props): JSX.Element => {
  const { match, history } = props
  const [isLoading, setIsLoading] = useState(true)
  const [noError, setNoError] = useState(true)
  const [editWine, setEditWine] = useState<WineItem>({
    name: '',
    varietal: '',
    vintage: '',
    region: '',
    appelation: '',
    price: 0,
    cost: 0,
    tastingNotes: '',
    cellarId: '',
    _id: '',
    key: null,
  })
  const { handleSubmit, register, errors } = useForm()
  const wineId = match.params.id
  useEffect(() => {
    api
      .getWine(wineId)
      .then((res) => {
        setEditWine(res.data.item)
      })
      .catch(() => setNoError(false))
      .finally(() => setIsLoading(false))
  }, [])

  const handleDelete = () => {
    api.deleteWine(wineId).then((res) => {
      message.success('Wine was removed successfully')
      history.push('/wines')
    })
  }

  const handleUpdate = (data: WineItem) => {
    setIsLoading(true)
    api
      .updateWine(wineId, data)
      .then(() => {
        message.success(`${data.name} was updated successfully`)
        setEditWine(data)
      })
      .catch((error) => message.error(`An error occured: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const EditForm: React.FunctionComponent = (): JSX.Element => {
    return (
      <div>
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
          </fieldset>
        </form>
        <button onClick={handleDelete}>Delete</button>
      </div>
    )
  }

  const ErrorMessage: React.FunctionComponent = (): JSX.Element => {
    return (
      <Result
        status="warning"
        title="Wine was not found"
        extra={
          <Button type="primary" key="console" onClick={() => history.push('/wines')}>
            Return to wine list
          </Button>
        }
      />
    )
  }
  return (
    <main>
      <h2>Edit Wine</h2>
      <Spin tip="Loading..." spinning={isLoading}>
        {noError ? <EditForm /> : <ErrorMessage />}
      </Spin>
    </main>
  )
}

export default EditWine
