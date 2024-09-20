import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faToggleOn,
  faToggleOff,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => {
        console.log("Could not fetch roles:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/rolePermissions")
      .then((response) => {
        setPermissions(
          response.data.map((p) => ({ label: p.name, value: p._id })) 
        );
      })
      .catch((err) => {
        console.log("Could not fetch permissions:", err);
      });
  }, []);

  // Modal
  const handleModalShow = (role = "") => {
    setIsModalActive(true);
    setNewRole(role.name || "");
    setRoleToEdit(role.name || "");
    setEditMode(!!role.name);
    setSelectedPermissions(
      role.permissions
        ? permissions.filter((p) => role.permissions.includes(p.value))
        : []
    );
  };

  const handleModalClose = () => {
    setIsModalActive(false);
    setNewRole("");
    setEditMode(false);
    setRoleToEdit("");
    setSelectedPermissions([]);
  };

  // Save or Update Role
  const handleSaveRole = () => {
    if (!newRole) {
      alert("Please enter a role");
      return;
    }

    const payload = {
      role: newRole,
      permissions: selectedPermissions.map((p) => p.value),
    };

    if (editMode) {
      axios
        .put("http://localhost:3001/updateRole", {
          oldRole: roleToEdit,
          newRole,
          permissions: payload.permissions,
        })
        .then(() => {
          setRoles(
            roles.map((r) =>
              r.name === roleToEdit
                ? { ...r, name: newRole, permissions: payload.permissions }
                : r
            )
          );
          handleModalClose();
        })
        .catch((err) => {
          console.log("Could not update role:", err);
        });
    } else {
      // Add new role
      axios
        .post("http://localhost:3001/addRole", payload)
        .then(() => {
          setRoles([
            ...roles,
            { name: newRole, active: true, permissions: payload.permissions },
          ]);
          handleModalClose();
        })
        .catch((err) => {
          console.log("Could not add role:", err);
        });
    }
  };

  // Delete Role
  const handleDeleteRole = (role) => {
    axios
      .delete("http://localhost:3001/deleteRole", {
        data: { role: role.name },
      })
      .then(() => {
        setRoles(roles.filter((r) => r.name !== role.name));
      })
      .catch((err) => {
        console.log("Could not delete role:", err);
      });
  };

  // Toggle role
  const handleToggleRole = (role) => {
    const updatedRole = { ...role, active: !role.active };
    axios
      .put("http://localhost:3001/toggleRole", {
        role: updatedRole,
        active: updatedRole.active,
      })
      .then(() => {
        setRoles(
          roles.map((r) =>
            r.name === role.name ? { ...r, active: !r.active } : r
          )
        );
      })
      .catch((err) => {
        console.log("Could not toggle role:", err);
      });
  };

  return (
    <div className="roles-main">
      <div className="container roles-container">
        <div className="row roles-header">
          <div className="col-sm-4">Roles</div>
          <div className="col-sm-4">Permissions</div>
          <div className="col-sm-3">&nbsp;Actions</div>
          <div className="col-sm-1">
            {/* Add role button */}
            <FontAwesomeIcon
              icon={faPlus}
              className="addRole-icon"
              onClick={() => handleModalShow()}
            />
          </div>
        </div>

        {roles.length > 0 ? (
          roles.map((role, index) => (
            <div
              className={`row role-content-display ${
                role.active ? "active-role" : "inactive-role"
              }`}
              key={index}
            >
              <div className="col-sm-4 p-3">{role.name}</div>
              <div className="col-sm-4 p-3">
                {role.permissions && role.permissions.length > 0
                  ? role.permissions
                      .map((pId) => {
                        const perm = permissions.find((p) => p.value === pId);
                        return perm ? perm.label : null;
                      })
                      .filter(Boolean)
                      .join(", ")
                  : "No permissions"}
              </div>
              <div className="col-sm-4 p-3 role-actions">
                {/* Edit Role */}
                <FontAwesomeIcon
                  icon={faPen}
                  className="editRole-icon"
                  onClick={() => handleModalShow(role)}
                />
                {/* Delete Role */}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="deleteRole-icon"
                  onClick={() => handleDeleteRole(role)}
                />
                {/* Toggle Role Active/Inactive */}
                <FontAwesomeIcon
                  icon={role.active ? faToggleOn : faToggleOff}
                  className="toggleRole-icon"
                  onClick={() => handleToggleRole(role)}
                  title={role.active ? "Disable Role" : "Enable Role"}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No roles found</p>
        )}
      </div>

      {isModalActive && (
        <div className="modal-role">
          <div className="modal-header">
            <h5 className="modal-heading">
              {editMode ? "Edit Role" : "Add Role"}
            </h5>
            <FontAwesomeIcon
              icon={faTimes}
              className="role-modal-close"
              onClick={handleModalClose}
            />
          </div>
          <div className="modal-content">
            <div className="modal-container">
              <div>
                <h5>Role</h5>
                <input
                  className="role-input"
                  type="text"
                  value={newRole}
                  placeholder="Add role..."
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h5>Select permissions</h5>
                <Select
                  isMulti
                  options={permissions}
                  value={selectedPermissions}
                  onChange={setSelectedPermissions}
                  placeholder="Select permissions..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "20rem",
                      marginLeft: "1rem",
                      border: "1px solid #1f8ef1",
                      borderRadius: "5px",
                      outline: "none",
                      cursor: "pointer",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="modal-save-role">
            <button onClick={handleSaveRole}>
              {editMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
