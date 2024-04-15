import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import remove_icon from '../../Assets/cross_icon.png'

const Listproduct = () => {
  const [allproducts, setAllproducts]=useState([])

  const fetchInfo = async() => {
    await fetch("https://dkshop-ecommerceapi.onrender.com/allproduct").then(e => e.json()).then(e => setAllproducts(e))
  }
  useEffect(() => {
    fetchInfo()
  },[])

  const removeProduct = async (e) => {
    console.log("id"+e);
    await fetch('https://dkshop-ecommerceapi.onrender.com/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:e})
    })
    await fetchInfo()
  }
  return (
    <div className='lp'>
      <h1>All Product List</h1>
      <div className='lp-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='lp-allproducts'>
        <hr/>
        {allproducts.map((product,index) => {
          return <>
          <div key={index} className='lp-format-main lp-format'>
            <img src={product.image} className='lp-product-icon'/>
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img src={remove_icon} onClick={() => removeProduct(product.id)} className='lp-remove-icon' />
          </div>
          <hr/>
          </>            
        })}
      </div>
    </div>
  )
}

export default Listproduct