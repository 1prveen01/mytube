import React from 'react'
import { useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Link } from 'react-router-dom'

const Login = () => {

    const [formData, setformData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState(" ")
    const [loading, setloading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        setError("")

        const data = new FormData();
        data.append("email", formData.email);
        data.append("password", formData.password);

        try {
            const res = await axiosInstance.post("/users/login", data, {
                headers: {
                    " Content-Type": "application/json",
                }
            })
            alert("Login successfull")
            console.log(res.data);

        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
        } finally {
            setloading(false);
        }
    }
    return (
        <div className='min-h-screen flex flex-col items-center justify-center ' >

            <div className=''>
                <h1 className='text-white text-7xl '>Login</h1>
            </div>
            <div className='w-lg mt-8'>
                <form action="">
                    <div className='flex flex-col mt-3 items-start'>
                        <label htmlFor='fullName' className='text-md text-white mb-1'>Email*</label>
                        <input type="text" name="fullName" id="fullName" required onChange={handleChange}
                            className='w-full border-2 border-gray-100 outline-none rounded-lg p-2.5 focus:border-transparent text-white focus:ring-1 focus:ring-blue-400' />
                    </div>

                    <div className='flex flex-col mt-3 items-start'>
                        <label htmlFor='fullName' className='text-md text-white mb-1'>Password*</label>
                        <input type="text" name="fullName" id="fullName" required onChange={handleChange}
                            className='w-full border-2 border-gray-100 outline-none rounded-lg p-2.5 focus:border-transparent text-white focus:ring-1 focus:ring-blue-400' />
                    </div>

                    {error && (
                        <div className="mt-2 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className='mt-4'>
                        <button type='submit' disabled={loading} className='w-full p-2 text-white text-2xl font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                            {loading ? 'Logging in...' : 'Logging in'}
                        </button>
                    </div>
                </form>
                <div className='flex justify-end items-center mt-4'>
                    <p className='block mx-2'>dont have an account?</p>
                    <Link to="/signup" className='text-blue-400 cursor-pointer hover:text-lg hover:text-blue-800'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login