"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Save } from '../actions/savadata';
import { fetchUser } from '../actions/useractions';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Dashboard = () => {
  const { data: session, status } = useSession();
  const [Loading, setLoading] = useState(true)
  const [currentUser, setcurrentUser] = useState({})
  const [showpass, setshowpass] = useState(false)
  const [saved, setsaved] = useState(false)
  // Get the dynamic route params
  const Username = session?.user?.email;
  useEffect(() => {
    const getUser = async () => {
      const u = await fetchUser(`${Username}`);
      setcurrentUser(u);
      setLoading(false)

    };
    getUser();
  }, [Username]);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        username: session?.user?.email?.split('@')[0] || "",
        email: session?.user?.email || "",
        profilepic: currentUser.profilepic,
        password: currentUser.password,
        UserType: currentUser.UserType || "creator",
        coverpic: currentUser.coverpic,
        razorpayid: currentUser.Razorpayid || "",
        razorpaysecret: currentUser.Razorpaysecret || "",
        UserType: currentUser.UserType || "",
      });
    }
  }, [currentUser, reset, session]);



  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // avoid early redirect before auth is ready
    if (!session) router.push("/login");
  }, [session, status, router]);

  const onSubmit = async (data) => {
    setsaved(true)
    await Save(data, session?.user?.email);
    setsaved(false)

  };

  if (Loading || status === "loading" || saved) {
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


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2 text-white'>
        <form className="text-white grid gap-2 md:w-[50vw] w-[80vw] mt-20" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="block text-sm font-medium dark:text-white">name</label>
          <input id="name" {...register("name", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" type="text" defaultValue={currentUser?.name} />
          {errors.name && <span>This field is required</span>}
          <label htmlFor="username" className="block text-sm font-medium dark:text-white">username</label>
          <input id="username" {...register("username", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" type="text" defaultValue={session?.user?.email?.split('@')[0]} />
          {errors.username && <span>This field is required</span>}
          <label htmlFor="email" className="block text-sm font-medium dark:text-white">Email</label>
          <input id="email" {...register("email", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" type="email" defaultValue={session?.user?.email} />
          {errors.email && <span>This field is required</span>}
          <label htmlFor="password" className="block text-sm font-medium dark:text-white">password</label>
          <input placeholder='password'{...register("password", { required: true, minLength: { value: 8, message: "minimum 8 characters required" } })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="razorpaysecret" type={showpass ? "text" : "password"} defaultValue={currentUser?.password} />
          {errors.password && <span>This field is required</span>}
          <div><input type="checkbox" onClick={() => { setshowpass(!showpass) }} /> Show Password</div>
          <label htmlFor="userType" className="block text-sm font-medium dark:text-white">User Type</label>
          <select className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"{...register("UserType")}>
            <option value="creator">creator</option>
            <option value="supporter">supporter</option>
          </select>
          <label htmlFor="profilepic" className="block text-sm font-medium dark:text-white">Profile Pic</label>
          <input {...register("profilepic", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="profilepic" type="text" defaultValue={currentUser?.profilepic} />
          {errors.profilepic && <span>This field is required</span>}
          <label htmlFor="coverpic" className="block text-sm font-medium dark:text-white">Cover Pic</label>
          <input {...register("coverpic", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="coverpic" type="text" defaultValue={currentUser?.coverpic} />
          {errors.coverpic && <span>This field is required</span>}
          <label htmlFor="razorpayid" className="block text-sm font-medium dark:text-white">Razorpayid</label>
          <input {...register("razorpayid", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="razorpayid" type="text" defaultValue={currentUser?.Razorpayid} />
          {errors.razorpayid && <span>This field is required</span>}
          <label htmlFor="razorpaysecret" className="block text-sm font-medium dark:text-white">Razorpaysecret</label>
          <input {...register("razorpaysecret", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="razorpaysecret" type="password" defaultValue={currentUser?.Razorpaysecret} />
          {errors.razorpaysecret && <span>This field is required</span>}
          <button type="submit" className="w-full my-2 py-1 rounded-lg bg-cyan-400">Save</button>
        </form>
      </div>
    </>
  );
};

export default Dashboard