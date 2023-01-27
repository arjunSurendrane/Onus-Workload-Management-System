import express, { application } from "express";
import { adminLogin } from "../controller/adminAuth.js";
import { BlockUser, getAllUser } from "../controller/adminController.js";
import { isAdmin } from "../middleware/adminAuth.js";

const router = express.Router()

// Admin Registration
router.post('/login', adminLogin)

// admin Authenication
router.use(isAdmin)

router.get('/', (req, res) => {
    res.send('hello')
})

// block User
router.post('/blockuser', BlockUser)

router.get('/getAllUser', getAllUser)






export default router