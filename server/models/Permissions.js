
const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Permission", PermissionSchema);

