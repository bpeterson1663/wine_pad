interface WineItem {
  name: string
  varietal: string
  vintage: string
  region: string
  appellation: string
  price: number
  cost: number
  tastingNotes: string
  cellarId: string
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
