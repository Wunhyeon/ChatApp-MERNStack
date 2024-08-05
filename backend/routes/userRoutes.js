// backend/routes/userRoutes.js

const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers).post(registerUser);

// router.route('/login').get(() => {}).post()
router.post("/login", authUser);

module.exports = router;
