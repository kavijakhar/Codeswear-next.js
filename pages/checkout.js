import React, { useState } from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = ({ cart, addtocart, removefromcart, subTotal }) => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [pincode, setpincode] = useState('')
  const [address, setaddress] = useState('')
  const [disabled, setdisabled] = useState(true)
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setphone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setaddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setpincode(e.target.value)
    }
    setTimeout(() => {
      if (name.length > 3 && email.length > 3 && address.length > 3 && pincode.length > 3 && phone.length > 3) {
        setdisabled(false)
      }
      else {
        setdisabled(true)
      }
       
    }, 100);
  }

  return (
    <div className='container m-auto'>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='text-xl font-semibold'>1. Delivery Details</h2>
      <div className='mx-auto md:flex my-3'>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className='px-2 w-full'>
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address}  cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className='mx-auto md:flex my-3'>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">phone No</label>
            <input onChange={handleChange} value={phone} type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

          </div>
        </div>
      </div>
      <div className='mx-auto md:flex my-3'>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  readOnly={true} value={state}/>
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">city</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} value={city} />
          </div>
        </div>
      </div>
      <h2 className='text-xl font-semibold'>2. Review Cart items</h2>
      <div className="sideCart mt-3  bg-regal-light-blue py-6 mx-4  px-5">
        {/* <h2 className='font-bold text-center text-pink-600'>Shooping Cart</h2> */}

        <ol className='list-decimal font-semibold '>
          {Object.keys(cart).length == 0 && <div className='pt-4 '>No items in the cart!</div>}
          {Object.keys(cart).map((k) => {

            return <li key={k}>
              <div className="item flex my-5">
                <div className="w-2/3  font-semibold">{cart[k].name} ({cart[k].size}/{cart[k].color})</div>
                <div className="w-1/3  flex items-center justify-center  font-bold text-regal-blue ml-2 "> <AiFillMinusCircle className='text-2xl cursor-pointer' onClick={() => { removefromcart(k, 1, cart[k].size, cart[k].price, cart[k].name, cart[k].variant) }} /><span className='mx-1 bg-white rounded-sm text-regal-blue px-2 text-xl'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addtocart(k, 1, cart[k].size, cart[k].price, cart[k].name, cart[k].variant) }} className='text-2xl  cursor-pointer' /></div>
              </div>
            </li>
          })}
        </ol>
        <span className='font-semibold'>Subtotal : {subTotal}</span>

      </div>
      <Link href={'/pay'}> <button disabled={disabled} className=" disabled:bg-gray-400 text-white bg-regal-blue border-0 py-2 px-4 mt-7 ml-3 focus:outline-none hover:bg-gray-600 rounded text-sm  font-semibold">Pay Now ₹{subTotal} </button></Link>
    </div>
  )
}

export default Checkout

