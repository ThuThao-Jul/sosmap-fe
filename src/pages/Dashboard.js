import React from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import PieChartStatus from "../components/PieChartStatus";

const DashboardPage = () => {
  return (
    <>
      <h1>This is Dashboard</h1>
      <div className="App">
        Hi
        <PieChart></PieChart>
        <LineChart></LineChart>
        <PieChartStatus></PieChartStatus>
        <BarChart></BarChart>
      </div>

      

    </>
  );
};

export default DashboardPage;
