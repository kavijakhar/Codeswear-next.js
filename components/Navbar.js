import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle , AiFillPlusCircle , AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Navbar = () => {

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
        <div className='flex justify-center bg-gradient-to-b from-white to-pink-300  md:h-20 md:flex-row items-center md:justify-start flex-col shadow-xl'>
            <div className="logo mx-5 my-2">
                <Link href={'/'}><Image src="/logo.png" alt="" height={40} width={200} /></Link>
            </div>
            <div className="nav ">
                <ul className='flex items-center space-x-4 md:text-xl mb-2 font-medium'>
                    <Link href={'/tshirts'}> <li>Tshirts</li></Link>
                    <Link href={'/hoodies'}> <li>Hoddies</li></Link>
                    <Link href={'/stickers'}> <li>Stickers</li></Link>
                    <Link href={'/mugs'}> <li>Mugs</li></Link>
                </ul>
            </div>
            <div onClick={toggleCart} className="cart right-0 absolute mx-5 font-medium">
                <AiOutlineShoppingCart className='text-2xl md:text-3xl cursor-pointer' />
            </div>


            <div ref={ref} className="sideCart transition-transform mt-3 w-72 h-full transform translate-x-full absolute top-0 right-0 bg-pink-200 py-7 px-5">
                <h2 className='font-bold text-center text-pink-600'>Shooping Cart</h2>
                <span onClick={toggleCart} className='absolute top-2 right-2 text-pink-500 cursor-pointer text-2xl'><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold '>
                    <li >
                        <div className="item flex my-5">
                            <div className="w-2/3  font-semibold">T-shirt wear the code do enjoy</div>
                           <div className="w-1/3  flex items-center justify-center  font-bold text-pink-500 ml-2 "> <AiFillMinusCircle className='text-2xl cursor-pointer'/><span className='mx-1 bg-white rounded-sm text-pink-500 px-2 text-xl'>1</span><AiFillPlusCircle className='text-2xl  cursor-pointer' /></div>
                        </div>
                    </li> 
                    <li >
                        <div className="item flex my-5">
                            <div className="w-2/3  font-semibold">T-shirt wear the code do enjoy</div>
                           <div className="w-1/3  flex items-center justify-center  font-bold text-pink-500 ml-2"> <AiFillMinusCircle className='text-2xl cursor-pointer'/><span className='mx-1 bg-white rounded-sm text-pink-500 px-2 text-xl'>1</span><AiFillPlusCircle className='text-2xl  cursor-pointer' /></div>
                        </div>
                    </li> 
                    <li >
                        <div className="item flex my-5">
                            <div className="w-2/3  font-semibold">T-shirt wear the code do enjoy</div>
                           <div className="w-1/3  flex items-center justify-center  font-bold text-pink-500 ml-2"> <AiFillMinusCircle className='text-2xl cursor-pointer'/><span className='mx-1 bg-white rounded-sm text-pink-500 px-2 text-xl'>1</span><AiFillPlusCircle className='text-2xl  cursor-pointer' /></div>
                        </div>
                    </li> 
                   
                </ol>
                <div className="flex ">

                <button class="flex mr-2    mt-8 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm  font-semibold"><BsFillBagCheckFill className='m-1'/>Checkout</button>
                <button class="flex  mr-2  mt-8 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm  font-semibold">Clear Cart</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar
