"use client"
import React from 'react'
import { fetchUser } from "../actions/useractions"
import { useState, useEffect } from 'react'
import { useRouter, useParams } from "next/navigation";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import Image from "next/image";

const Page = () => {


  const [Loading, setLoading] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()


  const [currentUser, setcurrentUser] = useState({})
  const params = useParams(); // Get the dynamic route params
  const username = params?.username;
  useEffect(() => {
    const getUser = async () => {
      const u = await fetchUser(`${username}@gmail.com`);
      setcurrentUser(u);
      setLoading(false)
    };
    getUser();
  }, [username]);

  if (Loading || status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-xl">
        <div role="status">
          <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const Email = session?.user?.email

  if (!currentUser) {
    return <div className="text-white">User not Found</div>; // show while fetching
  }
  const Posts = currentUser?.works || [];

  return (
    <div className='flex flex-col'>
      <div className='flex relative justify-center items-center w-full h-60 mt-25'>

        <img className='object-fill h-80 w-full' src={`${currentUser.coverpic}`} alt="" />
        <img className='flex absolute bottom-[-70] rounded-full border-2 border-amber-50 w-30 h-30 ' src={`${currentUser.profilepic}`} alt="" />
      </div>
      <div className='flex  flex-col items-center justify-center mt-20'>
        <div className='mt-8 text-center text-white'>
          <h1 className='text-3xl font-bold'>{currentUser.name}</h1>
          <p className='text-sm text-gray-300'>{currentUser.email}</p>
        </div>
        <Link href={`/${currentUser.username}/payment`}> <button
          className={`${currentUser?.email == Email ? "hidden" : "flex"} mt-5 w-50 py-3 text-lg font-bold text-gray-900 
                     bg-white rounded-xl shadow-inner shadow-gray-300 
                     hover:bg-gray-100 transition duration-150 cursor-pointer text-center justify-center`}
        >
          Support Me
        </button></Link>
      </div>

      <div className='flex flex-col-reverse items-center mt-10 mb-10'>
        {Posts.length === 0 ? (
          <div>No posts</div>
        ) : (Posts.map((w, i) => {
          function getTimeDifference(createdAT) {
            const created = new Date(createdAT);
            const now = new Date();

            // difference in milliseconds
            let diff = Math.abs(now - created);

            // convert to time units
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            if (months == 1) {
              return `${months} month`
            }
            else if (months > 1) {
              return `${months} months`
            }
            else if (days == 1) {
              return `${days} day`
            }
            else if (days > 1) {
              return `${days} days`
            }
            else if (hours == 1) {
              return `${hours} hour`
            }
            else if (hours > 1) {
              return `${hours} hours`
            }
            else if (minutes == 1) {
              return `${minutes} minute`
            }
            else if (minutes > 1) {
              return `${minutes} minutes`
            }
            else {
              return `${seconds} seconds`;
            }
            // 
          }

          return (
            <div key={i} className=" mt-10 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center  w-[80vw] md:w-[50vw]">


              {w.type === "youtube video url" ? (
                <div className="w-full ">
                  <iframe
                    src={`https://www.youtube.com/embed/${w.url.split("?v=")[1]}`}
                    // width="650"
                    // height="450"
                    className='w-[80vw] h-100 md:w-[50vw] md:h-[500]'
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : w.type === "youtube short url" ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${w.url.split("/shorts/")[1]}`}
                    className='w-[80vw] h-100 md:w-[50vw] md:h-[500]'
                    title="YouTube Short"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : w.type === "image url" ? (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    className="w-full object-contain"
                    src={w.url}
                    alt="Post"
                  />
                </div>) : w.type === "instagram url" ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <blockquote
                      className="instagram-media w-[80vw] h-140 relative md:w-[50vw] md:h-[60vw] object-contain overflow-contain"
                      data-instgrm-permalink={w.url}
                      data-instgrm-version="14"
                    ></blockquote>

                    <Script async src="https://www.instagram.com/embed.js" />


                  </div>) : (<div>invalid video type</div>)}




              <div className="p-6">
                <p className="mt-2 text-gray-900 text-sm">
                  <span className="font-semibold">{w.caption}</span>
                </p>
                <p className="mt-2 text-gray-500 text-sm">
                  {w.description}
                </p>
              </div>


              <div className="p-4 border-t border-gray-200 text-xs text-gray-400">
                Posted {getTimeDifference(w.createdAt)} ago
              </div>

            </div>

          )
        }
        )
        )}

      </div >
      <div className="text-white bottom-15 right-10 fixed">
        <Link href={`/${currentUser.username}/payment`}><button className={`${currentUser?.email == Email ? "hidden" : "flex"}  items-center text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center `}>Support Me
        </button></Link>
      </div>
    </div >
  );
}

export default Page
