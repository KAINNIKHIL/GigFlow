import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.status !== "open")
      return res.status(400).json({ message: "Gig is not open for bidding" });

    if (gig.ownerId.toString() === req.user.id)
      return res.status(403).json({ message: "You cannot bid on your own gig" });

    const exists = await Bid.findOne({ gigId, bidderId: req.user.id });
    if (exists)
      return res.status(400).json({ message: "You already bid on this gig" });

    const bid = await Bid.create({
      gigId,
      bidderId: req.user.id,
      message,
      price,
    });

    // 🔔 Send real-time notification to gig owner
    const io = req.app.get("io"); // get socket instance from server
    io.to(gig.ownerId.toString()).emit("new-bid", {
      gigId,
      bidId: bid._id,
      bidderId: req.user.id,
      message,
      price,
    });

    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;
    //console.log(gigId);
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    // only owner can view bids
    if (gig.ownerId.toString() !== req.user.id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const bids = await Bid.find({ gigId })
      .populate("bidderId", "name email")
      .sort({ createdAt: -1 });
    
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};