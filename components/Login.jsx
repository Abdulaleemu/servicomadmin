"use client"
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToken } from './UserToken';

export default function 
Login() {
  const { setToken } = useToken();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.BASEURL}Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push('/dashboard')
      } else {
        toast.error('Login failed. Please check your credentials.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col'>
        <Image src='/img/left.png' fill={true} className='w-full h-full object-cover' alt='Logo'/>
      </div>
      <div className='w-1/2 h-full flex flex-col items-center p-8 '>
        <div className='w-full flex flex-col items-center mt-16'>
            <h3 className='text-2xl font-semibold mb-4'>Login</h3>
           <div className='p-4 mt-4 w-2/3'>
           <div className='w-full flex flex-col'>
                <h4 className='text-xs font-semibold'>Email</h4>
                <input type='email' placeholder='email@gmail.com' value={email} onChange={handleEmailChange}
                 className='border border-black rounded-sm drop-shadow-md text-xs p-2 h-6 text-black
                 '/>
            </div>
            <div className='w-full flex flex-col mt-2'>
                <h4 className='text-xs font-semibold'>Password</h4>
                <input type='password' placeholder='enter your password' value={password} onChange={handlePasswordChange} 
                className='border border-black rounded-sm drop-shadow-md text-xs p-2 h-6 text-black'/>
            </div>
            <p className='text-xs text-right pt-1'>forgot password?</p>
            <button onClick={handleLogin} disabled={loading}
            className='w-full p-1 mt-2 rounded-sm bg-black text-sm text-white'>
                {loading ? 'Logging in...' : 'Login'}
                </button>
            <p className='text-xs mt-2 text-center pt-1'>Don’t have an account? <span className='font-semibold'>Sign up</span></p>
            
           </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}
