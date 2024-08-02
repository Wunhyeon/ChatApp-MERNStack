// backend/models/userModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  console.log("enterPassword : ", enterPassword);
  console.log("this.password : ", this.password);
  return await bcrypt.compare(enterPassword, this.password);
};

// userSchema.methods.matchPassword = async (enterPassword, user) => {
//   console.log("enterPassword : ", enterPassword);
//   console.log("this.password : ", user.password);
// return await bcrypt.compare(enterPassword, this.password);
// };

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  console.log("next : ", next);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("@@@@@ password : ", this.password);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
