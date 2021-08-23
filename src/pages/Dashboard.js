import React from "react";
import PieChart from "../components/PieChart";
import PieChartStatus from "../components/PieChartStatus";

const DashboardPage = () => {
  return (
    <>
      <h1>This is Dashboard</h1>
      <div className="App">
        Hi
        <PieChart></PieChart>
        <PieChartStatus></PieChartStatus>
      </div>
    </>
  );
};

export default DashboardPage;
