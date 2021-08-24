import React from "react";
import { useState, useEffect } from "react";
import api from "../redux/axios";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { link } from "fs";

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
                <Card.Text>Địa Chỉ: {t.address}</Card.Text>
                <Card.Text>Khu vực: {t.district}</Card.Text>
                <Card.Text>
                  Đồ cần nhận:
                  {t.items.map((items) => (
                    <li>
                      {items.name}:{" "}
                      {items.name == "Mì Gói" ? (
                        <span>{items.quantity + " thùng"}</span>
                      ) : items.name == "Trứng" ? (
                        <span>{items.quantity + " vỉ"}</span>
                      ) : items.name == "Gạo" ? (
                        <span>{items.quantity + " kg"}</span>
                      ) : items.name == "Sữa" ? (
                        <span>{items.quantity + " lốc"}</span>
                      ) : items.name == "Quần Áo" ? (
                        <span>{items.quantity + " bộ"}</span>
                      ) : (
                        <span>{items.quantity + " chai"}</span>
                      )}
                    </li>
                  ))}
                </Card.Text>
                <Card.Text>Độ ưu tiên: {t.priority}</Card.Text>
                <Card.Text>Tình trạng: {t.status}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default TicketsList;
