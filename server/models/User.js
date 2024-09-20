
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'rejected', 'inactive'],
    default: 'pending'
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role', 
    },
  ],
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
