import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import TopMain from './Topmain';

const Navbar = ({ Logout, user, cart, addtocart, removefromcart, clearcart, subTotal }) => {
    // console.log(cart, addtocart, removefromcart, clearcart, subTotal)
    const [dropdown, setdropdown] = useState(false)

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')

        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }


    }
    const ref = useRef()

    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center md:py-4 py-3 shadow-md sticky top-0 z-10 bg-white'>
            <div className="logo mx-5 ">
                <Link href={'/'}><Image src="/logo.png" alt="" height={50} width={200} /></Link>
            </div>
            <div className="nav ml-7 mt-3 ">
                <ul className='flex items-center space-x-4 md:text-xl font-medium'>
                    <Link href={'/tshirts'}> <li className='hover:text-gray-600'>Tshirts</li></Link>
                    <Link href={'/hoodies'}> <li className='hover:text-gray-600'>Hoddies</li></Link>
                    <Link href={'/stickers'}> <li className='hover:text-gray-600'>Stickers</li></Link>
                    <Link href={'/mugs'}> <li className='hover:text-gray-600'>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart flex md:top-7 top-4 items-center absolute mx-3  right-0 font-medium">
                <span onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => setdropdown(false)}>
                    {dropdown && <div onMouseOver={() => { setdropdown(true) }} onMouseLeave={() => { setdropdown(false) }} className="absolute right-1 bg-regal-light-blue shadow-xl top-8 rounded-lg px-1 w-36">
                        <ul>
                            <li className='py-1 hover:text-gray-500 text-white cursor-pointer'><Link href={'/account'}>  My Accoun</Link>t</li>
                            <li className='py-1 hover:text-gray-500 text-white cursor-pointer'><Link href={'/orders'}> Orders</Link></li>
                            <li onClick={Logout} className='py-1 hover:text-gray-500 text-white cursor-pointer'>Logout</li>
                        </ul>
                    </div>}
                    {user.value && <MdAccountCircle className='mx-2 text-2xl md:text-3xl cursor-pointer' />}
                </span>
                <AiOutlineShoppingCart onClick={toggleCart} className='mx-2 text-2xl md:text-3xl cursor-pointer' />
                {!user.value && <Link href={'/login'}>
                    <button className=' bg-regal-blue text-white  mx-2  pl-1 pr-1 rounded-md space-x-1 py-1 '>Login</button>
                </Link>}
            </div>


            <div ref={ref} className={`sideCart mt-3 w-72 h-[100vh] transform overflow-y-scroll rounded-md   transition-transform ${Object.keys(cart).length != 0 ? ' translate-x-0' : 'translate-x-full'} absolute top-0 right-0 bg-regal-light-blue py-7 px-5`}>
                <h2 className='font-bold text-center text-regal-blue'>Shooping Cart</h2>
                <span onClick={toggleCart} className='absolute top-2 right-2 text-regal-blue cursor-pointer text-2xl'><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold '>
                    {Object.keys(cart).length == 0 && <div className='pt-4 '>No items in the cart!</div>}
                    {Object.keys(cart).map((k) => {

                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className="w-2/3  font-semibold">{cart[k].name} ({cart[k].size}/ {cart[k].variant})</div>
                                <div className="w-1/3  flex items-center justify-center  font-bold text-regal-blue ml-2 "> <AiFillMinusCircle className='text-2xl cursor-pointer' onClick={() => { removefromcart(k, 1, cart[k].size, cart[k].price, cart[k].name, cart[k].variant) }} /><span className='mx-1 bg-white rounded-sm text-regal-blue px-2 text-xl'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addtocart(k, 1, cart[k].size, cart[k].price, cart[k].name, cart[k].variant) }} className='text-2xl  cursor-pointer' /></div>
                            </div>
                        </li>
                    })}


                </ol>
                <div className='font-semibold mt-5'>Subtotal : {subTotal}</div>
                <div className="flex ">

                    <Link href={'/checkout'}> <button className="flex mr-2    mt-5 text-white bg-regal-blue border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-sm  font-semibold"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                    <button onClick={clearcart} className="flex  mr-2  mt-5 text-white bg-regal-blue border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-sm  font-semibold">Clear Cart</button>
                </div>
            </div>

   
        </div >
        
    )
}

export default Navbar
