import { Col, Row, Table } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { ticketActions } from "../redux/actions/ticket.action";
import api from "../redux/axios";

const LineChart = () => {
  const tickets = useSelector((state) => state.tickets.data);
  const dispatch = useDispatch();
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
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Not Processed",
      dataIndex: "notprocessed",
      align: "center",
      width: "20px",
      sorter: {
        compare: (a, b) => a.notprocessed - b.notprocessed,
        multiple: 1,
      },
    },
    {
      title: "In Progress",
      dataIndex: "inprogress",
      align: "center",
      width: "10px",

      sorter: {
        compare: (a, b) => a.inprogress - b.inprogress,
        multiple: 1,
      },
    },
    {
      title: "Done",
      dataIndex: "done",
      align: "center",
      sorter: {
        compare: (a, b) => a.done - b.done,
        multiple: 1,
      },
    },
  ];
  const dateArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const tableArray = ["1", "2", "3", "4", "5", "6", "7"];
  const tableData = tableArray.map((data, idx) => {
    let result = {
      key: data,
      date: dateArray[idx],
      notprocessed: notProcessed[dateArray[idx].toLowerCase()],
      inprogress: inProgress[dateArray[idx].toLowerCase()],
      done: done[dateArray[idx].toLowerCase()],
    };
    return result;
  });

  const data = {
    labels: dateArray,
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
  const getTickets = () => {
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
    dispatch(ticketActions.getTickets());
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
          <Col lg={8} style={{ display: "flex", alignItems: "center" }}>
            <Table
              size={"small"}
              columns={columns}
              dataSource={tableData}
              pagination={false}
              onChange={onChange}
            />
          </Col>
          <Col md={0} lg={1}></Col>
          <Col lg={15}>
            <div className="header" style={{ border: "1px solid black" }}>
              <Line responsive={true} data={data} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LineChart;
