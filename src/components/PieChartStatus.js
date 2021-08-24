import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import { Col, Row, Table } from "antd";
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
        label: "Status",
        data: [notProcessed.length, inProgress.length, done.length],
        backgroundColor: ["#F7464A", "#46BFBD", "rgba(255, 208, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const columns = [
    { title: "Status", dataIndex: "name", align: "center" },
    { title: "Total Tickets", dataIndex: "dataIndex", align: "center" },
  ];
  // Number of keys (row)
  const tableArray = [1, 2, 3];
  const statusArray = ["Not Processed", "In Progress", "Done"];
  const totalStatus = [notProcessed.length, inProgress.length, done.length];

  const tableData = tableArray.map((data, index) => {
    let tableResult = {
      key: data,
      name: statusArray[index],
      dataIndex: totalStatus[index],
    };
    return tableResult;
  });

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
          <h1 className="title">Tickets Status</h1>
        </div>
        <Row>
          <Col
            lg={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Table
              size={"medium"}
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          </Col>
          <Col>
            <div style={{ width: "25vw", border: "1px solid black" }}>
              <Pie data={data} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PieChartStatus;
