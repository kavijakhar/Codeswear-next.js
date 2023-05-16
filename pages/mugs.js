import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/models/Product";

const Mugs = ({ products }) => {
  console.log(products)

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>soory not available now</p>}
            {Object.keys(products).map((item) => {
              console.log(products[item].price)
              // console.log(products[item].color)
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/4 md:w-60 m-auto p-4 w-full shadow-lg mx-5 cursor-pointer my-3"
                >
                  <Link
                    href={`/product/${products[item].slug}`}
                    className="block relative h-48 rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="  h-[30vh] block m-auto"
                      src={products[item].img}
                    />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      T-shirts
                    </h3>
                    products.
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹ {products[item].price}</p>
                    <div className="space-x-1 mt-1">
                      {products[item].size.includes("S") && (
                        <span className=" border-solid border-2 border-slate-300 mx-1 px-1">
                          S
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className=" border-solid border-2 border-slate-300 mx-1 px-1">
                          M
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className=" border-solid border-2 border-slate-300 mx-1 px-1">
                          L
                        </span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className=" border-solid border-2 border-slate-300 mx-1 px-1">
                          XL
                        </span>
                      )}
                      {products[item].size.includes("XXL") && (
                        <span className=" border-solid border-2 border-slate-300 mx-1 px-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="space-x-2 mt-1">
                      {products[item].color.includes("red") && (
                        <button className="border-2 border-gray-300  bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("white") && (
                        <button className="border-2 border-gray-300  bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("purple") && (
                        <button className="border-2 border-gray-300  bg-purple-900  rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("green") && (
                        <button className="border-2 border-gray-300  bg-green-900 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("blue") && (
                        <button className="border-2 border-gray-300  bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("yellow") && (
                        <button className="border-2 border-gray-300  bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGOO_URI);
  }

  let products = await Product.find({ category: 'mugs' });
  let mugs = {}
  for (let item of products) {
    if (item.title in mugs) {
      if (!mugs[item.title].color.includes(item.color) && item.availableQty > 0) {
        mugs[item.title].color.push(item.color)
      }
      if (!mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
        mugs[item.title].size.push(item.size)
      }
    }
    else {
      mugs[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        mugs[item.title].size = [item.size]
        mugs[item.title].color = [item.color]

      }
    }


  }
  // console.log(mugs)
  return {
    props: { products: JSON.parse(JSON.stringify(mugs)) }, // will be passed to the page component as props
  };
}

export default Mugs;