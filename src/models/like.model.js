import mongoose from "mongoose"

const likeSchema = new mongoose.Schema({

    Comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    },
    likedBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    tweet : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Tweet"
    },
    video :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video"
    }

},{
    timestamps: true
})

export const Like = mongoose.model("Like" , likeSchema);