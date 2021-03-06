interface WineItem {
  name: string
  varietal: string
  vintage: string
  region: string
  price: number
  cost: number
  par: number
  inventory: number
  description: string
  cellarId: string
  vendorId: string
  imageUrl: string
  _id: string
  key: number
}

interface VendorItem {
  name: string
  email: string
  phone: string
  address: string
  cellarId: string
  notes: string
  _id: string
  key: number
}

export { WineItem, VendorItem }
