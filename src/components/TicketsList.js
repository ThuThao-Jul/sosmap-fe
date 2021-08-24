import React from "react";
import { useState, useEffect } from "react";
import api from "../redux/axios";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TicketsList = () => {
  const [ticketList, setTicketList] = useState();
  useEffect(() => {
    const ticketDetail = async () => {
      try {
        const res = await api.get("/ticket");
        const data = res.data.data;
        console.log("Ticket:", data);
        setTicketList(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    ticketDetail();
  }, []);
  return (
    <div>
      {ticketList &&
        ticketList.map((t, index) => (
          <div>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  {index + 1}: {t.name}
                </Card.Title>
                <Card.Text>Address: {t.address}</Card.Text>
                <Card.Text>Area: {t.district}</Card.Text>
                <Card.Text>
                  In need:
                  {t.items.map((items) => (
                    <li>
                      {items.name}:{" "}
                      {items.name === "Mì Gói" ? (
                        <span>{items.quantity + " box"}</span>
                      ) : items.name === "Trứng" ? (
                        <span>{items.quantity + " blister"}</span>
                      ) : items.name === "Gạo" ? (
                        <span>{items.quantity + " kg"}</span>
                      ) : items.name === "Sữa" ? (
                        <span>{items.quantity + " package"}</span>
                      ) : items.name === "Quần Áo" ? (
                        <span>{items.quantity + " set"}</span>
                      ) : (
                        <span>{items.quantity + " bottle"}</span>
                      )}
                    </li>
                  ))}
                </Card.Text>
                <Card.Text>Priority: {t.priority}</Card.Text>
                <Card.Text>Status: {t.status}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default TicketsList;
