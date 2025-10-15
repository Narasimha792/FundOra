"use client"
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link'; // Use Next.js Link for client-side navigation

export default function PaymentSuccessPage() {
    const params=useParams()
    const username=params.username
    const searchparams=useSearchParams()
    const amount=Number(searchparams.get("payment"));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      
      {/* Success Card Container */}
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-fill max-w-lg text-center transform transition duration-500 hover:shadow-xl">

        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
            {/* Green circle with a checkmark. Using a simple SVG for the icon */}
            <svg 
                className="w-16 h-16 text-white bg-green-500 rounded-full p-2 animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
            You sent Money to {username} 
        </p>
        <p className="text-3xl font-extrabold text-indigo-600 mb-3">
            Thanks For your support
        </p>

        {/* Transaction Details */}
        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            
            {/* Primary Button */}
         
            
            {/* Secondary Button */}
           
            <Link
             href={`/${username}/payment`}
                className="px-6 py-3 text-lg font-semibold text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 focus:outline-none transition ease-in-out duration-150"
            >
                Go back
            </Link>

        </div>

      </div>
    </div>
  );
}