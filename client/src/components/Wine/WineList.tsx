import * as React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import { Table, Spin } from 'antd'
import { WineItem } from '../../constants/Types'

const WineList: React.FunctionComponent = (): JSX.Element => {
  const [wineList, setWineList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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
      title: 'Region',
      dataIndex: 'region',
    },
    {
      title: 'Appellation',
      dataIndex: 'appellation',
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

  useEffect(() => {
    setIsLoading(true)
    api
      .getAllWines('cellarId')
      .then((res) => {
        if (res.data) {
          const items = res.data.items.map((item: WineItem, i: number) => {
            item.key = i
            return item
          })
          setWineList(items)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
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
