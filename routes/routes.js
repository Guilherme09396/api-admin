const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const Auth = require("../middlewares/Auth")


router.get('/', HomeController.index);
router.post("/user", Auth, UserController.create);
router.post("/user/login", UserController.login)
router.get("/user", Auth, UserController.findAll);
router.get("/user/:id", Auth, UserController.findById);
router.put("/user/:id", Auth, UserController.update);
router.delete("/user/:id", Auth, UserController.delete);
router.post("/user/recovery/:link", UserController.recovery);
router.post("/user/recovery/confirm/:token", UserController.recoveryConfirm)
router.get("/auth", Auth, HomeController.index);


module.exports = router;