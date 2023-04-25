const Router = require('express')
const UserController = require('../Controllers/UserController')
const router = Router()
const {body} = require('express-validator')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')


router.post('/createuser',
    body('email').isEmail(),
    body('pass').isLength({min: 4, max: 32}),
    UserController.CreateUser)
router.post('/login', UserController.Login)
router.post('/logout', UserController.logout)

router.get("/confirm/:confirmationCode", UserController.VerifyUser)
router.get("/refresh", UserController.refresh)
router.get("/users", AuthMiddleware, UserController.GetUsers)






module.exports = router
