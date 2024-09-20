import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import "./threeComponents.css";

export default function Grouped() {
  return (
    <div className="grouped-components">
      <Chart1 />
      <Chart2 />
      <Chart3 />
    </div>
  );
}
