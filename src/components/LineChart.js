import React, { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../redux/axios";

const LineChart = () => {
  const [tickets, setTickets] = useState(0);
  const [notProcessed, setNotProcessed] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  });
  const [inProgress, setInProgress] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  });
  const [done, setDone] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  });
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
        label: "Not Processed",
        data: [
          notProcessed.monday,
          notProcessed.tuesday,
          notProcessed.wednesday,
          notProcessed.thursday,
          notProcessed.friday,
          notProcessed.saturday,
          notProcessed.sunday,
        ],
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
        label: "In Progress",
        data: [
          inProgress.monday,
          inProgress.tuesday,
          inProgress.wednesday,
          inProgress.thursday,
          inProgress.friday,
          inProgress.saturday,
          inProgress.sunday,
        ],
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
        label: "Done",
        data: [
          done.monday,
          done.tuesday,
          done.wednesday,
          done.thursday,
          done.friday,
          done.saturday,
          done.sunday,
        ],
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
  const getTickets = async () => {
    const res = await api.get("/ticket");
    const tickets = res.data.data;
    setTickets(tickets);
    const doneDate = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
    };
    const notProcessedDate = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
    };
    const inProgressDate = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
    };
    const done = tickets.filter((ticket) => ticket.status === "done");
    done.forEach((ticket) => {
      switch (ticket.date) {
        case "Monday":
          doneDate.monday++;
          break;
        case "Tuesday":
          doneDate.tuesday++;
          break;
        case "Wednesday":
          doneDate.wednesday++;
          break;
        case "Thursday":
          doneDate.thursday++;
          break;
        case "Friday":
          doneDate.friday++;
          break;
        case "Saturday":
          doneDate.saturday++;
          break;
        case "Sunday":
          doneDate.sunday++;
          break;
        default:
          break;
      }
    });
    const inProgress = tickets.filter(
      (ticket) => ticket.status === "in progress"
    );
    inProgress.forEach((ticket) => {
      switch (ticket.date) {
        case "Monday":
          inProgressDate.monday++;
          break;
        case "Tuesday":
          inProgressDate.tuesday++;
          break;
        case "Wednesday":
          inProgressDate.wednesday++;
          break;
        case "Thursday":
          inProgressDate.thursday++;
          break;
        case "Friday":
          inProgressDate.friday++;
          break;
        case "Saturday":
          inProgressDate.saturday++;
          break;
        case "Sunday":
          inProgressDate.sunday++;
          break;
        default:
          break;
      }
    });
    const notProcessed = tickets.filter(
      (ticket) => ticket.status === "not processed"
    );
    notProcessed.forEach((ticket) => {
      switch (ticket.date) {
        case "Monday":
          notProcessedDate.monday++;
          break;
        case "Tuesday":
          notProcessedDate.tuesday++;
          break;
        case "Wednesday":
          notProcessedDate.wednesday++;
          break;
        case "Thursday":
          notProcessedDate.thursday++;
          break;
        case "Friday":
          notProcessedDate.friday++;
          break;
        case "Saturday":
          notProcessedDate.saturday++;
          break;
        case "Sunday":
          notProcessedDate.sunday++;
          break;
        default:
          break;
      }
    });
    setNotProcessed(notProcessedDate);
    setInProgress(inProgressDate);
    setDone(doneDate);
  };
  useEffect(() => {
    getTickets();
  }, []);
  console.log(tickets);
  console.log(done);
  console.log(inProgress);
  console.log(notProcessed);
  return (
    <>
      <div className="header">
        <h1 className="title">Pie Chart</h1>
      </div>

      <div style={{ width: "50vw", border: "1px solid black" }}>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChart;
