import * as React from 'react'
import { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Spin, Result, Button, message } from 'antd'
import api from '../../api/api'
import { WineItem } from '../../constants/Types'
type TParams = { match: { params: { id: string } }; history: [string] }

const EditWine: React.FunctionComponent<TParams> = (props): JSX.Element => {
  const { match, history } = props
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [isLoading, setIsLoading] = useState(true)
  const [noError, setNoError] = useState(true)

  const wineId = match.params.id
  useEffect(() => {
    api
      .getWine(wineId)
      .then((res) => {
        form.setFieldsValue({
          ...res.data.item,
        })
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
        setIsLoading(false)
        message.success(`${data.name} was updated successfully`)
        // setEditWine(data)
      })
      .catch((error) => {
        setIsLoading(false)
        message.error(`An error occured: ${error}`)
      })
  }

  const EditForm: React.FunctionComponent = (): JSX.Element => {
    return (
      <div>
        <Spin tip="Loading..." spinning={isLoading}>
          <Form form={form} onFinish={handleUpdate} layout="horizontal" size="small">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Name of wine is required',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="varietal" label="Varietal">
              <Input />
            </Form.Item>
            <Form.Item name="vintage" label="Vintage">
              <Input />
            </Form.Item>
            <Form.Item name="region" label="Region">
              <Input />
            </Form.Item>
            <Form.Item name="appellation" label="Appellation">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <InputNumber />
            </Form.Item>
            <Form.Item name="cost" label="Cost">
              <InputNumber />
            </Form.Item>
            <Form.Item name="tastingNotes" label="Tasting Notes">
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        <Button onClick={handleDelete}>Delete</Button>
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
