"use server"
import mongoose from "mongoose";
import User from "../models/user"
import { NextResponse } from "next/server";


await mongoose.connect(process.env.MONGO_URI)

export const Save = async (data, id) => {
  // Assuming you want to create a new user with the provided data 
  let currentdata = await User.findOne({ email: id })
  currentdata.name = data.name;
  currentdata.password = data.password;
  currentdata.UserType = data.UserType;
  currentdata.profilepic = data.profilepic;
  currentdata.coverpic = data.coverpic;
  currentdata.Razorpayid = data.razorpayid;
  currentdata.Razorpaysecret = data.razorpaysecret;

  // Save the updated user
  await currentdata.save();

  NextResponse.redirect(`${process.env.NEXT_PUBLIC_url}/dashboard?save=true`)
}

export const addPost = async (data, id) => {
  let currentdata = await User.findOne({ email: id })
  if (!Array.isArray(currentdata.works)) currentdata.works = [];
  currentdata.works.push({
    url: data.url,
    caption: data.caption,   // default to empty string if caption is falsy
    type: data.type,            // default type
    description: data.description    // default description
  });
  await currentdata.save();
}

export const delPost = async (index, id) => {
  // await User.updateOne({ email: id },
  // { $unset: { [`works.${index}`]: 1 }})
  //   await User.updateOne(
  //     { email: id },
  //     { $pull: { works: null } }
  //   );
  const user = await User.findOne({ email: id });
  user.works.splice(index, 1);
  await user.save()


}