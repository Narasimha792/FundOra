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
      profilepic: currentUser.profilepic || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAMFBMVEXk5ueutLersbTFyczn6erc3+DIzM7S1dext7rV2NqorrHh4+S2u77Z3N2/xMa5vsCVmcNYAAAEHklEQVR4nO2bybqDIAyFBSMyie//thfRWjtcy5CAC8+qy/8LMSTktOtu3bp169atW7du3bqFLADoOuO1/rqCPMc09m4Ocv04tSfzRMJqzjhbxRdZMXUNwaATdgd6inM2i1YBg6HXn0g7WT+04ALxJUxHLlk/XqD4KVPgYqouFrifTIGrr4gF6vzwjsdYLbs8VLQ4m+pggYgM1Co91sCCUadAeVXASoxUiBb5pwhTMpQXdW4NGUw+5w0pFMg8qpmUqs85P0ZbTv01kwflsQY6qlwmL7IzzCgKh2BRVa0hL9UfoqGC3FTfgiVosIqgGLMURasoq0KwSDLLlkH5YBFQ5deqPVj4NSuyJz6lws93KIaiqKQDAhXDPsLiL3CRHpGpuvK0IugcTHFdWCSRqfJ60HdxXKguq13/pEJO9+Rx6zsV7rSD8gky7NGwsIt5CLm6I9w3gQq3NNxUN9VKhZztON8gQ+6wcOoVdute3h8HKuQnI6R7EHn4MmVz84MKu7+aMaiwZy+U0oA+5MCIQaVwofwRIlBJ9JeGzBfRl1A5bCiMvo/i+aN8ntDoTF6uNFSO4E2m+CvkEz5Ueb7j53qgKgsW8tT1VMlUz2ciqILVhBdJVgWs/MuQcpFTsAcg3BCmb3cfoSI7v4CVd4ZUe4ldOd0f2ff3VAYUya7kVcm3NJfkTOlY3NKtUV+wbELKc2lqOWXisbijz6ldIrJuVbU6+StRRoSLy0qGoh3L/KynXItqKfXkGuYzbxhnNTPqKOX+M/dx7Sp7+g6CTszsnYxzaUVLG2sw145Oaq2Dq5b7H9KNQ1umjQy6QY3Ca1RDexfyU7CrNcnqIDdmGCal1Bik1DQNq6O8id/Xa1gM5FZKuVq1NzEp7Tz3o6prdg9pJBxbUvz/crUkvmebTA00ADM6uwTnR2Xf2JidxUALBmbqrU4dKLhmvlgQkQFMvYz1H3/ETM7oroGAJORJGkWROYV8W6vTmziay+J1ET6/JcouPID1OC2XETENXjwXc8WWdzA//h2Rw6VdUbygG1HjtHOVdISgUkasNC6e2YFB8aPxOZfNOUagObwjV5/MZEgDtWHZtFctSBraC7hS3rVQ1m5xWPGP8Fg2gSgsG3sH4TgqohX3Lc51oaKwTJ08f9HvvWEDqJ8rnhaRYr+2rFA9px5YJ90Nkp8pR/LfJ916xfOL/lsUwITVB+fovxdUHKtxPtbXD7FhUm1YX/rTtucXqL44C3AMVmVYH+M1ltG4SB/2d9P6/Ba9N4HNU33VmxVqas2z6jVYl8iqoBeqq0Adm4dsQwC+jtchiu0SR88RsfCvnZg65HvLDuZdu9H1IsVqld6pWpMcpfc57DJfIHsmFqgrUbGtn7lOYQ/aTDVQ4akqQdsN7YfAK+lRR0V/KfnJ8A/qWzrfqYu0RgAAAABJRU5ErkJggg==",
      password: currentUser.password,
      UserType:currentUser.UserType ||"creator",
      coverpic: currentUser.coverpic || "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
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