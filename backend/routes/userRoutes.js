// backend/routes/userRoutes.js

const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controller/userController");

const router = express.Router();

router.route("/").get(allUsers).post(registerUser);

// router.route('/login').get(() => {}).post()
router.post("/login", authUser);

module.exports = router;
