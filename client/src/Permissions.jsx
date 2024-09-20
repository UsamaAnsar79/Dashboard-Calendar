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

export default function Permissions() {
  const [permissions, setPermissions] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [newPermission, setNewPermission] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState("");

  // Fetch existing permissions from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/permissions")
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((err) => {
        console.log("Could not fetch permissions:", err);
      });
  }, []);

  // Modal
  const handleModalShow = (permission = "") => {
    setIsModalActive(true);
    setNewPermission(permission);
    setPermissionToEdit(permission);
    setEditMode(!!permission);
  };

  const handleModalClose = () => {
    setIsModalActive(false);
    setNewPermission("");
    setEditMode(false);
    setPermissionToEdit("");
  };

  // Save or Update Permission
  const handleSavePermission = () => {
    if (!newPermission) {
      alert("Please enter a permission");
      return;
    }

    if (editMode) {
      // Update existing permission
      axios
        .put("http://localhost:3001/updatePermission", {
          oldPermission: permissionToEdit,
          newPermission,
        })
        .then(() => {
          setPermissions(
            permissions.map((p) =>
              p.name === permissionToEdit ? { ...p, name: newPermission } : p
            )
          );
          handleModalClose();
        })
        .catch((err) => {
          console.log("Could not update permission:", err);
        });
    } else {
      // Add new permission
      axios
        .post("http://localhost:3001/addPermission", {
          permission: newPermission,
        })
        .then((response) => {
          setPermissions([
            ...permissions,
            { name: newPermission, active: true },
          ]);
          handleModalClose();
        })
        .catch((err) => {
          console.log("Could not add permission:", err);
        });
    }
  };

  // Delete Permission
  const handleDeletePermission = (permission) => {
    axios
      .delete("http://localhost:3001/deletePermission", {
        data: { permission: permission.name },
      })
      .then(() => {
        setPermissions(permissions.filter((p) => p.name !== permission.name));
      })
      .catch((err) => {
        console.log("Could not delete permission:", err);
      });
  };

  // Toggle permission (active/disabled)
  const handleTogglePermission = (permission) => {
    const updatedPermission = { ...permission, active: !permission.active };
    axios
      .put("http://localhost:3001/togglePermission", {
        permission: updatedPermission,
        active: updatedPermission.active,
      })
      .then(() => {
        setPermissions(
          permissions.map((p) =>
            p.name === permission.name ? { ...p, active: !p.active } : p
          )
        );
      })
      .catch((err) => {
        console.log("Could not toggle permission:", err);
      });
  };

  return (
    <div className="permissions-main">
      <div className="container permissions-container">
        <div className="row permissions-header">
          <div className="col-sm-5">Permissions</div>
          <div className="col-sm-4">Actions</div>
          <div className="col-sm-3">
            {/* Add permission button */}
            <FontAwesomeIcon
              icon={faPlus}
              className="addPermission-icon"
              onClick={() => handleModalShow()}
            />
          </div>
        </div>

        {permissions.length > 0 ? (
          permissions.map((permission, index) => (
            <div
              className={`row permission-content-display ${
                permission.active ? "active-permission" : "inactive-permission"
              }`}
              key={index}
            >
              <div className="col-sm-5 p-3">{permission.name}</div>
              <div className="col-sm-4 p-3 permission-actions">
                {/* Edit Permission */}
                <FontAwesomeIcon
                  icon={faPen}
                  className="editPermission-icon"
                  onClick={() => handleModalShow(permission.name)}
                  l
                />
                {/* Delete Permission */}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="deletePermission-icon"
                  onClick={() => handleDeletePermission(permission)}
                />
                {/* Toggle Permission Active/Inactive */}
                <FontAwesomeIcon
                  icon={permission.active ? faToggleOn : faToggleOff}
                  className="togglePermission-icon"
                  onClick={() => handleTogglePermission(permission)}
                  title={
                    permission.active
                      ? "Disable Permission"
                      : "Enable Permission"
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <p>No permissions found</p>
        )}
      </div>

      {/* Modal Popup for Adding or Editing Permission */}
      {isModalActive && (
        <div className="modal-permission">
          <div className="modal-header">
            <h5 className="modal-heading">
              {editMode ? "Edit Permission" : "Add Permission"}
            </h5>
            {/* Close Modal */}
            <FontAwesomeIcon
              icon={faTimes}
              className="permission-modal-close"
              onClick={handleModalClose}
            />
          </div>
          <div className="modal-content">
            <div className="modal-container">
              <h5>Permission:</h5>
              <input
                type="text"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-save-permission">
            <button onClick={handleSavePermission}>
              {editMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
