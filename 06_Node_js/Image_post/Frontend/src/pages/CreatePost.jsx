import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CreatePost = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(e.target);
        axios.post('http://localhost:3000/create-post', formData)
            .then(response => {
                // console.log(response);
                navigate('/feed');
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });

    }

  return (
    <section className='flex flex-col justify-center items-center gap-8 h-screen bg-gray-800'>
        <h1 className='text-6xl text-center text-amber-50'>Create Post</h1>
        <form 
  className="max-w-md mx-auto p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl flex flex-col gap-5"
  onSubmit={handleSubmit}
>
  <h2 className="text-2xl font-semibold text-amber-50 text-center">
    Upload Image
  </h2>

  {/* File Upload */}
  <label className="flex flex-col gap-2">
    <span className="text-sm text-gray-300">Select Image</span>
    <input
      className="bg-gray-800 text-amber-50 border border-gray-600 rounded-lg px-3 py-2 
                 file:mr-4 file:py-2 file:px-4 
                 file:rounded-lg file:border-0 
                 file:text-sm file:font-semibold 
                 file:bg-blue-600 file:text-white 
                 hover:file:bg-blue-700
                 active:file:scale-[0.98]
                 transition-all duration-200 cursor-pointer"
      type="file"
      name="image"
      accept="image/*"
      required
    />
  </label>

  {/* Caption */}
  <label className="flex flex-col gap-2">
    <span className="text-sm text-gray-300">Caption</span>
    <input
      className="bg-gray-800 text-amber-50 border border-gray-600 rounded-lg px-3 py-2 
                 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                 transition-all duration-200"
      type="text"
      name="caption"
      placeholder="Write something nice..."
      required
    />
  </label>

  {/* Submit */}
  <button
    className="mt-2 bg-gradient-to-r from-blue-500 to-blue-700 
               text-white font-medium py-2.5 rounded-xl
               hover:from-blue-600 hover:to-blue-800
               active:scale-[0.98]
               transition-all duration-200 shadow-lg"
    type="submit"
  >
    Submit
  </button>
</form>

    </section>
  )
}

export default CreatePost
