import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) throw new Error("Bid not found");

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) throw new Error("Gig not found");

 
    if (gig.ownerId.toString() !== req.user.id)
      throw new Error("Not authorized");

    
    if (gig.status === "assigned")
      throw new Error("Gig already assigned");

    
    await Bid.updateOne(
      { _id: bidId },
      { status: "hired" }
    ).session(session);

  
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { status: "rejected" }
    ).session(session);

  
    await Gig.updateOne(
      { _id: gig._id },
      { status: "assigned" }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    
    const io = req.app.get("io");
    if (io) {
      io.to(bid.freelancerId.toString()).emit("hired", {
        gigTitle: gig.title,
        message: `You have been hired for ${gig.title}`
      });
    }

    res.json({ message: "Freelancer hired successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message });
  }
};
