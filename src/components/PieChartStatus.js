import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import api from "../redux/axios";

const PieChartStatus = () => {
  const [notProcessed, setNotProcessed] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const getStatusDetail = async () => {
      try {
        const result = await api.get(`/ticket`);
        const status = result.data.data;
        const doneStatus = status.filter((status) => status.status === "done");
        console.log("done", doneStatus);
        const inProgressStatus = status.filter(
          (status) => status.status === "in progress"
        );

        const notProcessedStatus = status.filter(
          (status) => status.status === "not processed"
        );

        setDone(doneStatus);
        setInProgress(inProgressStatus);
        setNotProcessed(notProcessedStatus);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getStatusDetail();
  }, []);
  const data = {
    labels: ["not processed", "in progress", "done"],
    datasets: [
      {
        label: "Tình Trạng",
        data: [notProcessed.length, inProgress.length, done.length],
        backgroundColor: ["#F7464A", "#46BFBD", "rgba(247, 222, 0, 0.7)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {" "}
      <div className="header">
        <h1 className="title">Tickets Status</h1>
      </div>
      <div style={{ width: "30vw", border: "1px solid black" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChartStatus;
