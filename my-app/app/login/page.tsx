'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        password: "",
        email: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const res = await axios.post("api/users/login", user)
            console.log("login success", res.data);
            router.push('/profile')
        } catch (error: any) {
            console.log("login failed");
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label className='p-4' htmlFor='username'>Email</label>
            <input
                className='text-black p-4'
                id='email'
                placeholder='email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type='email' />
            <label className='p-4' htmlFor='password'>Password</label>
            <input
                className='text-black p-4'
                id='password'
                placeholder='password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type='password' />
            <button className='p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                onClick={onLogin}>{buttonDisabled ? "No login" : "Login"}</button>
            <Link className='cursor-pointer' href="/signup">Visit Signup page</Link>
        </div>
    )
}

