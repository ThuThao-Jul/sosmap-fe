import React from "react";

import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#F7464A",
        `rgba(0, 148, 247, 0.7)`,
        "rgba(247, 222, 0, 0.7)",
        `#46BFBD`,
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => (
  <>
    <div className="header">
      <h1 className="title">Pie Chart</h1>
    </div>
    <Pie
      data={data}
      style={{ border: "1px solid black", width: "50%", objectFit: "contain" }}
    />
  </>
);

export default PieChart;
