"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { Save } from '../actions/savadata';
import { fetchUser } from '../actions/useractions';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [currentUser, setcurrentUser] = useState({});
  const [showpass, setshowpass] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
  }, [status, session, router]);

  // Fetch current user data after session is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const getUser = async () => {
        const u = await fetchUser(session.user.email);
        setcurrentUser(u);
      };
      getUser();
    }
  }, [status, session]);

  // React Hook Form setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Populate form with fetched user data
  useEffect(() => {
    if (currentUser && status === "authenticated") {
      reset({
        name: currentUser.name || "",
        username: session?.user?.email?.split('@')[0] || "",
        email: session?.user?.email || "",
        profilepic: currentUser.profilepic || "",
        password: currentUser.password || "",
        UserType: currentUser.UserType || "creator",
        coverpic: currentUser.coverpic || "",
        razorpayid: currentUser.Razorpayid || "",
        razorpaysecret: currentUser.Razorpaysecret || "",
      });
    }
  }, [currentUser, reset, session, status]);

  // Save form data
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
    <>
      <ToastContainer
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
          
          <label htmlFor="name" className="block text-sm font-medium dark:text-white">Name</label>
          <input id="name" {...register("name", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" />
          {errors.name && <span>This field is required</span>}

          <label htmlFor="username" className="block text-sm font-medium dark:text-white">Username</label>
          <input id="username" {...register("username", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" />
          {errors.username && <span>This field is required</span>}

          <label htmlFor="email" className="block text-sm font-medium dark:text-white">Email</label>
          <input id="email" {...register("email", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" />
          {errors.email && <span>This field is required</span>}

          <label htmlFor="password" className="block text-sm font-medium dark:text-white">Password</label>
          <input id="password" placeholder="Password" {...register("password", { required: true, minLength: { value: 8, message: "Minimum 8 characters required" } })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" type={showpass ? "text" : "password"} />
          {errors.password && <span>{errors.password.message || "This field is required"}</span>}
          <div><input type="checkbox" onClick={() => setshowpass(!showpass)} /> Show Password</div>

          <label htmlFor="UserType" className="block text-sm font-medium dark:text-white">User Type</label>
          <select id="UserType" {...register("UserType")} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline">
            <option value="creator">Creator</option>
            <option value="supporter">Supporter</option>
          </select>

          <label htmlFor="profilepic" className="block text-sm font-medium dark:text-white">Profile Pic</label>
          <input id="profilepic" {...register("profilepic", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" />
          {errors.profilepic && <span>This field is required</span>}

          <label htmlFor="coverpic" className="block text-sm font-medium dark:text-white">Cover Pic</label>
          <input id="coverpic" {...register("coverpic", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" />
          {errors.coverpic && <span>This field is required</span>}

          <label htmlFor="razorpayid" className="block text-sm font-medium dark:text-white">Razorpay ID</label>
          <input id="razorpayid" {...register("razorpayid", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" />
          {errors.razorpayid && <span>This field is required</span>}

          <label htmlFor="razorpaysecret" className="block text-sm font-medium dark:text-white">Razorpay Secret</label>
          <input id="razorpaysecret" {...register("razorpaysecret", { required: true })} className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline" type="password" />
          {errors.razorpaysecret && <span>This field is required</span>}

          <button type="submit" className="w-full my-2 py-1 rounded-lg bg-cyan-400">Save</button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
