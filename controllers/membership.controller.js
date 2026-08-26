const membershipModel = require('../models/membership.model');

// Controller functions for membership management
module.exports.createMembership = async (req, res) => {
    try {
        const membership = new membershipModel(req.body);
        await membership.save();
        res.status(201).json(membership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllMemberships = async (req, res) => {
    try {
        const memberships = await membershipModel.find();
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getMembershipById = async (req, res) => {
    try {
        const membership = await membershipModel.findById(req.params.id);
        if (!membership) return res.status(404).json({ message: 'Membership not found' });
        res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateMembership = async (req, res) => {
    try {
        const membership = await membershipModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!membership) return res.status(404).json({ message: 'Membership not found' });
        res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteMembership = async (req, res) => {
    try {
        const membership = await membershipModel.findByIdAndDelete(req.params.id);
        if (!membership) return res.status(404).json({ message: 'Membership not found' });
        res.status(200).json({ message: 'Membership deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.isActive=async(req,res)=>{
    try{
        if(req.params.status==='active'){
            const membership=await membershipModel.find({status:'active'})
            res.status(200).json(membership)
        };
    }  catch(error){
            res.status(500).json({message: 'status innactive'})
        }};
module.exports.renew=async(req,res)=>{
            try {
                const membership =await membershipmodel.findByIdAndUpdate(req,params.id,{status:'active'},{new:'true'})
                res.status(200).json(membership)
            } catch (error) {
                res.status(500).json({ message: error.message });
            };
        }
module.exports.cancel=async(req,res)=>{

try{
    const membership =await membershipmodel.findByIdAndUpdate(req,params.id,{status:'inactive'},{new:'true'})
    res.status(200).json(membership)
}
catch(error){
    res.status(500).json({ message: error.message });
}};
