import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context'
import { nanoid } from 'nanoid'
import { json, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Create = () => {
   const navigate = useNavigate()
   const  [products,setproducts] = useContext(ProductContext)
   const [title,setTitle] = useState("")
   const [image,setImage] = useState("")
   const [category,setCategory] = useState("")
   const [price,setPrice] = useState("")
   const [description,setDescription] = useState("")


   const AddProductHandler = (e)=>{
    e.preventDefault()

   if (title.trim().length < 5 || image.trim().length < 5 || category.trim().length < 5 || price.trim().length < 1 || description.trim().length < 5) {
    alert("Every field must contain 5 or more characters.")
    return;
   }


    const product = {
      id:nanoid(),
      image,
      title,
      category,
      price,
      description
    }
    setproducts([...products,product])
    localStorage.setItem("products", JSON.stringify([...products,product]))
    toast.success("Product added successfully")
    navigate("/")
   }


  return (
    
  <div className='flex flex-col items-center h-screen w-screen p-[5%]'>
    <h1 className='text-3xl mb-5'>Add New Product</h1>
      <form onSubmit={AddProductHandler} className='flex  flex-col gap-3 items-center border border-black p-5 rounded-md w-1/2'>

           <input type="url" className='p-2 border border-zinc-500 text-sm rounded-md w-full outline-none'  placeholder='Image Link' value={image} onChange={(e)=>{setImage(e.target.value)}}/>

           <input type="text" className='p-2 border border-zinc-500 text-sm rounded-md w-full outline-none'  placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
       
           <input type="text" className='p-2 border border-zinc-500 text-sm rounded-md w-full  outline-none'  placeholder='category' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>

           <input type="number" className='p-2 border border-zinc-500 text-sm  rounded-md w-full  outline-none'  placeholder='price' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>

           <textarea rows={7} className='p-2 border border-zinc-500 text-sm  rounded-md w-full  outline-none resize-none'  placeholder='Enter your product description here....' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
           
          <div className='w-full'>
          <button className='px-3 py-2 bg-blue-600 text-white rounded-md border-none '>Add New Product</button>
          </div>
      </form>
  </div>
    
  )
}

export default Create