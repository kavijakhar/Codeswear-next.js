import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {
    return (
        <div className='flex justify-center bg-gradient-to-b from-white to-pink-300  md:h-20 md:flex-row items-center md:justify-start flex-col shadow-xl'>
            <div className="logo mx-5 my-2">
               <Link href={'/'}><Image src="/logo.png" alt=""  height={40} width={200}/></Link> 
            </div>
            <div className="nav ">
                <ul className='flex items-center space-x-4 md:text-xl font-medium'>
                    <Link href={'/tshirts'}> <li>Tshirts</li></Link>
                    <Link href={'/hoodies'}> <li>Hoddies</li></Link>
                    <Link href={'/stickers'}> <li>Stickers</li></Link>
                    <Link href={'/mugs'}> <li>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart right-0 absolute mx-5 font-medium">
                <AiOutlineShoppingCart className='text-2xl md:text-3xl'/>
            </div>
        </div>
    )
}

export default Navbar
