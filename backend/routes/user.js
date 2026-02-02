const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.delete("/delete/:id", UserController.deleteUser);
router.put("/update/:id", UserController.updateUser);
router.get("/get-user-list", UserController.getAllUsers);
router.put("/update-password/:id", UserController.changePassword)

module.exports = router;