"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import {GetUsers,metadata} from "../actions/useractions"
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from "next/image";

const Page = () => {
  
  const [userdata, setuserdata] = useState([])
   const { data: session, status } = useSession()
    const router = useRouter()
    
    useEffect(() => {
      if (status === "loading") return "loading..."; // avoid early redirect before auth is ready
      if (!session) router.push("/login");
    }, [session, status, router]);



    useEffect(() => {
      if (status === "authenticated" && session?.user?.email) {
        const getUser = async () => {
          const users = await GetUsers(session?.user?.email)
          setuserdata(users)
          
        };
      }
        getUser();
      }, [status, session]);
  return (
    <div className='flex md:flex-row flex-col md:mx-25 md:items-start items-center md:flex-wrap'>
       {userdata.map((u)=>(
        <div key={u.email} className="md:w-80 mt-35 w-[70vw] mx-8 bg-gray-800 rounded-xl shadow-2xl  transform hover:scale-[1.02] transition duration-300 ease-in-out  p-6 border border-gray-700">
      
      {/* Profile Picture */}
      <div className="flex justify-center">
        <img
          className="w-24 h-24 object-cover rounded-full border-4 border-cyan-400 shadow-lg"
          src={u.profilepic}
          alt={`${u.username}'s profile`}
          // Fallback if image fails to load
        />
      </div>

      {/* Creator Information */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-white">
          @{u.username}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Digital Creator
        </p>
      </div>

      {/* Button/Action Area */}
      <div className="mt-5">
        <Link href={`/${u.username}`}><button
          className="w-full py-2 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition duration-150 shadow-md cursor-pointer"
          
        >
          View Profile
        </button></Link>
      </div>
    </div>

       ))

       }
    </div>
  )
}

export default Page
