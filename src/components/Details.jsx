import axios from '../utils/axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import { ProductContext } from '../utils/Context'
import { toast } from 'react-toastify'

const Details = () => {
  const navigate = useNavigate()
  const  [products,setproducts] = useContext(ProductContext)
 //saving data
  const [product,setproduct] = useState(null)
  const { id }= useParams()
 

  // const getSingleProduct = async ()=>{
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setproduct(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(()=>{

  if(!product){
    setproduct(products.filter((p)=> p.id == id)[0])
  }

  //  getSingleProduct()
  },[])


  const productDeleteHandler = (id)=>{
    const filteredProducts = products.filter((p)=> p.id !== id)
    setproducts(filteredProducts)
    localStorage.setItem("products",JSON.stringify(filteredProducts))
    toast.success("successfully deleted");
    navigate("/")
  }


  return product ? (
    <div className='h-full w-[80%] px-[10%] flex items-center justify-center  m-auto gap-10'>
        <div className="img-div w-[36rem] h-[40rem]">
            <img className='h-full w-full object-contain'  src={product.image} alt="" />
        </div>
        <div className="content p-5 ">
        <h1 className='text-4xl font-semibold'>{product.title}</h1>
        <h4 className='mt-2 px-3 py-1 text-xs bg-yellow-200 text-yellow-600 rounded-full w-fit'>{product.category}</h4>
        <h3 className='mt-6 text-red-400'>${product.price}</h3>
        <p className='text-zinc-600 mt-2 mb-7 text-sm'>{product.description}</p>
        <Link to={`/edit/${product.id}`} className='px-3 py-2 bg-green-300 rounded-md mr-3 text-green-800 '>Edit</Link>
        <button onClick={()=>productDeleteHandler(product.id)} className='px-3 py-2 rounded-md bg-red-300 text-red-800'>Delete</button>
        </div>
    </div>
  ):(
    <Loading/>
  )
}

export default Details