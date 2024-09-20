import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <button
      style={{
        textDecoration: "none",
        border:"none",
        backgroundColor: "transparent",
        color: "black",
        borderRadius: "4px"
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
