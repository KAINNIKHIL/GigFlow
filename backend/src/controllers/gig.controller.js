import Gig from "../models/Gig.js"

export const createGig = async(req, res)=>{
    try{
        const { title, description, budget } = req.body;

        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId: req.user.id,
            status: "open"
        });

        res.status(201).json(gig);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const getGigs = async(req, res)=>{
    try{
        const { search } = req.query;

        const filter = {status: "open"};

        if(search){
            filter.title = { $regex: search, $options: "i" };
        }

        const gigs = await Gig.find(filter).sort({ createdAt: -1 });
        res.json(gigs);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}


export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
