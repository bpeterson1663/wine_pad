import * as React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import { Table, Spin } from 'antd'
import { VendorItem } from '../../constants/Types'

const VendorList: React.FunctionComponent = (): JSX.Element => {
  const [vendorList, setVendorList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, value: VendorItem) => <Link to={`/vendor/${value._id}`}>{text}</Link>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    api
      .getAllVendors('cellarId')
      .then((res) => {
        if (res.data) {
          const items = res.data.items.map((item: VendorItem, i: number) => {
            item.key = i
            return item
          })
          setVendorList(items)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <main>
      <h2>Vendors</h2>
      <Spin tip="Loading..." spinning={isLoading}>
        <Table dataSource={vendorList} columns={columns} />
      </Spin>
    </main>
  )
}

export default VendorList
