"use client"
import React from 'react'
import { fetchUser } from "../actions/useractions"
import { useState, useEffect } from 'react'
import { useRouter, useParams } from "next/navigation";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Script from 'next/script';

const page = () => {



  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "loading") return; // avoid early redirect before auth is ready
    if (!session) router.push("/login");
  }, [session, status, router]);

  const [currentUser, setcurrentUser] = useState({})
  const params = useParams(); // Get the dynamic route params
  const username = params?.username;
  useEffect(() => {
    const getUser = async () => {
      const u = await fetchUser(`${username}@gmail.com`);
      setcurrentUser(u);
      console.log(u)
    };
    getUser();
  }, [username]);

  const Email=session?.user?.email

  if (!currentUser) {
    return <div className="text-white">User not Found</div>; // show while fetching
  }
  const Posts = currentUser?.works || [];
  console.log(Posts.description)

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
          className={`${currentUser?.email==Email ?"hidden":"flex"} mt-5 w-50 py-3 text-lg font-bold text-gray-900 
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
            const seconds = Math.round(diff / 1000);
            const minutes = Math.round(seconds / 60);
            const hours = Math.round(minutes / 60);
            const days = Math.round(hours / 24);
            const months = Math.round(days / 30);
            const years = Math.round(days / 365);

           if(months==1){
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
          console.log(w.url)
          console.log(`https://www.youtube.com/embed/${w.url.split("/shorts/")[1]}`)


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
        <Link href={`/${currentUser.username}/payment`}><button className= {`${currentUser?.email==Email ?"hidden":"flex"}  items-center text-white bg-gradient-to-br cursor-pointer from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center `}>Support Me
        </button></Link>
      </div>
    </div >
  );
}

export default page
