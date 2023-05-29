import mongoose from "mongoose";
import Order from "@/models/Order";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const Orders = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Codeswear.com</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order-Id 9777</h1>
            <div className="flex mb-4">
              <a className="flex-grow text-center text-regal-blue border-b-2 border-gray-300 py-2 text-lg px-1">Item Description</a>
              <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Item Quantity</a>
              <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
            </div>
            <p className="leading-relaxed mb-4">Your order has been successfully placed</p>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500"> Wear the code (xl/Black)</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">₹499</span>

            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Wear the code (xl/Black)</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">₹499</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Wear the code (xl/Black)</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">₹499</span>
            </div>
            <div className="flex flex-col">
              <span className="title-font font-medium text-2xl text-gray-900">Subtotal: ₹1158.00</span>
              <div className='my-3'>
                <button className="flex text-white bg-regal-blue border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Track Order</button>
              </div>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://img.freepik.com/free-vector/taking-orders-by-phone-store-contact-center-customers-support-easy-order-fast-delivery-trade-service-call-center-operator-cartoon-character_335657-2564.jpg" />
        </div>
      </div>
    </section>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGOO_URI);
  }

  let orders = await Order.find({});

  return {
    props: { orders: orders },
  };
}

export default Orders
