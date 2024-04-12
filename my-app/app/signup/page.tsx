'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const res = await axios.post("api/users/signup", user)
            console.log("signup success", res.data);
            router.push('/login')
        } catch (error: any) {
            console.log("signup failed");
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>{loading ? "Processing....." : "Signup"}</h1>
            <hr />
            <label className='p-4' htmlFor='username'>Username</label>
            <input
                className='text-black p-4'
                id='username'
                placeholder='username'
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type='text' />
            <label className='p-4' htmlFor='username'>Email</label>
            <input
                className='text-black p-4'
                id='email'
                placeholder='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type='email' />
            <label className='p-4' htmlFor='username'>Password</label>
            <input
                className='text-black p-4'
                id='password'
                placeholder='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type='password' />
                <button 
  className={`p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? '' : 'cursor-pointer'}`} 
  onClick={onSignup}
>
  {buttonDisabled ? "No Signup" : "Signup"}
</button>

            {/* <button className='p-2 cursor-pointer mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignup}>{buttonDisabled ? "No Signup" : "Signup"}</button> */}
            <Link className='cursor-pointer' href="/login">Visit login page</Link>
        </div>
    )
}

