import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState("active");
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) =>
        console.error("There was an error fetching users!", error)
      );

    axios
      .get("http://localhost:3001/roles")
      .then((response) => setRoles(response.data))
      .catch((err) => {
        console.log("Could not fetch roles", err);
      });
  }, []);

  const handleEditClick = (user) => {
    if (adding) setAdding(false);
    setSelectedUser(user);
    setNewUser({ name: user.name, email: user.email, password: user.password });
    setStatus(user.status);
    setSelectedRoles(user.roles ? user.roles.map((role) => role._id) : []);
    setEditing(true);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const mapSelectedRolesToIds = () => {
    return selectedRoles.map((roleId) => {
      return roles.find((role) => role._id === roleId)?._id;
    });
  };

  const handleUpdate = () => {
    const updatedUser = {
      ...selectedUser,
      ...newUser,
      status,
      roles: mapSelectedRolesToIds(),
    };

    axios
      .put(`http://localhost:3001/users/${selectedUser?._id}`, updatedUser)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === response.data.user._id ? response.data.user : user
          )
        );
        setEditing(false);
      })
      .catch((error) =>
        console.error("There was an error updating the user!", error)
      );
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((error) =>
        console.error("There was an error deleting the user!", error)
      );
  };

  const handleAddClick = () => {
    if (editing) setEditing(false);
    setAdding(true);
    setNewUser({ name: "", email: "", password: "" });
    setSelectedRoles([]);
  };

  const handleAddUser = () => {
    const newUserWithRoles = {
      ...newUser,
      status,
      roles: mapSelectedRolesToIds(),
    };

    axios
      .post("http://localhost:3001/users", newUserWithRoles)
      .then((response) => {
        const newUserWithRoleNames = {
          ...response.data.user,
          roles: selectedRoles.map((roleId) => ({
            name: roles.find((role) => role._id === roleId)?.name,
          })),
        };
        setUsers([...users, newUserWithRoleNames]);

        setAdding(false);
        setNewUser({ name: "", email: "", password: "" });
        setSelectedRoles([]);
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  const handleRoleSelectChange = (selectedOptions) => {
    setSelectedRoles(
      selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    );
  };

  const roleOptions = roles.map((role) => ({
    value: role._id,
    label: role.name,
  }));

  return (
    <div className="user-container">
      <div style={{ position: "absolute", left: "35%", top: "50%" }}>
        {editing && (
          <div className="edit-container">
            <button className="close-btn" onClick={() => setEditing(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Edit User</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                style={{ width: "180px", height: "30px" }}
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleNewUserChange}
                required
              />
              <select
                value={status}
                onChange={handleStatusChange}
                style={{
                  width: "110px",
                  height: "40px",
                  cursor: "pointer",
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleNewUserChange}
            />

            {/* Roles Selection using react-select */}
            <div className="select-roles">
              <h5>Select Roles</h5>
              <Select
                isMulti
                value={roleOptions.filter((option) =>
                  selectedRoles.includes(option.value)
                )}
                onChange={handleRoleSelectChange}
                options={roleOptions}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#4caf50" : "#ffffff",
                    color: state.isSelected ? "#ffffff" : "#333333",
                    "&:hover": {
                      backgroundColor: "#c8e6c9",
                      color: "black",
                    },
                  }),
                }}
              />
            </div>

            <div className="btn">
              <button onClick={handleUpdate}>Update</button>
              <button className="cancel" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {adding && (
          <div className="edit-container">
            <button className="close-btn" onClick={() => setAdding(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Add New User</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleNewUserChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleNewUserChange}
              required
            />

            <div className="select-roles" style={{ marginTop: "1rem" }}>
              <h5>Select Roles</h5>
              <Select
                isMulti
                value={roleOptions.filter((option) =>
                  selectedRoles.includes(option.value)
                )}
                onChange={handleRoleSelectChange}
                options={roleOptions}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#4caf50" : "#ffffff",
                    color: state.isSelected ? "#ffffff" : "#333333",
                    "&:hover": {
                      backgroundColor: "#c8e6c9",
                      color: "black",
                    },
                  }),
                }}
              />
            </div>

            <div className="btn">
              <button onClick={handleAddUser}>Add User</button>
              <button className="cancel" onClick={() => setAdding(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr className="user-header">
            <th>Name</th>
            <th>Status</th>
            <th>Roles</th>
            <th>
              <FontAwesomeIcon
                icon={faPlus}
                className="addRole-icon"
                onClick={handleAddClick}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>
                {user.roles?.length
                  ? user.roles.map((role) => role.name).join(", ")
                  : ""}
              </td>
              <td className="icons">
                <FontAwesomeIcon
                  icon={faPen}
                  className="editRole-icon"
                  onClick={() => handleEditClick(user)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="deleteRole-icon"
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
