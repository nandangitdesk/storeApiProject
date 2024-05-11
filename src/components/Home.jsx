import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import axios from '../utils/axios'

const Home = () => {
   const [products] = useContext(ProductContext)

   const {search} = useLocation()
   const category = decodeURIComponent(search.split("=")[1])


   const  [filteredProducts, setfilteredProducts] = useState(null)

const getproductsCategory = async ()=>{
  try {
    const {data} = await axios.get(`/products/category/${category}`)
    setfilteredProducts(data)
  } catch (error) {
    console.log(error);
  }
}

//agar category me kuch aya hai to get gunc call kardo
 useEffect(()=>{
  if(!filteredProducts || category==="undefined"){
    setfilteredProducts(products)
  }
  if (category != "undefined") {
    // getproductsCategory()
    setfilteredProducts(products.filter((p)=> p.category == category))
  }
 },[category,products])


   

  return products ? (
    <>
    <Nav/>
    <div className='min-h-full overflow-x-hidden overflow-y-auto w-[85%]  py-[5%] px-10 flex flex-wrap'>

       {filteredProducts && filteredProducts.map((product,index)=>(
        
        <Link key={product.id} to={`/details/${product.id}`} className="card w-52 h-60 border shadow  bg-white rounded-md flex items-center justify-center flex-col p-5 mt-3 mr-3">
        <div  className="image-div w-24 h-32 hover:scale-110 transition-all mb-8">
          <img className=' h-full w-full object-contain ' src={product.image} alt="" />
        </div>
        <h1 className=' text-center text-xs hover:text-blue-700'>{product.title}</h1>
      </Link>
       ))}


    </div>
    </>
  ): (
    <Loading/>
  )
}

export default Home