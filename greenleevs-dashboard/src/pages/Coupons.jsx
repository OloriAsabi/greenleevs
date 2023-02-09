import React from 'react'
import { CouponTable, Header } from '../components';

const Coupons = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Coupons" />

    <div>
    <CouponTable />
    </div>
    </div>
  )
}

export default Coupons