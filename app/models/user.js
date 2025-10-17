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
    password:{type:String},
    UserType:{type:String,default:"creator"},
    works: {type:[Postdetails], default: [] },
    profilepic: { type: String,default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAM1BMVEXk5ueutLfn6eqrsbTh4+S+w8WorrGxt7q2u765vsHV2Nrc3+Dq7O3Z3N3KztDS1dfEyMuTWYD/AAAEHUlEQVR4nO2b27KrIAyGIYAgHt//aTdYa3W1thwSZPb4X3VmXaxv/oTIIWHs1q1bt27dunXr1q3/SwDAmJRy/VWFoO/sOKvWSal5tLKvgEwOigsuhOBewv/ks5VXkkFvZ70C7SUaM3f9VVDMmg9MK5kwA7vCsn5QzQnTStZ2xblAzmdG7cDmwoaB1b+pHJcZSnJBgFUr2FgQ60dWHbhUMb9MqFcPLlkESkZR+RVZwi+IpPJcBbBULJWPI3XJD1+DezUjbRxhCl+DB78sKVaXBOW5KKni033DUoRUiSFcuCay9JI6mYpzTYWVtgo3u8hWY3oIF7toPkJ5ZpHZ1eVk1iKKWg9jnlmu1lsCu/psszhF7ZJ5Ce+lO3Sq3IT3EhM6FmuzqSg2OPnr0KlBx7L5MXRY2MmVXx680Ctqj5BaTtinsx6FimMfNiC/ankZ5M81QjH1wi6oAw4WH1CpwOJgIZ+AcnbxN9aN9RWr0pSvs0Cwrs5y2tf58ekx9jX4n+pKNzYYJwyKgzXSphkbK/ke8ICFf6zGSC78G3qU4yvBA1Cdh32MqxGS14wpN4o0t7rZx31BchtY6SVlbtITXelWewGeVelpMssLMhYj4eMKg6A2g48ifYGt8+Eu/ZmTMIRefcJTNeUq3JSwwSnRcgDR3yDKl9eXYr+NwpSgYrHNLCWaMxbJNpyrHJXLr+D1WGAN7rnsaVfgAYoT16s3LvnbMOEO0eW7AyfzveI3ZTvwXmCj4acNntxQPAGHcTGrmk+WCaHsJV2nL7KpNb53+Nk8LITWamKXQi1gIIdpVq3RWptWjdMga+kCB7aSwPU2rQKA3gkeevy6FMd9hbphGpcAPpPdBVLNLpCdlOVb+qFnjke1WjRbtu/XoWiaBc/KUmju30jrCtbSsv+9yPu/63mS9PnWMzu2uonY2Dg/jUOjG4TwNil9Wte/oXFunGkUZAB2jrLpjxqhRobenSHHT0MXsZ6pDtMyWKZTECREOyGBARvONwoJZHzEmLYBG7FxD1Kjx2zHOkynnnJ76RywkJ1xIlj6JhHYSODUpjYtxWDATqqjXO6ncI2UTA+w6LEpiDk4p3NFHiMDh54QwOYILhiR2gsCuNrg23ooEcCNiwcmWJG02iushBVKq5dEAJc0haG8flcwjGbcaP3y6xKv+K97+6Jr8Mj1bT1SbRgCdP68nvMAli9zYhda61iazr5DV6X7xvVxOYZfapNx1RfCBetTGC8O4cL11meJMz2QK/12G3B5CL2aP8W+DrNc8Tp6hTIug6Djy1UtZvHjVB7SAAiC9lN5FdSsTbvOVFBXw7y020lkTQAjazeVh9LqiiTRPpMepzEYS9tUHkKPJKK2qTykQSwkbaeNisqD11oirt3Cv6utMeO3wYiaiqmXL6j/AFjeOZEhZutpAAAAAElFTkSuQmCC" },
    coverpic: { type: String ,default:"https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="},
    Razorpayid:{type:String},
    Razorpaysecret:{type:String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export default mongoose.models.User || mongoose.model('User', userSchema);