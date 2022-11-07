import React from 'react'
import { CustomersTable, Header } from '../components';

const Customers = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Customers" />

    <div>
    <CustomersTable />
    </div>
    </div>
  )
}

export default Customers