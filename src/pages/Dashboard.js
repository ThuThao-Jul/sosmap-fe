import React from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const DashboardPage = () => {
  return (
    <>
      <h1>This is Dashboard</h1>
      <div className="App">
        Hi
        <PieChart></PieChart>
        
      </div>

      <BarChart></BarChart>

    </>
  );
};

export default DashboardPage;
