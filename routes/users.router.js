var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');

// Generic user routes
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

// Member-specific routes
router.post('/member', userController.createMember);
router.get('/member', userController.getMembers);
router.get('/member/:id', userController.getMemberById);
router.put('/member/:id', userController.updateMember);
router.delete('/member/:id', userController.deleteMember);

// Trainer-specific routes
router.post('/trainer', userController.createTrainer);
router.get('/trainer', userController.getTrainers);
router.get('/trainer/:id', userController.getTrainerById);
router.put('/trainer/:id', userController.updateTrainer);
router.delete('/trainer/:id', userController.deleteTrainer);

// Admin-specific routes
router.post('/admin', userController.createAdmin);
router.get('/admin', userController.getAdmins);
router.get('/admin/:id', userController.getAdminById);
router.put('/admin/:id', userController.updateAdmin);
router.delete('/admin/:id', userController.deleteAdmin);

// User feature routes
router.post('/face-encoding', userController.registerFaceEncoding);
router.get('/face-encoding/:id', userController.getFaceEncoding);
router.get('/membership/:id', userController.getMembership);
router.get('/booking-list/:id', userController.getBookingList);
router.get('/schedule/:id', userController.getSchedule);
router.get('/manage/:id', userController.manageUser);
router.get('/manage-system/:id', userController.manageSystem);
router.get('/reports/:id', userController.generateReports);

// Generic by-id route 
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;