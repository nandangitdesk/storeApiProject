import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import { toast } from 'react-toastify'
// import { nanoid } from 'nanoid'

const Edit = () => {

    const  [products,setproducts] = useContext(ProductContext)
    const navigate = useNavigate()
    const {id} = useParams()
    const [product,setproduct] = useState({
        title: "",
        image :"",
        category : "",
        price : " ",
        description : "" 
    })
  
    const changeHandler = (e)=>{
        // console.log(e.target.name , e.target.value);
        setproduct({...product ,[e.target.name]: e.target.value })
    }

    useEffect(()=>{
      setproduct(products.filter((p)=> p.id == id)[0])
    },[id])

 
    const AddProductHandler = (e)=>{
     e.preventDefault()
 
    if (product.title.trim().length < 5 || product.image.trim().length < 5 || product.category.trim().length < 5 || product.price.trim().length < 1 || product.description.trim().length < 5) {
     alert("Every field must contain 5 or more characters.")
     return;
    }
   

    const productId = products.findIndex((p)=> p.id == id)
    const copyData = [...products]
    copyData[productId] = {...products[productId], ...product}
  
    //  const product = {
    //    id:nanoid(),
    //    image,
    //    title,
    //    category,
    //    price,
    //    description
    //  }
     setproducts(copyData)
     localStorage.setItem("products", JSON.stringify(copyData))
     toast.success("product id edited")
     navigate(-1)
    }
 

  return (
    <div className='flex flex-col items-center h-screen w-screen p-[5%]'>
       <h1 className='text-3xl mb-5'>Edit Your Product</h1>
      <form onSubmit={AddProductHandler} className='flex  flex-col gap-3 items-center border border-black p-5 rounded-md w-1/2'>

           <input type="url" className='p-2 border border-zinc-500 text-sm rounded-md w-full outline-none'  placeholder='Image Link' value={product && product.image} name='image' onChange={changeHandler}/>

           <input type="text" className='p-2 border border-zinc-500 text-sm rounded-md w-full outline-none'  placeholder='title' value={product && product.title} name='title' onChange={changeHandler}/>
       
           <input type="text" className='p-2 border border-zinc-500 text-sm rounded-md w-full  outline-none'  placeholder='category' value={product && product.category} name='category' onChange={changeHandler}/>

           <input type="number" className='p-2 border border-zinc-500 text-sm  rounded-md w-full  outline-none'  placeholder='price' value={product && product.price} name='price' onChange={changeHandler}/>

           <textarea rows={7} className='p-2 border border-zinc-500 text-sm  rounded-md w-full  outline-none resize-none'  placeholder='Enter your product description here....' value={product && product.description} name='description' onChange={changeHandler}></textarea>
           
          <div className='w-full'>
          <button className='px-3 py-2 bg-blue-600 text-white rounded-md border-none '>Edit Product</button>
          </div>
      </form>
  </div>
  )
}

export default Edit;
