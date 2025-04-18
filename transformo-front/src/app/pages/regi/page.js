'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { registerSuccess } from '../../redux/slice/authSlice';
import { useRouter } from 'next/navigation';
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const router=useRouter();
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${API_BASE}/user/registeruser`, {
                username,
                email,
                password,
            });

            if (response.status === 200) {
                dispatch(registerSuccess({ user: response.data.user, token: response.data.token }));
                alert('Registration successful!');
                router.push('/pages/logi');
            } else {
                alert('Registration failed: ' + response.data.message);
            }
        } catch (error) {
            alert('An error occurred: ' + (error.response?.data?.message || error.message));
        }
    };
    return (
        <div>
            <form className="max-w-sm mx-auto pt-[60px]" onSubmit={handleSubmit}>
                <div className="mb-5 pt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" id="confirm-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required name="confirmPassword"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                <p className="my-4">Already registered? <Link href={'/pages/login'} className="text-blue-500">Login</Link></p>
            </form>
        </div>
    );
}

export default Register;