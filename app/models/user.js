import mongoose from "mongoose";
import Razorpay from "razorpay";

const Postdetails = new mongoose.Schema({
  url: { type: String},
  caption: { type: String },
  type: { type: String },
  description: { type: String},
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    UserType:{type:String,default:"creator"},
    works: {type:[Postdetails], default: [] },
    profilepic: { type: String },
    coverpic: { type: String },
    Razorpayid:{type:String},
    Razorpaysecret:{type:String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export default mongoose.models.User || mongoose.model('User', userSchema);