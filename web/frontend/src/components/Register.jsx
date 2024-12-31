import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useFetch } from './useFetch';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { createData, loading, error } = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Send the registration request
    await createData('/api/register', { 
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
    });

    // Check if registration was successful
    if (!error) {
      await loginUser(data);
      navigate('/dashboard');
    }else {
        alert(error);
    }
  }

  const loginUser = async (data) => {
    // Login the user immediately after registration
    await createData('/api/login', { 
        email: data.email, 
        password: data.password 
    });
  };

  return (
    <div className='w-full h-full flex bg-background justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full h-full sm:max-h-[600px] mx-auto sm:rounded-2xl bg-white sm:max-w-xl px-4 sm:px-10 py-8 sm:my-8'>
            <h1 className='text-xl mt-2 text-center sm:text-xl tracking-wider font-bold'>Welcome to Parcel Monitor!</h1>
            <p className='text-gray-400 text-sm sm:text-md tracking-tight max-w-[350px] font-medium text-center mt-4 px-6'>Register your first account today.You Send, We Track, You're Notified - Always in the Loop.</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col flex-shrink-0 px-4 mt-5 min-w-[350px]'>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold' htmlFor="username">Username</label>
                    <input 
                        className="block text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        type='text' 
                        id='username' 
                        placeholder='Username'
                        {...register('username', {
                            required: 'Username is required',
                            minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters long',
                            },
                        })}
                    />
                    {errors.username && <p className="mt-1 text-red-500 text-xs">{errors.username.message}</p>}
                </div>
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
                <div className='mb-6'>
                    <p className='w-full text-sm font-semibold mb-2'>Select the type of account</p>
                    <div className='flex flex-wrap sm:flex-nowrap justify-center items-center gap-2'>
                        <label htmlFor="admin" className="cursor-pointer py-2 px-2 sm:w-1/2 w-full h-full border border-indigo-700 text-indigo-700 bg-indigo-200 rounded-lg hover:bg-indigo-400 text-xs font-bold text-center">
                            <input
                            id="admin"
                            name="role" 
                            className="mr-1 mt-1"
                            type="radio"
                            value="admin" 
                            {...register('role')} 
                            />
                            Admin Account
                        </label>

                        <label htmlFor="user" className="pr-5 pl-2 cursor-pointer py-2 sm:px-2 sm:w-1/2 w-full h-full border border-indigo-700 text-indigo-700 bg-indigo-200 rounded-lg hover:bg-indigo-400 text-xs font-bold text-center">
                            <input
                            id="user"
                            name="role" 
                            className="mr-1 mt-1"
                            type="radio"
                            value="user" 
                            {...register('role')} 
                            />
                            User Account
                        </label>
                    </div>
                </div>
                <button type='submit' className='bg-zinc-950 text-white text-sm px-6 sm:px-12 text-center py-2 tracking-tight rounded-2xl'>Register</button>
                <p className='text-xs lg:text-sm text-center text-gray-400 font-medium mt-4'>Already have an account? <Link to='/login' className='text-black font-semibold'>Log In</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Register