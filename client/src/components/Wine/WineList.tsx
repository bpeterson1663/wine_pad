import * as React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import { Table, Spin } from 'antd'
import { WineItem } from '../../constants/Types'

const WineList: React.FunctionComponent = (): JSX.Element => {
  const [wineList, setWineList] = useState([])
  const [vendorList, setVendorList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getVendor = (id: string): string => {
    const vendor = vendorList.find((item) => item._id === id)
    return vendor ? vendor.name : ''
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, value: WineItem) => <Link to={`/wine/${value._id}`}>{text}</Link>,
    },
    {
      title: 'Vintage',
      dataIndex: 'vintage',
    },
    {
      title: 'Varietal',
      dataIndex: 'varietal',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorId',
      render: (text: string, value: WineItem) => (
        <Link to={`/vendor/${value.vendorId}`}>{getVendor(value.vendorId)}</Link>
      ),
    },
    {
      title: 'Region',
      dataIndex: 'region',
    },
    {
      title: 'Appellation',
      dataIndex: 'appellation',
    },
    {
      title: 'Inventory',
      dataIndex: 'inventory',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
  ]
  const fetchData = async () => {
    await Promise.all([api.getAllWines('cellarId'), api.getAllVendors('cellarId')])
      .then((res) => {
        const [winesRes, vendorRes] = res
        if (winesRes.data) {
          const items = winesRes.data.items.map((item: WineItem, i: number) => {
            item.key = i
            return item
          })
          setWineList(items)
        }
        if (vendorRes.data) {
          setVendorList(vendorRes.data.items)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      <h2>Wine List</h2>
      <Spin tip="Loading..." spinning={isLoading}>
        <Table dataSource={wineList} columns={columns} />
      </Spin>
    </main>
  )
}

export default WineList
