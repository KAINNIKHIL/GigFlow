import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["open", "assigned"], default: "open", index: true }
});

const Gig = mongoose.model("Gig", gigSchema);

export default Gig;