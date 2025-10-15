"use client"
import React from 'react'
import {SessionProvider} from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Sessionwrapper = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Sessionwrapper
