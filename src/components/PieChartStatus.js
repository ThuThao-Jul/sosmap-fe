import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import api from "../redux/axios";

const PieChartStatus = () => {
  // const [status, setStatus] = useState([]);
  const [notProcessed, setNotProcessed] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const getStatusDetail = async () => {
      try {
        const result = await api.get(`/ticket`);
        const status = result.data.data;
        const doneStatus = status.filter(
          (status) => status.status === "Hoàn Thành"
        );
        console.log("done", doneStatus);
        const inProgressStatus = status.filter(
          (status) => status.status === "Đang gửi"
        );
        console.log("inProgress", inProgressStatus);
        const notProcessedStatus = status.filter(
          (status) => status.status === "Chưa gửi"
        );
        console.log("notProcessed", notProcessedStatus);
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
    labels: ["Chưa gửi", "Đang gửi", "Hoàn thành"],
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
        <h1 className="title">Tình trạng các phiếu hỗ trợ</h1>
      </div>
      <div style={{ width: "30vw", border: "1px solid black" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChartStatus;
