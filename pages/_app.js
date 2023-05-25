import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [cart, setCart] = useState({});
  const [subTotal, setsubTotal] = useState(0);
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem('token');
    setUser({ value: null })
    router.push('/login')

  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    });

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        savecart(setCart(JSON.parse(localStorage.getItem("cart"))));

      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }

  }, [router.query]);

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

  const buyNow = (itemcode, qty, size, price, name, variant) => {
    let newCart = { itemcode: { qty: 1, price, name, size, variant } }
    setCart(newCart);
    savecart(newCart);
    router.push('/checkout')
  }

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
      <LoadingBar color='#FF69B4' waitingTime={400} progress={progress} onLoaderFinished={()=>{setProgress(0)}} />
      <Navbar
        Logout={Logout}
        user={user}
        key={key}
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
        buyNow={buyNow}
      />
      <Footer />
    </>
  );
}
