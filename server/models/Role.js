const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  permissions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'permissions'
  }]
});

module.exports = mongoose.model("Role", RoleSchema);

