import React from 'react'
import { BrandTable, Header } from '../components'

const Brands = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Brands" />

    <BrandTable/>
    </div>
  )
}

export default Brands