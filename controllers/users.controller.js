const UserModel = require('../models/user.model');
const BookingModel = require('../models/booking.model');
const ClassSessionModel = require('../models/classSession.model');

// ==================== USER CRUD ====================

module.exports.createUser = async (req, res) => {
    try {
        const user = new UserModel({
            ...req.body,
            role: req.body.role || 'user'
        });

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
0
module.exports.getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const { role, ...updateData } = req.body;

        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== MEMBER FUNCTIONS ====================

module.exports.registerFaceEncoding = async (req, res) => {
    try {
        const { userId, faceEncoding } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'member') {
            return res.status(403).json({
                message: 'Face encoding is only available for members'
            });
        }

        user.faceEncoding = faceEncoding;
        await user.save();

        res.status(200).json({
            message: 'Face encoding registered successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFaceEncoding = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
            .select('role faceEncoding');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'member') {
            return res.status(403).json({
                message: 'Face encoding is only available for members'
            });
        }

        res.status(200).json({
            faceEncoding: user.faceEncoding
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getMembership = async (req, res) => {
    try {
        const member = await UserModel.findById(req.params.id)
            .select('role membershipType');

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        if (member.role !== 'member') {
            return res.status(403).json({
                message: 'Membership information is only available for members'
            });
        }

        res.status(200).json({
            membershipType: member.membershipType
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getBookingList = async (req, res) => {
    try {
        const member = await UserModel.findById(req.params.id)
            .select('role bookingList');

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        if (member.role !== 'member') {
            return res.status(403).json({
                message: 'Booking list is only available for members'
            });
        }

        res.status(200).json({
            bookingList: member.bookingList || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== TRAINER FUNCTIONS ====================

module.exports.getSchedule = async (req, res) => {
    try {
        const trainer = await UserModel.findById(req.params.id)
            .select('role');

        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        if (trainer.role !== 'trainer') {
            return res.status(403).json({
                message: 'Schedule is only available for trainers'
            });
        }

        const schedule = await ClassSessionModel.find({
            trainerId: req.params.id
        });

        res.status(200).json({ schedule });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== ADMIN FUNCTIONS ====================

module.exports.manageUser = async (req, res) => {
    try {
        const admin = await UserModel.findById(req.params.id)
            .select('role');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({
                message: 'Only admins can manage users'
            });
        }

        const users = await UserModel.find().select('-password');

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.manageSystem = async (req, res) => {
    try {
        const admin = await UserModel.findById(req.params.id)
            .select('role');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({
                message: 'Only admins can manage the system'
            });
        }

        const users = await UserModel.find().select('-password');

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.generateReports = async (req, res) => {
    try {
        const admin = await UserModel.findById(req.params.id)
            .select('role');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({
                message: 'Only admins can generate reports'
            });
        }

        const [users, bookings, classSessions] = await Promise.all([
            UserModel.aggregate([
                { $group: { _id: '$role', total: { $sum: 1 } } }
            ]),
            BookingModel.aggregate([
                { $group: { _id: '$status', total: { $sum: 1 } } }
            ]),
            ClassSessionModel.aggregate([
                { $group: { _id: '$status', total: { $sum: 1 } } }
            ])
        ]);

        res.status(200).json({
            reports: {
                users,
                bookings,
                classSessions
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== TRAINER CRUD ====================

module.exports.createTrainer = async (req, res) => {
    try {
        const trainer = new UserModel({
            ...req.body,
            role: 'trainer'
        });

        await trainer.save();

        res.status(201).json(trainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getTrainers = async (req, res) => {
    try {
        const trainers = await UserModel.find({ role: 'trainer' }).select('-password');

        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await UserModel.findOne({
            _id: req.params.id,
            role: 'trainer'
        }).select('-password');

        if (!trainer) {
            return res.status(404).json({
                message: 'Trainer not found'
            });
        }

        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateTrainer = async (req, res) => {
    try {
        const { role, ...updateData } = req.body;

        const trainer = await UserModel.findOneAndUpdate(
            {
                _id: req.params.id,
                role: 'trainer'
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!trainer) {
            return res.status(404).json({
                message: 'Trainer not found'
            });
        }

        res.status(200).json(trainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await UserModel.findOneAndDelete({
            _id: req.params.id,
            role: 'trainer'
        });

        if (!trainer) {
            return res.status(404).json({
                message: 'Trainer not found'
            });
        }

        res.status(200).json({
            message: 'Trainer deleted'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== MEMBER CRUD ====================

module.exports.createMember = async (req, res) => {
    try {
        const member = new UserModel({
            ...req.body,
            role: 'member'
        });

        await member.save();

        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getMembers = async (req, res) => {
    try {
        const members = await UserModel.find({
            role: 'member'
        }).select('-password');

        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getMemberById = async (req, res) => {
    try {
        const member = await UserModel.findOne({
            _id: req.params.id,
            role: 'member'
        }).select('-password');

        if (!member) {
            return res.status(404).json({
                message: 'Member not found'
            });
        }

        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateMember = async (req, res) => {
    try {
        const { role, ...updateData } = req.body;

        const member = await UserModel.findOneAndUpdate(
            {
                _id: req.params.id,
                role: 'member'
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!member) {
            return res.status(404).json({
                message: 'Member not found'
            });
        }

        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteMember = async (req, res) => {
    try {
        const member = await UserModel.findOneAndDelete({
            _id: req.params.id,
            role: 'member'
        });

        if (!member) {
            return res.status(404).json({
                message: 'Member not found'
            });
        }

        res.status(200).json({
            message: 'Member deleted'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== ADMIN CRUD ====================

module.exports.createAdmin = async (req, res) => {
    try {
        const admin = new UserModel({
            ...req.body,
            role: 'admin'
        });

        await admin.save();

        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAdmins = async (req, res) => {
    try {
        const admins = await UserModel.find({
            role: 'admin'
        }).select('-password');

        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAdminById = async (req, res) => {
    try {
        const admin = await UserModel.findOne({
            _id: req.params.id,
            role: 'admin'
        }).select('-password');

        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateAdmin = async (req, res) => {
    try {
        const { role, ...updateData } = req.body;

        const admin = await UserModel.findOneAndUpdate(
            {
                _id: req.params.id,
                role: 'admin'
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await UserModel.findOneAndDelete({
            _id: req.params.id,
            role: 'admin'
        });

        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            });
        }

        res.status(200).json({
            message: 'Admin deleted'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};