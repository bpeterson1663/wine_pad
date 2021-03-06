import * as React from 'react'
import { useState, useEffect, useContext, SVGProps } from 'react'
import api from '../../api/api'
import AuthContext from '../../context/auth.context'
import { WineItem } from '../../constants/Types'
import { Form, Input, Button, InputNumber, Spin, message, Select } from 'antd'
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import './index.css'
const NewWine: React.FunctionComponent = (): JSX.Element => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const { Option } = Select
  const [isLoading, setIsLoading] = useState(false)
  const [vendorList, setVendorList] = useState([])
  const [dataUri, setDataUri] = useState('')
  const [pictureMode, setPictureMode] = useState(false)
  const auth = useContext(AuthContext)
  useEffect(() => {
    api.getAllVendors(auth.userId).then((res) => {
      const items = res.data.items
      setVendorList(items)
    })
  }, [])

  const handleTakePhotoAnimationDone = (dataURI: string) => setDataUri(dataURI)

  const createWine = (data: WineItem) => {
    setIsLoading(true)
    api
      .createWine({
        ...data,
        imageUrl: encodeURIComponent(dataUri),
        cellarId: auth.userId,
      })
      .then(() => {
        message.success('Wine was created successfully')
        form.resetFields()
      })
      .catch((error) => message.error(`An error occurred: ${error}`))
      .finally(() => setIsLoading(false))
  }
  return (
    <main className="form-container">
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
          <Form.Item name="par" label="Par">
            <InputNumber />
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
          <Form.Item name="description" label="Description">
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
          {!dataUri ? (
            <Button
              type="primary"
              onClick={() => {
                setPictureMode((currentState) => !currentState)
              }}
            >
              {pictureMode ? 'Turn Off Camera' : 'Take Picture'}
            </Button>
          ) : null}
          {pictureMode ? (
            <div>
              {dataUri ? (
                <div>
                  <img src={dataUri} />
                  <Button type="primary" onClick={() => setDataUri('')}>
                    Retake Picture
                  </Button>
                </div>
              ) : (
                <Camera
                  idealResolution={{ width: 150, height: 300 }}
                  imageType={IMAGE_TYPES.JPG}
                  imageCompression={0.97}
                  onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                />
              )}
            </div>
          ) : null}

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
