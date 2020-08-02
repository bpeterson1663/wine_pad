import * as React from 'react'
import { Table } from 'antd'
import { WineItem } from '../../constants/Types'
import { Link } from 'react-router-dom'

interface VTProps {
  vendor: string
  wines: WineItem[]
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
    title: 'Region',
    dataIndex: 'region',
  },
  {
    title: 'Appellation',
    dataIndex: 'appellation',
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
]
const VendorTable: React.FunctionComponent<VTProps> = (props): JSX.Element => {
  const { wines, vendor } = props
  return (
    <section>
      <h3>{vendor}</h3>
      <Table rowKey={(record) => record._id} dataSource={wines} columns={columns} />
    </section>
  )
}

export default VendorTable
