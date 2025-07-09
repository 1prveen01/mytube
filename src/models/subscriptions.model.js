import mongoose, { mongo } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, //one who is subscribing
      ref: "User",
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId, // to whom "subscriber" is subscribiing
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.index({ subscriber: 1, channel: 1 }, { unique: true });

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
