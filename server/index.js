const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Permission = require("./models/Permissions");
const Role = require("./models/Role");
const UserModel = require("./models/User");
const eventRoutes = require("./eventRoutes");
const Notification = require('./models/Notification');

const generateJWT = require("./utils/generateJWT");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

mongoose
  .connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No record existed", status: "error" });
    }
    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: "The password is incorrect.", status: "error" });
    }
    const token = generateJWT(user);
    // Send status along with other details
    res.json({
      token,
      userId: user._id,
      status: user.status,
      name: user.name,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", status: "error" });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  const { name, email, password, permissions, roles, status } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({
      name,
      email,
      password,
      permissions,
      roles,
      status,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find().populate("roles");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  const { name, email, password, permissions, roles, status } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password, permissions, roles, status },
      { new: true }
    ).populate("roles");
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Fetch all roles
app.get("/roles", async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

// Add a new role
app.post("/addRole", async (req, res) => {
  const { role,permissions } = req.body;
  if (!role) return res.status(400).json({ error: "Role name is required" });

  try {
    const newRole = new Role({ name: role  ,permissions });
    await newRole.save();
    res.status(201).json({ message: "Role added successfully", role: newRole });
  } catch (err) {
    res.status(500).json({ error: "Failed to add role" });
  }
});

// Update an existing role
app.put("/updateRole", async (req, res) => {
  const { oldRole, newRole,permissions } = req.body;
  if (!oldRole || !newRole)
    return res
      .status(400)
      .json({ error: "Old and new role names are required" });

  try {
    const role = await Role.findOneAndUpdate({ name: oldRole }, 
      { name: newRole, permissions },
      { new: true });
    if (!role) return res.status(404).json({ error: "Role not found" });

    role.name = newRole;
    await role.save();
    res.json({ message: "Role updated successfully", role });
  } catch (err) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

// Delete a role
app.delete("/deleteRole", async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ error: "Role name is required" });

  try {
    const deletedRole = await Role.findOneAndDelete({ name: role });
    if (!deletedRole) return res.status(404).json({ error: "Role not found" });

    res.json({ message: "Role deleted successfully", role: deletedRole });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete role" });
  }
});

// Toggle role active/inactive
app.put("/toggleRole", async (req, res) => {
  const { role, active } = req.body;
  if (!role || typeof active === "undefined")
    return res
      .status(400)
      .json({ error: "Role and active status are required" });

  try {
    const roleToUpdate = await Role.findOne({ name: role.name });
    if (!roleToUpdate) return res.status(404).json({ error: "Role not found" });

    roleToUpdate.active = active;
    await roleToUpdate.save();
    res.json({ message: "Role status updated", role: roleToUpdate });
  } catch (err) {
    res.status(500).json({ error: "Failed to update role status" });
  }
});
// Get Permissions for Role Section
app.get("/rolePermissions", async (req, res) => {
  try {
    const activePermissions = await Permission.find({ active: true });
    res.json(activePermissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Fetch all permissions
app.get("/permissions", (req, res) => {
  Permission.find()
    .then((permissions) => res.json(permissions))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Add a new permission
app.post("/addPermission", (req, res) => {
  const { permission } = req.body;
  const newPermission = new Permission({ name: permission });

  newPermission
    .save()
    .then(() => res.json("Permission added successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Update an existing permission
app.put("/updatePermission", (req, res) => {
  const { oldPermission, newPermission } = req.body;

  Permission.findOneAndUpdate(
    { name: oldPermission },
    { $set: { name: newPermission } },
    { new: true }
  )
    .then((updatedPermission) => res.json("Permission updated successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete a permission
app.delete("/deletePermission", (req, res) => {
  const { permission } = req.body;

  Permission.findOneAndDelete({ name: permission })
    .then(() => res.json("Permission deleted successfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Toggle permission (active/disabled)
app.put("/togglePermission", (req, res) => {
  const { permission, active } = req.body;

  Permission.findOneAndUpdate(
    { name: permission.name },
    { $set: { active: active } },
    { new: true }
  )
    .then(() => res.json("Permission status updated"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.get('/notifications', async (req, res) => {
  const userId = req.query.user; 
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch all notifications for the user
    const notifications = await Notification.find({ user: userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications", details: err.message });
  }
});
app.put('/notifications/:id', async (req, res) => {
  const { id } = req.params;
  const { read } = req.body; // Expecting 'read' status to update

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({
      message: "Notification updated successfully",
      notification: updatedNotification,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification", details: err.message });
  }
});

app.use("/events", eventRoutes);

app.listen(3001, () => {
  console.log("Server is running");
});
