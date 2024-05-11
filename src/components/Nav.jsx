import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../utils/Context'
import { Link, useLocation } from 'react-router-dom'
import axios from '../utils/axios'

const Nav = () => {

 const [products] = useContext(ProductContext)
 


 let distinctCategory = products && products.reduce((acc,currval)=>[...acc,currval.category],[])
 distinctCategory = [...new Set(distinctCategory)] //duplicate ko remove karne ko
//  console.log(distinctCategory);

 
  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };
  

  return (
    <nav className='w-[15%] h-full flex flex-col items-center pt-5 bg-zinc-100'>
    <a className='px-5 py-3 bg-blue-200 text-blue-600 rounded-md border-none ' href="/create">Add New Product</a>
    <hr className='w-[80%] border-zinc-400 mt-3' />
    <h1 className='mt-3 text-xl text-zinc-900 w-[80%]'>Category Filter</h1>
    <div className='mt-3 w-[80%] text-white'>
        {distinctCategory.map((catg,index)=>(
                <Link  key={index} to={`/?category=${catg}`} className='flex items-center mb-3 text-zinc-800 hover:text-zinc-600 '><span style={{backgroundColor: color() }} className='h-[15px] w-[15px]  rounded-full inline-block mr-2'></span >{catg}</Link>
        ))}
    </div>
  </nav>
  )
} 

export default Nav