"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { initiate, fetchUser, GetPayData } from '../../actions/useractions';
import Script from "next/script";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Username = () => {
  const { data: session, status } = useSession()
  const [button, setbutton] = useState(false)
  const [pamount, setpamount] = useState(0)
  const searchParams = useSearchParams()
  const [currentUser, setcurrentUser] = useState({})
  const [paymentdata, setpaymentdata] = useState([])
  const params = useParams(); // Get the dynamic route params
  const Username = params?.username;
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return; // avoid early redirect before auth is ready
    if (!session) router.push("/login");
  }, [session, status, router]);
  // forms

  useEffect(() => {
    const getUser = async () => {
      const payments = await GetPayData(`${Username}`)
      const u = await fetchUser(`${Username}@gmail.com`);
      setcurrentUser(u);
      setpaymentdata(payments);
      setLoading(false);
    };
    getUser();
  }, [Username]);










  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()






  const onSubmit = async (formData) => {
    await pay(formData.amount, formData);
    setbutton(true)

  };




  const pay = async (amount, paymentform) => {
    let a = await initiate(amount, currentUser.username, paymentform)
    // Create order from backend
    const orderId = a.id
    setpamount(amount)
    var options = {
      "key": `${currentUser.Razorpayid}`, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. 
      "currency": "INR",
      "name": "FundOra", //your business name
      "description": "Test Transaction",
      "image": "/Money Bag.gif",
      "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_url}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "bln", //your customer's name
        "email": "hi@example.com",
        "contact": "+8919255288" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "tirupati"
      },
      "theme": {
        "color": "#3399cc"
      }


    };





    // if (!window.Razorpay) {
    //   alert("Razorpay SDK not loaded");
    //   return;
    // }

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const totalamount = () => {
    let amount = 0;
    for (let index = 0; index < paymentdata.length; index++) {
      amount += paymentdata[index].amount;
    }
    return amount;
  }
  const Email = session?.user?.email


  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast('✅ payment done successfully', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }

      )
      setTimeout(() => {
        router.push(`/${Username}/payment/success`)
      }, 3000);
    }
  }, [searchParams]);

  if (loading || status === "loading") {
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

      {/* 👇 Must be rendered once */}
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className='flex flex-col items-center min-h-screen text-white'>
        <div className='flex relative justify-center items-center w-full h-60 mt-25'>

          <img className='object-fill h-80 w-full' src={`${currentUser.coverpic}`} alt="" />
          <img className='flex absolute bottom-[-70] rounded-full border-2 border-amber-50 w-30 h-30 ' src={`${currentUser.profilepic}`} alt="" />
        </div>
        <div className='mt-20 text-center text-white'>
          <h1 className='text-3xl font-bold'>{currentUser.name}</h1>
          <p className='text-sm text-gray-300'>{currentUser.email}</p>
          <p className='text-sm'>{paymentdata.length} Members Supported and ₹{totalamount()} Recieved</p>
        </div>
        <div>
          <div className='flex justify-center gap-4 mt-4 lg:flex-row flex-col-reverse'>

            {/* payments names */}

            <div className={`${currentUser.email == Email ? "lg:w-[50vw]" : "lg:w-[30vw]"} flex-col overflow-scroll  bg-gray-800 h-[400px]  w-[90vw] mb-5 rounded-4xl mx-5`}>
              <ul className='relative flex flex-col justify-center gap-4 ml-5 mt-10 p-2 flex-wrap'>
                {paymentdata?.map((p) => (
                  <li key={p.oid || p._id} className='m-5'>
                    <div className='flex gap-4 '>
                      <img className='w-8 h-8 rounded-full' src="/profile.png" alt="" />
                      <span className='text-xs flex '>
                        {p.username} sent ₹{p.amount} with message: {p.message}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>


            {/* make payments section */}
            <div className={`${currentUser.email == Email ? "hidden" : "flex"} flex-col justify-center items-center bg-slate-800 h-[400px] lg:w-[40vw] w-[90vw] mb-5 rounded-4xl mx-5`}>
              <h1 className='mb-[10px] mt-[10px]'>Make a Payment</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4">
                {/* register your input into the hook by invoking the "register" function */}
                <input type="text" className="border-2 border-slate-600 rounded-2xl p-2 lg:w-[25vw] w-[60vw]" placeholder="Username" {...register("username", { required: { value: true, message: "username required" }, minLength: { value: 5, message: "check length" } })} />
                {errors.username && <div className="text-white rounded-2xl text-xs">{errors.username.message} </div>}
                {/* include validation with required or other standard HTML validation rules */}
                <input type="text" className="border-2 border-slate-600 rounded-2xl lg:w-[25vw] w-[60vw] p-2" placeholder='Enter your message' {...register("message")} />
                <input id="amount" type="number" className="border-2 border-slate-600 rounded-2xl lg:w-[25vw] w-[60vw] p-2" placeholder='Enter amount' {...register("amount", { required: true })} />
                {/* errors will return when field validation fails  */}
                <button className={`disabled=${button} flex items-center justify-center text-white bg-gradient-to-br cursor-pointer from-purple-600 to-violet-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center lg:w-[25vw] w-[60vw]`}>Pay</button>
                <div className="flex mt-4 ">
                  <button onClick={() => { document.getElementById("amount").value = "10" }} className="bg-white p-2 px-1 text-sm  mr-4 border-2 text-slate-600 rounded-2xl">pay ₹10</button>
                  <button onClick={() => { document.getElementById("amount").value = "20" }} className="bg-white p-2 px-1  text-sm mr-4 border-2 text-slate-600 rounded-2xl">pay ₹20</button>
                  <button onClick={() => { document.getElementById("amount").value = "50" }} className="bg-white p-2 px-1  text-sm mr-4 border-2 text-slate-600 rounded-2xl">pay ₹50</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
  //   return (
  //     <div>
  //       <h1 className='text-3xl font-bold text-white'>Welcome, {params.username}!</h1>
  //     </div>
  //   )
  // }
}

export default Username
