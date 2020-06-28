import * as React from 'react'
import { useState } from 'react'
import api from '../../api/api'
import { WineItem } from '../../constants/Types'
import { Form, Input, Button, InputNumber, Spin, message } from 'antd'

const NewWine: React.FunctionComponent = (): JSX.Element => {
  const [form] = Form.useForm()
  const { TextArea } = Input
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
        form.resetFields()
      })
      .catch((error) => message.error(`An error occurred: ${error}`))
      .finally(() => setIsLoading(false))
  }
  return (
    <main>
      <h2>New Wine</h2>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form form={form} onFinish={createWine} layout="horizontal" size="small">
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
    </main>
  )
}

export default NewWine
