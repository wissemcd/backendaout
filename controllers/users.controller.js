const UserModel = require('../models/user.model');

module.exports.createUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        console.log('Creating user with data:', req.body); // Debugging line
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.hello = async (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
};

module.exports.createUserAdmin = async (req, res) => {
    try {
        // Ensure role is admin regardless of request body
        const adminData = Object.assign({}, req.body, { role: 'admin' });
        const admin = new UserModel(adminData);
        await admin.save();
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await UserModel.findmany({email,password});
        if(!user) return res.status(404).json({message:'User not found'});
        res.status(200).json({message:'Login successful',user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.loggoutUser= async(req,res) =>{try{
    const{email,password}= req.body;
    const user=await UserModel.findmany({email,password});
    if(!user) return res.status(404).json({message:'User not found'});
      res.status(200).json({message:'Logout successful'});
    }catch(error) {
        res.status(500).json({message:error.message})
      }
};
module.exports.updateUserStatus= async(req,res)=>{
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//manage user
module.exports.manageUser=async(req,res)=> {
    try{
        const user=await usermodel.findByIdAndUpdate(req,params,id,req.body,{new:true});
        if(!user)return res.status(404).json({message:'user not found'})

    res.status(200).json(user);
}catch(error){
    res.status(500).json({message:error.message})
}};
//manage report
module.exports.generateReport=async(req,res) =>{

try{
    const users=await usermodel.find();
    const report=users.map(user=>({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status
    }))
    res.status(200).json({ message: 'Report generated', report });
} catch (error) {
    res.status(500).json({ message: error.message });
}};