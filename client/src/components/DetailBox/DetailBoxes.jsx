import React from "react";
import DetailsBox from "./DetailsBoxComponent";
import "./detailBox.css";

export default function DetailBoxes() {
  return (
    <div className="boxes-flex">
      <DetailsBox
        icon={"bi bi-chat icon1"}
        boxHeading1="Number"
        boxHeading2="150GB"
        footerIcon={"bi bi-arrow-clockwise"}
        footerText="Update Now"
      />
      <DetailsBox
        icon={"bi bi-star icon2"}
        boxHeading1="Follwers"
        boxHeading2="+45k"
        footerIcon={"bi bi-activity"}
        footerText="Last Research"
      />
      <DetailsBox
        icon={"bi bi-person icon3"}
        boxHeading1="Users"
        boxHeading2="150,000"
        footerIcon={"bi bi-trophy"}
        footerText="Customers feedback"
      />
      <DetailsBox
        icon={"bi bi-hexagon icon4"}
        boxHeading1="Errors"
        boxHeading2="12"
        footerIcon={"bi bi-smartwatch"}
        footerText="In the last hours"
      />
    </div>
  );
}
