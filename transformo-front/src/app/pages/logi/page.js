'use client'
import { loginSuccess } from '@/app/redux/slice/authSlice';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const nav = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;

        // Store token in Redux
        dispatch(loginSuccess({ user, token }));

        // Store token in localStorage for persistence
        localStorage.setItem('token', token);

        // Set Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        alert('Login successful!');
        nav.push("/pages/uploadfile");
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.log(
        'Login error:',
        error.response?.data?.message || error.message
      );
      alert(
        `Login failed: ${error.response?.data?.message || 'Unexpected error occurred'}`
      );
    }
  };
  return (
    <div>
      <form className="max-w-sm mx-auto pt-[160px]" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        <p className="my-4">Do not have an account <Link href={'/pages/regi'} className="text-blue-500">Register</Link></p>
      </form>

    </div>
  )
}

export default Page;