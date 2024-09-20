import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { color } from "chart.js/helpers";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Chart1() {
  const data = {
    labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
    datasets: [
      {
        data: [53, 20, 10, 80, 100, 45],
        backgroundColor: "transparent",
        borderColor: "#d62cd3",
        borderWidth: 2,
        tension: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          //   display: false,
          color: "#823a8128",
        },
      },
      y: {
        min: 0,
        max: 120,
        border: {
          display: false,
        },
        grid: {
          //   display: false,
          color: "#823a8128",
        },
        ticks: {
          stepSize: 20,
        },
      },
    },
  };
  return (
    <div className="component">
      <div className="component-header">
        <h5 className="component-heading">Daily Sales</h5>
        <div className="component-detail">
          <i class="bi bi-truck chart-2-icon"></i>
          <h3>3500€ </h3>
        </div>
      </div>
      <div className="components-chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
