import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const Account = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    return (
        <div>
            account
        </div>
    )
}

export default Account
