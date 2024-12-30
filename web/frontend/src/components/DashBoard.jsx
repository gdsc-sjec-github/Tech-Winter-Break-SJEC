import React, { useState } from 'react'
import { Edit, Trash } from 'lucide-react'
import EditModal from './EditModal'
import { useModal } from './ModelContext' 

const DashBoard = () => {
   const [selectedTab, setSelectedTab] = useState('accepted');
   const { isModalOpen, openModal, modalType } = useModal();

   // FOR DEMO PURPOSES ONLY, A USE EFFECT FUNCTION SHOULD REPLACE THIS
   const products = {
    pending: [
      { id: 1, name: 'Product 1 (Pending)' },
      { id: 2, name: 'Product 2 (Pending)' },
    ],
    rejected: [
      { id: 1, name: 'Product 3 (Rejected)' },
      { id: 2, name: 'Product 4 (Rejected)' },
    ],
    accepted: [
      { id: 1, name: 'Product 5 (Accepted)' },
      { id: 2, name: 'Product 6 (Accepted)' },
    ],
    };

    const handleButtonClick = (tab) => {
        setSelectedTab(tab);
    };


  return (
    <div className={`flex-1 ml-20 pl-4 md:ml-2 md:pl-2 transition-all duration-300 ease-in-out`}>
        <div>
          <h1 className="mt-10 text-xl font-semibold sm:text-3xl sm:font-bold pl-8">Delivery Log</h1>
          <p className="mt-1 text-gray-500 text-xs sm:text-sm pl-8">Home {'>'} Delivery Log</p>
          <div className='mt-5 pl-8'>
            <div className="mr-4 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Admin Details</h2>
                <p className="mt-2">Name: Admin User</p>
                <p>Email: admin@example.com</p>
                <p>Role: Admin</p>
            </div>
          </div>
        </div>

        <div className='mt-8'>
            <h1 className="mt-10 text-xl font-semibold sm:text-3xl sm:font-bold pl-8">Delivery Lineup</h1>
            <p className="mt-1 text-gray-500 text-xs sm:text-sm pl-8">Home {'>'} Delivery Lineup</p>
            <div className='flex justify-start items-end gap-4 pt-2 mx-8 mt-4 border-b border-gray-300'>
                <button className={`p-2 hover:border-b hover:text-green-500 hover:border-green-400 hover:bg-green-200 ${selectedTab === 'accepted' ? 'border-green-400 bg-green-200 text-green-500 border-b' : ''}`}  onClick={() => handleButtonClick('accepted')}>Accepted</button>
                <button className={`p-2 hover:border-b hover:text-orange-500 hover:border-orange-400 hover:bg-orange-200 ${selectedTab === 'pending' ? 'border-orange-400 bg-orange-200 text-orange-500 border-b' : ''}`}  onClick={() => handleButtonClick('pending')}>Pending</button>
                <button className={`p-2 hover:border-b hover:text-red-500 hover:border-red-400 hover:bg-red-200 ${selectedTab === 'rejected' ? 'border-red-400 bg-red-200 text-red-500 border-b' : ''}`}  onClick={() => handleButtonClick('rejected')}>Rejected</button>
            </div>
            <div className='max-4xl mx-8 mt-5'>
                <ul className='flex flex-col flex-shrink-0 gap-4 justify-start items-center w-full'>
                {products[selectedTab].map((product) => (
                    <li key={product.id} className="flex justify-between items-center gap-4 text-xs py-2 px-4 rounded-xl shadow-sm shadow-zinc-300 bg-gray-100 w-full">
                        <div>HHSGSAJAYTTHAHAWD</div>
                        <div>{ product.name }</div>
                        <div>19 Feb 2024</div>
                        <div className='hidden md:flex min-w-[150px] gap-2'>
                            <button className='w-1/2 p-2 text-md border border-indigo-800 bg-indigo-400 rounded-xl' onClick={() => openModal('edit')}>Edit</button>
                            <button className='w-1/2 p-2 text-md border border-red-800 bg-red-400 rounded-xl'>Delete</button>
                        </div>
                        <div className='flex md:hidden gap-2'>
                            <button className='w-1/2 p-1 font-light text-xs border text-indigo-800 border-indigo-800 bg-indigo-400 rounded-xl' onClick={() => openModal('edit')}><Edit /></button>
                            <button className='w-1/2 p-1 font-light text-xs border text-red-800 border-red-800 bg-red-400 rounded-xl'><Trash /></button>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
            {isModalOpen && modalType === 'edit' && <EditModal />}
        </div>
    </div>
  )
}

export default DashBoard