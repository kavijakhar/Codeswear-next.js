import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({ cart, addtocart, removefromcart, clearcart, subTotal }) => {
    // console.log(cart, addtocart, removefromcart, clearcart, subTotal)

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
        <div className='flex flex-col md:flex-row md:justify-start justify-center md:py-8 py-3 shadow-md sticky top-0 z-10 bg-white'>
            <div className="logo md:ml-5 ml-16 ">
                <Link href={'/'}><Image src="/logo.png" alt="" height={40} width={200} /></Link>
            </div>
            <div className="nav ml-7 mt-2 ">
                <ul className='flex items-center space-x-4 md:text-xl font-medium'>
                    <Link href={'/tshirts'}> <li className='hover:text-pink-600'>Tshirts</li></Link>
                    <Link href={'/hoodies'}> <li className='hover:text-pink-600'>Hoddies</li></Link>
                    <Link href={'/stickers'}> <li className='hover:text-pink-600'>Stickers</li></Link>
                    <Link href={'/mugs'}> <li className='hover:text-pink-600'>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart flex right-0 absolute mx-5 font-medium">
             <Link href={'/login'}><MdAccountCircle className='mx-2 text-2xl md:text-3xl cursor-pointer' /></Link>   
                <AiOutlineShoppingCart onClick={toggleCart} className='mx-2 text-2xl md:text-3xl cursor-pointer' />
            </div>


            <div ref={ref} className={`sideCart mt-3 w-72 h-[100vh] transform overflow-y-scroll   transition-transform ${Object.keys(cart).length != 0 ? ' translate-x-0' : 'translate-x-full'} absolute top-0 right-0 bg-pink-200 py-7 px-5`}>
                <h2 className='font-bold text-center text-pink-600'>Shooping Cart</h2>
                <span onClick={toggleCart} className='absolute top-2 right-2 text-pink-500 cursor-pointer text-2xl'><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold '>
                    {Object.keys(cart).length == 0 && <div className='pt-4 '>No items in the cart!</div>}
                    {Object.keys(cart).map((k) => {

                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className="w-2/3  font-semibold">{cart[k].name} ({cart[k].size }/ {cart[k].variant})</div>
                                <div className="w-1/3  flex items-center justify-center  font-bold text-pink-500 ml-2 "> <AiFillMinusCircle className='text-2xl cursor-pointer' onClick={() => { removefromcart(k, 1, cart[k].size, cart[k].price, cart[k].name, cart[k].variant) }} /><span className='mx-1 bg-white rounded-sm text-pink-500 px-2 text-xl'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addtocart(k, 1, cart[k].size, cart[k].price, cart[k].name, cart[k].variant) }} className='text-2xl  cursor-pointer' /></div>
                            </div>
                        </li>
                    })}


                </ol>
                <div className='font-semibold mt-5'>Subtotal : {subTotal}</div>
                <div className="flex ">

                    <Link href={'/checkout'}> <button className="flex mr-2    mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm  font-semibold"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                    <button onClick={clearcart} className="flex  mr-2  mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm  font-semibold">Clear Cart</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar
