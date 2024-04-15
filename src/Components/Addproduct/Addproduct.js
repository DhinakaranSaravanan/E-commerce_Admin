import React, { useState } from 'react'
import './Addproduct.css'
import upload_icon from '../../Assets/upload_area.svg'
 
const Addproduct = () => {
const[image, setImage]=useState(false);
const[productDetails, setProductDetails] = useState({
   name:"",
   image:"",
   category:"",
   new_price:"",
   old_price:"",   
})

const imageHandler = (e) => {
   setImage(e.target.files[0])
}
const changeHandler=(e) => {
   setProductDetails({...productDetails,[e.target.name]:e.target.value})
}
const Add_Product = async () => {
   // console.log(productDetails);
   let responeImageURL;
   let product = productDetails
   let formData = new FormData();
   formData.append('product', image)

   await fetch('https://dkshop-ecommerceapi.onrender.com/upload',{
      method:'POST',
      headers:{
         Accept:'application/json'
      },
      body:formData,
   }).then((res) => res.json()).then((data) => {responeImageURL=data})
   if(responeImageURL.success){
      product.image=responeImageURL.image_url;  
      // const jdata = JSON.stringify(productDetails)    
      // console.log(jdata);
      await fetch('https://dkshop-ecommerceapi.onrender.com/addproduct',{
         method:'POST',
         headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
         },
         body:JSON.stringify(productDetails),
      }).then((res) => res.json()).then((data) => {
         data.success?alert("Product Added"):alert("Failed to add the product")
      })
      // console.log(product);
   }
}

  return (
    <div className='ap'>
      <div className='ap-itemfield'>
         <p>Product Title</p>
         <input          
            type='text'
            name='name'
            placeholder='Type here...'
            value={productDetails.name}
            onChange={changeHandler}
         />
      </div>
      <div className='ap-price'>
         <div className='ap-itemfield'>
            <p>Price</p>
            <input 
               type='text'
               name='old_price'
               placeholder='Enter old_price'
               value={productDetails.old_price}
            onChange={changeHandler}
            />
         </div>
         <div className='ap-itemfield'>
            <p>Offer Price</p>
            <input 
               type='text'
               name='new_price'
               placeholder='Enter new_price'
               value={productDetails.new_price}
            onChange={changeHandler}
            />
         </div>
      </div>
      <div className='ap-itemfield'>
         <p>Product Category</p>
         <select name='category' value={productDetails.category}
            onChange={changeHandler} className='ap-selector'>
            <option></option>
            <option selected value='women' >Women</option>
            <option value='men' >Men</option>
            <option value='kid'>Kid</option>
         </select>
      </div>
      <div className='ap-itemfield'>
         <label htmlFor='file-input'>
            <img src={image?URL.createObjectURL(image):upload_icon } className='ap-thumnail-img'/>
         </label>
         <input 
            onChange={imageHandler}
            type='file'
            name='image'
            id='file-input'
            hidden
         />
      </div>
      <button onClick={() => Add_Product()} className='ad-btn'>ADD</button>
    </div>
  )
}

export default Addproduct