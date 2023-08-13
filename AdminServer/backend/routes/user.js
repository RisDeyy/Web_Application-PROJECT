const userController = require("../controllers/userController");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyToken, userController.getAllUsers);

//DELETE USER
router.delete("/:id", verifyToken,userController.deleteUser);
//UPDATE EMAIL
router.post("/UpdateEmail",verifyToken,userController.updateEmail)
router.post("/UpdatePassword",verifyToken,userController. updatePassword)
module.exports = router;