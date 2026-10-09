const { Router } = require('express'); // Router object
const router = Router(); // Initialization of Router
const authController = require('../controllers/authController'); // Path to the controller
const messagesController = require('../controllers/messagesController'); // Path to the controller
const { signUpValidators, logInValidators } = require('../middlewares/validators'); // Call validator file and separate validators


// Auth
router.get('/sign-up', authController.signUpGet);
router.post('/sign-up', signUpValidators, authController.signUpPost);
router.get('/log-in', authController.logInGet);
router.post('/log-in', logInValidators, authController.logInPost);
router.get('/join', authController.joinGet);
router.post('/join', authController.joinPost);
router.get('/log-out', authController.logOut); 

// Messages
router.get('/', messagesController.index);
router.get('/messages/new', messagesController.newGet);
router.post('/messages/new', messagesController.newPost);
router.get('/messages/:id/delete', messagesController.deleteGet); 

module.exports = router; // Export router for app.js
