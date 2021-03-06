import * as React from 'react'
import { useContext, useState } from 'react'
import api from '../../api/api'
import AuthContext from '../../context/auth.context'
import { Form, Input, Spin, Button, message } from 'antd'

type User = {
  email: string
  password: string
}
type TParams = { history: [string] }
const SignUp: React.FunctionComponent<TParams> = (props): JSX.Element => {
  const { history } = props
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const auth = useContext(AuthContext)

  const createUser = (data: User): void => {
    setIsLoading(true)
    api
      .createUser(data)
      .then((res) => {
        setIsLoading(false)
        auth.setAuthentication(true, res.data.userId)
        message.success('Signup Successful')
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.error
        setIsLoading(false)
        message.error(errorMessage ? errorMessage : 'An Error Occurred')
      })
  }
  return (
    <main>
      <h2>Sign Up</h2>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form form={form} onFinish={createUser}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'Must be a valid email' },
              { required: true, message: 'Email is required' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password is required' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </main>
  )
}

export default SignUp
