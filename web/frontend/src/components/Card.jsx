import React from 'react'

const Card = () => {
  return (
    <div className='w-full md:w-1/4 flex flex-col gap-2 justify-center items-center p-6 rounded-2xl bg-gray-300 shadow-md'>
        <p className='mb-2 text-md text-gray-500'>Todays Delivery</p>
        <h2 className='text-xl text-black font-bold'>24 Orders</h2>
    </div>
  )
}

export default Card