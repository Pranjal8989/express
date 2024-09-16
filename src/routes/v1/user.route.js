const express = require("express");
const userController = require("../../controller/user.controller");
const router = express.Router();

router.route("/").get(userController.getUser);
router.route("/:id").get(userController.getUserById);
router.route("/:id").put(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);
router.route("/").post(userController.createUser);

module.exports = router;
