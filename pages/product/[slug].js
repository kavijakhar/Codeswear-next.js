/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import mongoose from "mongoose";
import Product from "@/models/Product";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ buyNow, addtocart, product, variants }) => {
  // console.log(variants)
  // console.log(product)


  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()


  const CheckServiceability = async () => {

    let pins = await fetch(`${process.env.NEXT_PUBLIC_Host}/api/pincode`)
    let pinJson = await pins.json()
    // console.log(service, pin, pinJson)
    if (pinJson.includes(parseInt(pin))) {
      setService(true)
      toast.success('🦄 Wow  Pincode is serviceable', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.error('😐 Sorry Pincode is not serviceable ', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setService(false)
    }
  }
  const ChangePin = (e) => {
    setPin(e.target.value)
  }

  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)

  const refreceveriants = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_Host}/product/${variants[newcolor][newsize]['slug']}`
    window.location = url
  }



  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer />
      <div className="container px-5 py-14 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Codeswear</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size} /{product.color})</h1>

            <p className="leading-relaxed mt-3">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>

                {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => { refreceveriants(size, 'yellow') }} className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6  focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreceveriants(size, 'white') }} className={`border-2 ml-1 rounded-full bg-white w-6 h-6  focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreceveriants(size, 'red') }} className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6  focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreceveriants(size, 'green') }} className={`border-2  ml-1 bg-green-900 rounded-full w-6 h-6  focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreceveriants(size, 'blue') }} className={`border-2  ml-1 bg-blue-900 rounded-full w-6 h-6  focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreceveriants(size, 'purple') }} className={`border-2  ml-1 bg-purple-900 rounded-full w-6 h-6  focus:outline-none ${color === 'purple' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreceveriants(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-regal-blue text-base pl-3 pr-10">
                    {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                    {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                    {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                    {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                    {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹ {product.price}</span>
              <button onClick={() => { addtocart(slug, 1, size, product.price, product.title, color) }} className="flex ml-6 md:ml-20 text-white bg-regal-blue border-0 py-2 px-4 focus:outline-none hover:bg-gray-600 rounded">Add to Cart</button>
              <button onClick={() => { buyNow(slug, 1, size, product.price, product.title, color) }} className="flex ml-2 md:ml-2 text-white bg-regal-blue border-0 py-2 px-4 focus:outline-none hover:bg-gray-600 rounded">Buy Now</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="pin mt-6 flex space-x-2 text-sm">
              <input placeholder='Enter your Pincode' onChange={ChangePin} className='px2 border-gray-500 border-2 rounded-sm' type="text" />
              <button onClick={CheckServiceability} className='flex ml-auto text-white bg-regal-blue border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded'>Check</button>
            </div>
            {!service && service != null && <div className="text-red-700">
              Sorry, We do not to this pincode
            </div>
            }
            {service && service != null &&
              <div className="text-green-700">
                Yes , this pincode is serviceable

              </div>
            }
          </div>
        </div>
      </div>
    </section>
  </>
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGOO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title, category: product.category })
  let colorsizeslug = {}
  for (let item of variants) {
    if (Object.keys(colorsizeslug).includes(item.color)) {
      colorsizeslug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorsizeslug[item.color] = {}
      colorsizeslug[item.color][item.size] = { slug: item.slug }

    }
  }
  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorsizeslug)) },
  };
}


export default Slug  