import * as React from 'react'
import { useEffect, useState } from 'react'
import api from '../../api/api'

const WineList: React.FunctionComponent = (): JSX.Element => {
  const [wineList, setWineList] = useState([])

  useEffect(() => {
    document.title = 'Wine list'
    api
      .getAllWines('cellarId')
      .then((res) => {
        if (res.data) {
          setWineList(res.data.items)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <main>
      <h2>Wine List</h2>
      {wineList.map((wine, i) => {
        return <div key={i}>{wine.name}</div>
      })}
    </main>
  )
}

export default WineList
