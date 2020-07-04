import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Form, Input, InputNumber, Spin, Result, Button, message, Select } from 'antd'
import api from '../../api/api'
import AuthContext from '../../context/auth.context'
import { WineItem } from '../../constants/Types'
type TParams = { match: { params: { id: string } }; history: [string] }

const EditWine: React.FunctionComponent<TParams> = (props): JSX.Element => {
  const { match, history } = props
  const [form] = Form.useForm()
  const { Option } = Select
  const { TextArea } = Input
  const [isLoading, setIsLoading] = useState(true)
  const [vendorList, setVendorList] = useState([])
  const [noError, setNoError] = useState(true)
  const auth = useContext(AuthContext)
  const wineId = match.params.id

  const fetchData = async () => {
    await Promise.all([api.getWine(wineId), api.getAllVendors(auth.userId)])
      .then((res) => {
        const [wineRes, vendorRes] = res
        setVendorList(vendorRes.data.items)
        form.setFieldsValue({
          ...wineRes.data.item,
        })
      })
      .catch(() => setNoError(false))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchData()
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
            <Form.Item name="inventory" label="Inventory">
              <InputNumber />
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
            <Form.Item name="vendorId" label="Vendor">
              <Select placeholder="Select a vendor this wine is ordered from" allowClear>
                {vendorList.map((item) => {
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
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
