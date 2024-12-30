import React from 'react'

const OrdersPage = () => {
  return (
    <div className={`flex-1 ml-20 pl-4 md:ml-2 md:pl-2 transition-all duration-300 ease-in-out`}>
        <div>
          <h1 className="mt-10 text-xl font-semibold sm:text-3xl sm:font-bold">Product Details</h1>
          <p className="mt-4">Here are your details and controls.</p>
        </div>

        <div className="mt-8 mr-4 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Admin Details</h2>
          <p className="mt-2">Name: Admin User</p>
          <p>Email: admin@example.com</p>
          <p>Role: Admin</p>
        </div>
    </div>
  )
}

export default OrdersPage