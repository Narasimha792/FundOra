"use client"
import React from 'react'
import Link from 'next/link';
import Image from "next/image";



export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center text-white">
        <div className="h-[44vh] flex flex-col justify-center items-center">
          <div className="flex md:text-5xl font-bold mb-3 gap-4 text-3xl">Welcome to FundOra <span><Image className="h-10 w-10 md:w-15 md:h-15 rounded-4xl" src="/Money Bag.gif" width={62} height={32} alt="Funding App Logo" /></span></div>
          <p className="text-lg">Your one-stop solution for all funding needs.</p>
          <div className="gap-4 mt-4">
            <Link href="/Home"><button type="button" className="text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>
            <Link href="/readmore"><button type="button" className="text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-7">
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl text-white">Your fans support you.</div>
        <div className="flex justify-center items-center gap-10 mt-10 flex-wrap">
          <div>
            <div className="text-1xl text-white mt-4 w-80 text-sm flex items-center flex-col"><Image className="h-20 m-2" src="/developer.gif" width={52} height={32}  alt="" srcSet="" /><h1 className="text-1xl">Fund Yourself</h1>Your fans are available for you to help you</div>
          </div>
          <div>
            <div className="text-1xl text-white mt-4 w-80 text-sm flex items-center flex-col"><Image className="h-20 m-2" src="/coin.gif" width={52} height={32}  alt="" srcSet="" /><h1 className="text-1xl">Fund Yourself</h1>Your fans are available for you to help you</div>
          </div>
          <div>
            <div className="text-1xl text-white mt-4 w-80 text-sm flex items-center flex-col"><Image className="h-20 m-2 rounded-4xl" width={50} height={12}  src="/funds.gif" alt="" srcSet="" /><h1 className="text-1xl">Fans wants to help</h1>Your fans are available for you to help you</div>
          </div>
        </div>
      </div>
    </>
  );
}
