"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { useSession } from 'next-auth/react'
import { fetchUser } from "../../actions/useractions"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addPost, delPost } from '../../actions/savadata'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { redirect } from 'next/dist/server/api-utils'

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter()




  const onSubmit = async (data) => {
    await addPost(data, session?.user?.email)
    router.push(`/${session?.user?.email.split('@')[0]}`)
  }

  const handleDelete = async (i) => {
    await delPost(i, session?.user?.email);
    router.push(`/${session?.user?.email.split('@')[0]}`)
  }



  useEffect(() => {
    if (status === "loading") return <div>loading</div>; // avoid early redirect before auth is ready
    if (!session) router.push("/login");
  }, [session, status, router]);



  const [currentUser, setcurrentUser] = useState({})
  const params = useParams(); // Get the dynamic route params
  const username = params?.username;


  useEffect(() => {
    const getUser = async () => {
      const u = await fetchUser(`${username}@gmail.com`);
      setcurrentUser(u);
    };
    getUser();
  }, [username]);


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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const Posts = currentUser?.works || [];
  return (
    <div>
      <div className="h-[60vh] text-white p-10 flex flex-col-reverse items-center overflow-y-scroll rounded-b-2xl">
        {Posts.length === 0 ? (
          <div>No posts</div>
        ) : (Posts.map((w, i) => (
          <div
            key={i}
            className="flex min-h-20 w-100 md:w-[70vh] justify-evenly items-center bg-amber-100 relative rounded-3xl m-5"
          >
            <div className='text-black text-2xl'>{Posts.length - i} Post</div>
            <div className='flex flex-col'>
              <span className="flex text-gray-500 md:mr-40 mr-20">caption: <p className='text-black'>{w.caption}</p></span>
              <span className="flex text-gray-500 md:mr-40 mr-20">video type: <p className='text-black'>{w.type}</p></span>
              <span className="flex text-gray-500 md:mr-40 mr-20">posted:<p className='text-black'>{getTimeDifference(w.createdAt)} ago</p></span>
            </div>

            <span onClick={() => handleDelete(i)} className="text-red-700 absolute right-10 cursor-pointer">delete</span>
          </div>
        )))}
      </div>
      <div className='flex justify-center mt-10'>
        <form className="text-white grid gap-2 md:w-[50vw] w-[80vw]" onSubmit={handleSubmit(onSubmit)}>
          <select className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline flex text-center"{...register("type")}>
            <option value="">Select Url Type</option>
            <option value="youtube video url">youtube video url</option>
            <option value="youtube short url">youtube short url</option>
            <option value="image url">image url</option>
            <option value="instagram url">instagram url</option>
          </select>
          <input placeholder='Your work url'{...register("url", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline flex text-center" id="url" type="text" defaultValue="" />
          {errors.worksurl && <span>This field is required</span>}
          <input placeholder='Add Caption'{...register("caption")} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline flex text-center" id="url" type="text" defaultValue="" />
          <input placeholder='Add description'{...register("description")} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline flex text-center" id="url" type="text" defaultValue="" />
          <button type="submit" className="w-full my-2 py-1 rounded-lg bg-cyan-400">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Page
