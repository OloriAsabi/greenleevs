import React from 'react'
import { Header, OrdersTable } from '../components';

const Orders = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Orders" />

    <div>
    <OrdersTable />
    </div>
    </div>
  )
}

export default Orders