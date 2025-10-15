"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Image from "next/image";

const Navbar = () => {
  const params=useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)
  const [hamstate, sethamstate] = useState(true)
  const hiddenRoutes = ["/readmore"]
const isHidden = hiddenRoutes.includes(pathname)

  const hamburger=()=>{
    sethamstate(!hamstate);
  }
  if(isHidden) return null
  if (session) {
    return (
      <div className=' flex justify-between items-center w-[100vw] bg-gray-800 text-white h-15 px-10 fixed z-9'>
        <div onClick={() => router.push("/")} className='flex mx-[-20] md-2 items-center gap-3 cursor-pointer'><span><Image className="h-8  rounded-full" width={32} height={32}  src="/Money Bag.gif" alt="Funding App Logo" /></span><h1 className='md:text-3xl  text-2xl font-bold'>FundOra </h1></div>
        <nav className='flex space-between items-center'>
          {/* <ul className='flex space-x-10'>
          <li><Link href="/">Home</a></li>
          <li><Link href="/about">About</a></li>
          <li><Link href="/contact">Contact</a></li>
        </ul> */}
        <div onClick={hamburger} >
          <img className={`${hamstate?("flex"):("hidden")} invert-100 h-8 w-8 lg:hidden`} src="/hamburger.svg" alt="hi" srcSet="" />
          <img className={`${!hamstate?("flex"):("hidden")} invert-100 h-8 w-8 lg:hidden`} src="/cross.svg" alt="hi" srcSet="" />
        </div>
          {hamstate?(
            <div className='hidden  lg:flex flex-col justify-evenly items-center bg-gray-800 text-white h-15 px-10 gap-4 md:flex-row mx-[-50]'>
            <span className="flex gap-3 items-center text-sm">
              <div className="relative">
                {/* dropdown button */}

                <button onMouseEnter={() => setshowdropdown(true)} onMouseLeave={() => setshowdropdown(false)} id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
                </button>

                {/* droupdown */}
                <div onMouseEnter={() => setshowdropdown(true)} onMouseLeave={() => setshowdropdown(false)} id="dropdownDelay" className={`z-10 ${showdropdown ? "" : "hidden"} absolute top-10 right-3 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                    <li>
                      <Link href={`/${session.user.email.split('@')[0]}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My profile</Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.email.split('@')[0]}/payment`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your payments</Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.email.split('@')[0]}/build`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Build Profile</Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <Link href="#" onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                  </div>
                </div>
              </div>
            </span>
            {session && <Link href="/Home" className="flex items-center text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center">View All Creators</Link>}
            <button onClick={() => signOut()} className="flex items-center text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center ">Sign out</button>
          </div>
          ):(
            <div className=' top-15 bottom-0 right-0 flex text-center w-80 items-center text-black px-10 gap-4 bg-white flex-col h-[100vh] rounded-b-3xl rounded-t-2xl z-1 fixed'>
            <span className="flex gap-3 items-center text-sm">
              <div className="relative">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col justify-evenly h-[50vh]">
                    <li>
                      <Link href={`/${session?.user?.email.split('@')[0]}`} onClick={hamburger} className="px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 text-black">My profile</Link>
                    </li><li>
                      <Link href={`/Home`} onClick={hamburger} className="px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 text-black">Veiw All Creators</Link>
                    </li>
                    <li>
                      <Link href="/dashboard" onClick={hamburger} className="px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 text-black">Dashboard</Link>
                    </li>
                    <li>
                      <Link href={`/${session?.user?.email.split('@')[0]}/payment`} onClick={hamburger} className="px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 text-black">Your payments</Link>
                    </li>
                    <li>
                      <Link href={`/${session?.user?.email.split('@')[0]}/build`} onClick={hamburger} className="px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 text-black">Build Profile</Link>
                    </li>
                  </ul>
               
              </div>
            </span>
            <button onClick={() => signOut()} className="flex items-center text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center ">Sign out</button>
          </div>)}
        </nav>
      </div>
    )
  }


  return (
    <div className='flex justify-between items-center bg-gray-800 text-white h-15 px-2 md-px-10'>
      <div onClick={() => router.push("/")} className='flex items-center gap-4 cursor-pointer mx-2'><span><Image className="h-8 rounded-full" src="/Money Bag.gif" width={32} height={32} alt="Funding App Logo" /></span><h1 className='text-3xl font-bold'>FundOra</h1></div>
      <nav className='flex space-between items-center justify-center'>
        {/* <ul className='flex space-x-10'>
          <li><Link href="/">Home</a></li>
          <li><Link href="/about">About</a></li>
          <li><Link href="/contact">Contact</a></li>
        </ul> */}
        <Link href="/login"><div className='flex justify-center items-center'><button type="button" className="text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">login</button></div></Link>
      </nav>
    </div>
  )
}

export default Navbar
