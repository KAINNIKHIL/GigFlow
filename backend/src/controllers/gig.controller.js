import Gig from "../models/Gig.js"

export const createGig = async(req, res)=>{
    try{
        const { title, description, budget } = req.body;

        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId: req.user.id
        });

        res.status(201).json(gig);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const getGigs = async(req, res)=>{
    try{
        const search = req.query;

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