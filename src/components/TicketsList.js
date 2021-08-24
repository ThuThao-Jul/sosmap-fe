import React from "react";
import { useState, useEffect } from "react";
import api from "../redux/axios";
import { Card, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Divider, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ticketActions } from "../redux/actions/ticket.action";

const TicketsList = () => {
  const ticketList = useSelector((state) => state.tickets.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ticketActions.getTickets());
  }, []);
  return (
    <Row>
      {ticketList &&
        ticketList.map((t, index) => (
          <Col style={{ marginBottom: "40px" }}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{t.name}</Card.Title>
                <Card.Text>Address: {t.address}</Card.Text>
                <Card.Text>Area: {t.district}</Card.Text>
                <Divider></Divider>
                <Card.Text>
                  In need:
                  {t.items.map((items) => (
                    <li>
                      {items.name}:{" "}
                      {items.name === "Mì Gói" ? (
                        <span>{items.quantity + " thùng"}</span>
                      ) : items.name === "Trứng" ? (
                        <span>{items.quantity + " vỉ"}</span>
                      ) : items.name === "Gạo" ? (
                        <span>{items.quantity + " kg"}</span>
                      ) : items.name === "Sữa" ? (
                        <span>{items.quantity + " lốc"}</span>
                      ) : items.name === "Quần Áo" ? (
                        <span>{items.quantity + " bộ"}</span>
                      ) : (
                        <span>{items.quantity + " chai"}</span>
                      )}
                    </li>
                  ))}
                </Card.Text>
                <Card.Text>Priority: {t.priority.toUpperCase()}</Card.Text>
                <Card.Text>
                  {" "}
                  {t.status === "not processed" ? (
                    <Tag color="#F7464A">{t.status.toUpperCase()}</Tag>
                  ) : t.status === "in progress" ? (
                    <Tag color="rgba(255, 208, 0, 1)">
                      {t.status.toUpperCase()}
                    </Tag>
                  ) : (
                    <Tag color="#46BFBD">{t.status.toUpperCase()}</Tag>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default TicketsList;
