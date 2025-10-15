"use server"
import mongoose from "mongoose"
import Razorpay from "razorpay"
import Payment from "../models/payment"
import User from "../models/user"

export const initiate = async (amount, to_username, Paymentform) => {
    await mongoose.connect(process.env.MONGO_URI);
    let currentUser=await User.findOne({username:to_username})
    var instance = new Razorpay({ key_id: currentUser.Razorpayid, key_secret: currentUser.Razorpaysecret })

    instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })
    let options={
        amount:Number.parseInt(amount*100),
        currency:'INR'
    }
    let x=await instance.orders.create(options)


    //pending payment
    await Payment.create({ oid: x.id, amount: amount , to_username:to_username,username:Paymentform.username,message:Paymentform.message})
    return x;

}

export const fetchUser=async(email)=>{
    await mongoose.connect(process.env.MONGO_URI);
    let user=await User.findOne({email:email}).lean()
    if (!user) return null;
    return {
    ...user,
     Id: user._id?.toString(),
     _id: user._id?.toString(),  
     Razorpaysecret:user.Razorpaysecret?.toString(),
    Razorpayid: user.Razorpayid?.toString(),
    updatedAt: user.updatedAt?.toISOString(),
    createdAt: user.createdAt?.toISOString(),
    works: user.works?.map(w => ({
      ...w,
      _id: w._id?.toString() // convert each work's _id to string
    })) || [],
  };
}
export const GetPayData = async (to_username) => {
  await mongoose.connect(process.env.MONGO_URI);

  const payments = await Payment.find({to_username:to_username ,done:true}).sort({ amount: -1 }).lean();

  return payments.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));
};

export const GetUsers=async(email)=>{
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.find({UserType:"creator", email: { $ne: email } }).lean()
  return user.map((user) => ({
    ...user,
     Id: user._id?.toString(),
     _id: user._id?.toString(),  
     Razorpaysecret:user.Razorpaysecret?.toString(),
    Razorpayid: user.Razorpayid?.toString(),
    updatedAt: user.updatedAt?.toISOString(),
    createdAt: user.createdAt?.toISOString(),
     works: (user.works || []).map(w => ({
      ...w,
      _id: w._id?.toString(),  // 🔥 This fixes the ObjectId problem
    })),
  }));
}

export const metadata = async(title,desc)=>({
  title: title,
  description:desc
});

export const Validate=async(email,pass)=>{
  await mongoose.connect(process.env.MONGO_URI);
  let user=await User.findOne({email:email,password:pass})
  if(user){
    return true
  }
  return false

}