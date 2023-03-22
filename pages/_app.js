import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setsubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        savecart(setCart(JSON.parse(localStorage.getItem("cart"))));

      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }

  }, []);

  const savecart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
    let subt = 0;
    let keys = Object.keys(mycart);

    for (let i = 0; i < keys.length; i++) {
      subt += mycart[keys[i]]["price"] * mycart[keys[i]].qty;
    }
    setsubTotal(subt);
  };

  const addtocart = (itemcode, qty, size, price, name, variant) => {
    let mycart = cart;
    if (itemcode in cart) {

      mycart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      mycart[itemcode] = { qty: 1, price, name, size, variant };
    }

    setCart(mycart);
    savecart(mycart);
  };

  const clearcart = () => {
    setCart({});
    savecart({});
  };

  const removefromcart = (itemcode, qty, size, price, name, variant) => {
    let mycart = cart;
    if (itemcode in cart) {
      mycart[itemcode].qty = cart[itemcode].qty - qty;
      savecart(mycart);
    }
    if (mycart[itemcode].qty <= 0) {
      delete mycart[itemcode];
    }
    setCart(mycart);

  };

  return (
    <>
      <Navbar
        key={subTotal}
        cart={cart}
        addtocart={addtocart}
        removefromcart={removefromcart}
        clearcart={clearcart}
        subTotal={subTotal}
      />
      <Component
        {...pageProps}
        cart={cart}
        addtocart={addtocart}
        removefromcart={removefromcart}
        clearcart={clearcart}
        subTotal={subTotal}
      />
      <Footer />
    </>
  );
}
