import React from 'react'
import { Header, ProductsTable } from '../components';

const Products = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Products" />

    <div>
    <ProductsTable />
    </div>
    </div>
  )
}

export default Products