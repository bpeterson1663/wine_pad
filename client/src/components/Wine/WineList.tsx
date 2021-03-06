import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth.context'
import api from '../../api/api'
import { Table, Spin } from 'antd'
import { WineItem } from '../../constants/Types'

const WineList: React.FunctionComponent = (): JSX.Element => {
  const [wineList, setWineList] = useState([])
  const [vendorList, setVendorList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const auth = useContext(AuthContext)

  const getVendor = (id: string): string => {
    const vendor = vendorList.find((item) => item._id === id)
    return vendor ? vendor.name : ''
  }

  const columns = [
    {
      title: '',
      dataIndex: 'imageUrl',
      render: (text: string, value: WineItem) => (
        <img src={decodeURIComponent(value.imageUrl)} width={30} height={75} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, value: WineItem) => <Link to={`/wine/${value._id}`}>{text}</Link>,
      sorter: (a: WineItem, b: WineItem) => a.name.length - b.name.length,
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
      title: 'Par',
      dataIndex: 'par',
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
    await Promise.all([api.getAllWines(auth.userId), api.getAllVendors(auth.userId)])
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
