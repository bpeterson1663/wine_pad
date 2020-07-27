import * as React from 'react'
import { useEffect, useState } from 'react'
import { Form, Input, Spin, Result, Button, message } from 'antd'
import api from '../../api/api'
import { VendorItem } from '../../constants/Types'
import { useParams, useHistory } from 'react-router-dom'

const EditVendor: React.FunctionComponent = (): JSX.Element => {
  const history = useHistory()
  const { id } = useParams()
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [isLoading, setIsLoading] = useState(true)
  const [noError, setNoError] = useState(true)

  useEffect(() => {
    api
      .getVendor(id)
      .then((res) => {
        form.setFieldsValue({
          ...res.data.item,
        })
      })
      .catch(() => setNoError(false))
      .finally(() => setIsLoading(false))
  }, [])

  const handleDelete = () => {
    api.deleteVendor(id).then(() => {
      message.success('Vendor was removed successfully')
      history.push('/vendors')
    })
  }

  const handleUpdate = (data: VendorItem) => {
    setIsLoading(true)
    api
      .updateVendor(id, data)
      .then(() => {
        setIsLoading(false)
        message.success(`${data.name} was updated successfully`)
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
          <Form form={form} onFinish={handleUpdate} layout="horizontal">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name of vendor is required' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item name="notes" label="Notes">
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
        title="Vendor was not found"
        extra={
          <Button type="primary" key="console" onClick={() => history.push('/vendors')}>
            Back to Vendor List
          </Button>
        }
      />
    )
  }
  return (
    <main>
      <h2>Edit Vendor</h2>
      <Spin tip="Loading..." spinning={isLoading}>
        {noError ? <EditForm /> : <ErrorMessage />}
      </Spin>
    </main>
  )
}

export default EditVendor
