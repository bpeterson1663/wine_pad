import * as React from 'react'
import { useEffect, useContext, useState } from 'react'
import api from '../../api/api'
import AuthContext from '../../context/auth.context'
import VendorTable from './VendorTable'
import { WineItem, VendorItem } from '../../constants/Types'

const OrderForm: React.FunctionComponent = (): JSX.Element => {
  const auth = useContext(AuthContext)
  const [winesToOrder, setWinesToOrder] = useState([])

  const fetchData = async () => {
    await Promise.all([api.getWinesByPar(auth.userId), api.getAllVendors(auth.userId)])
      .then((res) => {
        const [wineRes, vendorRes] = res
        createWinesByVendorList(wineRes.data.items, vendorRes.data.items)
      })
      .catch((err) => console.error(err))
  }

  const createWinesByVendorList = (wines: WineItem[], vendors: VendorItem[]) => {
    const orderList: Array<{ vendorName: string; wines: WineItem[] }> = []

    wines.forEach((wine) => {
      const vendor = vendors.find((vendor) => vendor._id === wine.vendorId)
      const vendorExists = orderList.find((order) => order.vendorName === vendor.name)
      if (vendorExists) {
        vendorExists.wines.push(wine)
      } else {
        orderList.push({ vendorName: vendor ? vendor.name : 'No Vendor Selected', wines: [wine] })
      }
    })
    setWinesToOrder(orderList)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <main>
      <h2>Order Form</h2>
      {winesToOrder.map((order, i) => {
        return <VendorTable key={i} wines={order.wines} vendor={order.vendorName} />
      })}
    </main>
  )
}

export default OrderForm
