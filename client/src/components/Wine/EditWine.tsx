import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Form, Input, InputNumber, Spin, Result, Button, message, Select } from 'antd'
import api from '../../api/api'
import AuthContext from '../../context/auth.context'
import { WineItem } from '../../constants/Types'
import { useParams, useHistory } from 'react-router-dom'
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

const EditWine: React.FunctionComponent = (): JSX.Element => {
  const history = useHistory()
  const [form] = Form.useForm()
  const { Option } = Select
  const { TextArea } = Input
  const [isLoading, setIsLoading] = useState(true)
  const [vendorList, setVendorList] = useState([])
  const [noError, setNoError] = useState(true)
  const [dataUri, setDataUri] = useState('')
  const [pictureMode, setPictureMode] = useState(false)
  const auth = useContext(AuthContext)
  const { id } = useParams()
  const fetchData = async () => {
    await Promise.all([api.getWine(id), api.getAllVendors(auth.userId)])
      .then((res) => {
        const [wineRes, vendorRes] = res
        setVendorList(vendorRes.data.items)
        form.setFieldsValue({
          ...wineRes.data.item,
        })
        setDataUri(decodeURIComponent(wineRes.data.item.imageUrl))
      })
      .catch(() => setNoError(false))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTakePhotoAnimationDone = (dataURI: string) => {
    setDataUri(dataURI)
    setPictureMode(false)
  }

  const handleDelete = () => {
    api.deleteWine(id).then((res) => {
      message.success('Wine was removed successfully')
      history.push('/wines')
    })
  }

  const handleUpdate = (data: WineItem) => {
    setIsLoading(true)
    data.imageUrl = dataUri
    api
      .updateWine(id, data)
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
            <Form.Item name="par" label="Par Stock">
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
            {pictureMode ? (
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    setPictureMode(false)
                  }}
                >
                  Turn Off Camera
                </Button>
                <Camera
                  idealResolution={{ width: 150, height: 300 }}
                  imageType={IMAGE_TYPES.JPG}
                  imageCompression={0.97}
                  onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                />
              </div>
            ) : null}
            <div>
              {dataUri && !pictureMode ? (
                <div>
                  <img src={dataUri} />
                  <Button type="primary" onClick={() => setPictureMode(true)}>
                    Retake Picture
                  </Button>
                </div>
              ) : null}
            </div>
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
