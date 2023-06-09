import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const Forgot = () => {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Company" />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot password</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <Link href={'/login'} className="font-medium text-regal-blue hover:text-gray-500"> Login Now</Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div className='my-10'>
                                <label for="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" autocomplete="email" required className="relative block w-full  bg-white rounded border border-gray-300 focus:border-regal-blue focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Email address" />
                            </div>
            
                        </div>

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md bg-regal-blue py-2 px-3 text-sm font-semibold text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-regal-blue">
                 
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Forgot
