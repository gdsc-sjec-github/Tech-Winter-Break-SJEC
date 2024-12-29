import React, { useState } from 'react';
import { useModal } from './ModelContext.jsx'
import { useForm } from 'react-hook-form' 
import { X } from 'lucide-react'

const EditModal = () => {
  const { closeModal } = useModal();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // ADD FUNCTIONALITY HERE
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={() => closeModal('edit')}>
            <div className="flex flex-col min-w-[500px] p-14 bg-white rounded-3xl opacity-100 z-10" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center mb-8">
                    <button className="inline border border-zinc-900 p-2 rounded-full overflow-hidden" onClick={() => closeModal('edit')} ><X /></button>
                    <h2 className="text-center mx-auto font-bold text-lg sm:text-xl">Update Your Details</h2>
                </div>
                <form className="flex flex-col px-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2' htmlFor="trackingId">Tracking Number</label>
                        <input
                            className="block text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type='text'
                            id='trackingId'
                            name='trackingId'
                            placeholder='Email'
                            {...register('trackingId', {
                                required: 'Product ID is required',
                            })}
                        />
                        {errors.trackingId && <p className="mt-1 text-red-500 text-xs">{errors.trackingId.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2' htmlFor="parcelName">Parcel Name</label>
                        <input
                            className="block text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type='text'
                            id='parcelName'
                            name='parcelName'
                            placeholder='Product name ( if multiple just name the product )'
                            {...register('productName', {
                                required: 'Product name is required',
                            })}
                        />
                        {errors.productName && <p className="mt-1 text-red-500 text-xs">{errors.productName.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2' htmlFor="items">Items</label>
                        <input
                            className="block text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type='number'
                            id='items'
                            name='items'
                            defaultValue={1}
                            max={10}
                            min={1}
                            placeholder='Number of items'
                            {...register('items')}
                        />
                        {errors.items && <p className="mt-1 text-red-500 text-xs">{errors.items.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2' htmlFor="date">Date of Arrival</label>
                        <input
                            className="block text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            type='date'
                            id='date'
                            name='date'
                            {...register('date', {
                                required: 'Arrival Date is required',
                            })}
                        />
                        {errors.date && <p className="mt-1 text-red-500 text-xs">{errors.date.message}</p>}
                    </div>
                    <button type="submit" className="rounded-xl text-white bg-black py-2">Submit</button>
                </form>
            </div>
        </div>
    </>
  );
};

export default EditModal;
