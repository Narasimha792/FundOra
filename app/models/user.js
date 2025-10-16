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
    UserType:{type:String,default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAMFBMVEXk5ueutLersbTFyczn6erc3+DIzM7S1dext7rV2NqorrHh4+S2u77Z3N2/xMa5vsCVmcNYAAAEHklEQVR4nO2bybqDIAyFBSMyie//thfRWjtcy5CAC8+qy/8LMSTktOtu3bp169atW7du3bqFLADoOuO1/rqCPMc09m4Ocv04tSfzRMJqzjhbxRdZMXUNwaATdgd6inM2i1YBg6HXn0g7WT+04ALxJUxHLlk/XqD4KVPgYqouFrifTIGrr4gF6vzwjsdYLbs8VLQ4m+pggYgM1Co91sCCUadAeVXASoxUiBb5pwhTMpQXdW4NGUw+5w0pFMg8qpmUqs85P0ZbTv01kwflsQY6qlwmL7IzzCgKh2BRVa0hL9UfoqGC3FTfgiVosIqgGLMURasoq0KwSDLLlkH5YBFQ5deqPVj4NSuyJz6lws93KIaiqKQDAhXDPsLiL3CRHpGpuvK0IugcTHFdWCSRqfJ60HdxXKguq13/pEJO9+Rx6zsV7rSD8gky7NGwsIt5CLm6I9w3gQq3NNxUN9VKhZztON8gQ+6wcOoVdute3h8HKuQnI6R7EHn4MmVz84MKu7+aMaiwZy+U0oA+5MCIQaVwofwRIlBJ9JeGzBfRl1A5bCiMvo/i+aN8ntDoTF6uNFSO4E2m+CvkEz5Ueb7j53qgKgsW8tT1VMlUz2ciqILVhBdJVgWs/MuQcpFTsAcg3BCmb3cfoSI7v4CVd4ZUe4ldOd0f2ff3VAYUya7kVcm3NJfkTOlY3NKtUV+wbELKc2lqOWXisbijz6ldIrJuVbU6+StRRoSLy0qGoh3L/KynXItqKfXkGuYzbxhnNTPqKOX+M/dx7Sp7+g6CTszsnYxzaUVLG2sw145Oaq2Dq5b7H9KNQ1umjQy6QY3Ca1RDexfyU7CrNcnqIDdmGCal1Bik1DQNq6O8id/Xa1gM5FZKuVq1NzEp7Tz3o6prdg9pJBxbUvz/crUkvmebTA00ADM6uwTnR2Xf2JidxUALBmbqrU4dKLhmvlgQkQFMvYz1H3/ETM7oroGAJORJGkWROYV8W6vTmziay+J1ET6/JcouPID1OC2XETENXjwXc8WWdzA//h2Rw6VdUbygG1HjtHOVdISgUkasNC6e2YFB8aPxOZfNOUagObwjV5/MZEgDtWHZtFctSBraC7hS3rVQ1m5xWPGP8Fg2gSgsG3sH4TgqohX3Lc51oaKwTJ08f9HvvWEDqJ8rnhaRYr+2rFA9px5YJ90Nkp8pR/LfJ916xfOL/lsUwITVB+fovxdUHKtxPtbXD7FhUm1YX/rTtucXqL44C3AMVmVYH+M1ltG4SB/2d9P6/Ba9N4HNU33VmxVqas2z6jVYl8iqoBeqq0Adm4dsQwC+jtchiu0SR88RsfCvnZg65HvLDuZdu9H1IsVqld6pWpMcpfc57DJfIHsmFqgrUbGtn7lOYQ/aTDVQ4akqQdsN7YfAK+lRR0V/KfnJ8A/qWzrfqYu0RgAAAABJRU5ErkJggg=="},
    works: {type:[Postdetails], default: [] },
    profilepic: { type: String,default:"https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=" },
    coverpic: { type: String },
    Razorpayid:{type:String},
    Razorpaysecret:{type:String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export default mongoose.models.User || mongoose.model('User', userSchema);