import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../redux/axios";

const LineChart = () => {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
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
  const [tickets, setTickets] = useState([]);
  const [notProcessed, setNotProcessed] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const getTickets = async () => {
    const res = await api.get("/ticket");
    const tickets = res.data.data;
    setTickets(tickets);
    const done = tickets.filter((ticket) => ticket.status == "done");
    setDone(done);
  };
  useEffect(() => {
    getTickets();
  }, []);
  console.log(tickets);
  console.log(done);
  return (
    <>
      <div className="header">
        <h1 className="title">Pie Chart</h1>
      </div>

      <div style={{ width: "30vw", border: "1px solid black" }}>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChart;
