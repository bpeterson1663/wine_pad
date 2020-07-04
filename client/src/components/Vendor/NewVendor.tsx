import * as React from 'react'
import { useState, useContext } from 'react'
import { Form, Input, Button, message, Spin } from 'antd'
import { VendorItem } from '../../constants/Types'
import AuthContext from '../../context/auth.context'
import api from '../../api/api'

const NewVendor: React.FunctionComponent = (): JSX.Element => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [isLoading, setIsLoading] = useState(false)
  const auth = useContext(AuthContext)
  const createVendor = (data: VendorItem) => {
    setIsLoading(true)
    api
      .createVendor({
        ...data,
        cellarId: auth.userId,
      })
      .then(() => {
        message.success('Vendor was created successfully')
        form.resetFields()
      })
      .catch((error) => message.error(`An error occurred: ${error}`))
      .finally(() => setIsLoading(false))
  }

  return (
    <main>
      <h2>New Vendor</h2>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form form={form} onFinish={createVendor} layout="horizontal">
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
    </main>
  )
}

export default NewVendor
