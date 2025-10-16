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

  const [currentUser, setcurrentUser] = useState({})
  const [showpass, setshowpass] = useState(false)
  // Get the dynamic route params
  const Username = session?.user?.email;
  useEffect(() => {
    const getUser = async () => {
      const u = await fetchUser(`${Username}`);
      setcurrentUser(u);

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
      profilepic: currentUser.profilepic || "",
      password: currentUser.password,
      UserType:currentUser.UserType ||"supporter",
      coverpic: currentUser.coverpic || "",
      razorpayid: currentUser.Razorpayid || "",
      razorpaysecret: currentUser.Razorpaysecret || "",
      UserType: currentUser.UserType || "creator",
    });
  }
}, [currentUser, reset, session]);



  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // avoid early redirect before auth is ready
    if (!session) router.push("/login");
  }, [session, status, router]);

    const onSubmit = async (data) => {
  await Save(data, session?.user?.email);
  toast('✅ Data Saved', {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};




  return (
    <> <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
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
         <input placeholder='password'{...register("password", { required: true ,minLength:{value:8,message:"minimum 8 characters required"}})} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="razorpaysecret" type={showpass ? "text" : "password"} defaultValue={currentUser?.password} />
        {errors.password && <span>This field is required</span>}
        <div><input type="checkbox" onClick={()=>{setshowpass(!showpass)}}/> Show Password</div>
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