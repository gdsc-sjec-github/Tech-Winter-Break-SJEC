import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // ADD FUNCTIONALITY HERE
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className='w-full h-full bg-background flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full h-full sm:max-h-[500px] mx-auto sm:rounded-2xl bg-white sm:max-w-lg px-4 sm:px-10 py-2'>
            <h1 className='text-xl mt-2 text-center sm:text-xl tracking-wider font-bold'>Welcome to Parcel Monitor!</h1>
            <p className='text-gray-400 text-sm sm:text-md tracking-tight max-w-[350px] font-medium text-center mt-4 px-6'>Jump Right Back in! You Send, We Track, You're Notified - Always in the Loop.</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col flex-shrink-0 px-4 mt-5 min-w-[350px]'>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold' htmlFor="email">Email</label>
                    <input
                        className="block text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        type='email'
                        id='email'
                        placeholder='Email'
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                            value: /^(?:\d{2}[a-z]\d{2}\.[a-z]+|[a-z]+(?:\.[a-z]+)*)@sjec\.ac\.in$/,
                            message: 'Please enter a valid email address',
                            },
                        })}
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold' htmlFor='password'>Password</label>
                    <input 
                        className="block text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        type='password' 
                        id='password' 
                        placeholder='Password'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                            },
                        })}
                    />
                    {errors.password && <p className="mt-1 text-red-500 text-xs">{errors.password.message}</p>}
                </div>
                <button type='submit' className='bg-zinc-950 text-white text-sm px-6 sm:px-12 text-center py-2 tracking-tight rounded-2xl'>Login</button>
                <p className='text-xs lg:text-sm text-center text-gray-400 font-medium mt-4'>Don't have an account? <Link to='/register' className='text-black font-semibold'>Register</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login