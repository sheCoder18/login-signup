const express = require('express')
const router = express.Router();
const cors = require('cors')
const {test, registerUser, loginUser, getProfile} = require('../controllers/authController')

//middleware
router.use(cors())

//CRUD
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

module.exports = router;