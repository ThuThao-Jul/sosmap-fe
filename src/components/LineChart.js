import { Table } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import api from "../redux/axios";

const LineChart = () => {
  const [tickets, setTickets] = useState([]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Not Processed",
      dataIndex: "notprocessed",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 1,
      },
    },
    {
      title: "In Progress",
      dataIndex: "inprogress",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 1,
      },
    },
    {
      title: "Done",
      dataIndex: "done",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];

  const tableData = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
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
        backgroundColor: ["#F7464A"],
        borderColor: ["#F7464A"],
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
        backgroundColor: ["rgba(255, 208, 0, 1)"],
        borderColor: ["rgba(255, 208, 0, 1)"],
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
        backgroundColor: ["#46BFBD"],
        borderColor: ["#46BFBD"],
        borderWidth: 1,
      },
    ],
  };
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
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
      <Container
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="header"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h1 className="title">Tickets Requested Per Date</h1>
        </div>
        <Row style={{ width: "100%" }}>
          <Col lg={4}>
            {" "}
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              onChange={onChange}
            />{" "}
          </Col>
          <Col lg={8}>
            <div className="header" style={{ border: "1px solid black" }}>
              <Line data={data} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LineChart;
