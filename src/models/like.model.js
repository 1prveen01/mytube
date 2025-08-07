import mongoose from "mongoose"

const likeSchema = new mongoose.Schema({

    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    },
    likedBy: {
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
    },
    type: {
        type: String,
        enum: ["like" , "dislike"],
        default: "like",
        
    }

},{
    timestamps: true
})

likeSchema.index({ likedBy: 1, comment: 1 }, { unique: true });

export const Like = mongoose.model("Like" , likeSchema);