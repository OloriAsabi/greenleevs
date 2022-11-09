import React from 'react'
import { CategoryTable, Header } from '../components';

const Categories = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Categories" />

    <div>
    <CategoryTable />
    </div>
    </div>
  )
}

export default Categories