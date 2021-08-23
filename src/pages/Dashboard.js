import React from "react";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

const DashboardPage = () => {
  return (
    <>
      <h1>This is Dashboard</h1>
      <div className="App">
        Hi
        <PieChart></PieChart>
        <LineChart></LineChart>
      </div>
    </>
  );
};

export default DashboardPage;
