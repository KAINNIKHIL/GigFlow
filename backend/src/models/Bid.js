import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig" },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  price: Number,
  status: {
    type: String,
    enum: ["pending", "hired", "rejected"],
    default: "pending"
  }
});

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;