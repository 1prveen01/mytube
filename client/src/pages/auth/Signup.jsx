import React from 'react'
import { useState } from 'react'
import axiosInstance from '../../utils/axios'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formData, setformData] = useState({
    email: " ",
    username: " ",
    fullName: " ",
    password: " ",
    profile: null,
    coverImage: null,

  })

  const [error, setError] = useState("")
  const [loading, setloading] = useState(false)


  const handleChange = (e)=>{
    const { name , value , files } = e.target;

    if(files){
      setformData((prev) =>({...prev , [name]:files[0]}))
    }else{
      setformData((prev) => ({...prev, [name]:value}))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    setError("")

    const data = new FormData(); //built in constructor
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("fullName", formData.fullName);
    data.append("password", formData.password);
    data.append("avatar", formData.profile);
    data.append("coverImage", formData.coverImage);

    try {
      const res = await axiosInstance.post("/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      alert("Signup successfull")
      console.log(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed")

    } finally {
      setloading(false)
    }


  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center' >

        <div className=''>
          <h1 className='text-white text-2xl '>Sign up</h1>
        </div>
        <div className='w-sm mt-4 '>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-start'>
              <label htmlFor='email' className='text-md text-white mb-1'>Email*</label>
              <input type="email" name="email" id="email" required onChange={handleChange}
                className='w-full border-2 border-gray-100 outline-none rounded-lg p-2.5 focus:border-transparent text-white focus:ring-1 focus:ring-blue-400' />
            </div>

            <div className='flex flex-col mt-3 items-start'>
              <label htmlFor='username' className='text-md text-white mb-1'>Username*</label>
              <input type="text" name="username" id="username" required onChange={handleChange}
                className='w-full border-2 border-gray-100 outline-none rounded-lg p-2.5 focus:border-transparent text-white focus:ring-1 focus:ring-blue-400' />
            </div>

            <div className='flex flex-col mt-3 items-start'>
              <label htmlFor='fullName' className='text-md text-white mb-1'>Full Name*</label>
              <input type="text" name="fullName" id="fullName" required onChange={handleChange}
                className='w-full border-2 border-gray-100 outline-none rounded-lg p-2.5 focus:border-transparent text-white focus:ring-1 focus:ring-blue-400' />
            </div>

            <div className='flex flex-col mt-3 items-start'>
              <label htmlFor='password' className='text-md text-white mb-1'>Password*</label>
              <input type="password" name="password" id="password" required onChange={handleChange}
                className='w-full border-2 border-gray-100 outline-none rounded-lg p-2.5 focus:border-transparent text-white focus:ring-1 focus:ring-blue-400' />
            </div>

            <div className='flex flex-col items-start  '>
              <div className='flex flex-col  mt-4 items-start'>
                <label className='mr-2 mb-1' htmlFor="profile">profile*</label>
                <input required onChange={handleChange}
                 className="block w-full text-sm text-gray-500 
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100" type="file" name="profile" id="profile" />
              </div>
              <div className='flex flex-col items-start mt-4'>
                <label className='mr-2 mb-1' htmlFor="coverImage">cover-image*</label>
                <input required onChange={handleChange} className="block w-full text-sm text-gray-500 
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100" type="file" name="coverImage" id="coverImage" />
              </div>
            </div>

            {error && (
            <div className="mt-2 text-red-500 text-sm">
              {error}
            </div>
          )}

            <div className='mt-4'>
              <button type='submit' disabled ={loading} className='w-full p-2 text-white text-2xl font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                 {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className='flex justify-end mt-1'>
            <p className='block text-sm mr-2'>already have an account?</p>
            <Link  to="/login" className='text-blue-400 text-sm hover:text-md cursor-pointer hover:text-blue-800'>
            Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup