import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import mongoose from "mongoose";
import payment from "@/app/models/payment";

export const POST=async(req)=>{
  await mongoose.connect(process.env.MONGO_URI)
  let body=await req.formData()
  body=Object.fromEntries(body)

  //get order id
  let p=await payment.findOne({oid:body.razorpay_order_id})
  if(!p){
    return NextResponse.json({sucess:false,message:"oid not found"})

  }

  //verify payment

  let xx=validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,process.env.KEY_SECRET)

  if(xx){
    const upadetepayment=await payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true})
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_url}/${upadetepayment.to_username}/payment?paymentdone=true`)

  }
  else{
    return NextResponse.json({sucess:false,message:"payment failed"})
  }

}
