import React from "react";
import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Divider, Tag, Select, Button } from "antd";
import tagRender from "./TagRender";
import { useDispatch, useSelector } from "react-redux";
import { ticketActions } from "../redux/actions/ticket.action";

const optionsStatus = [
  { value: "gold", label: "NOT PROCESSED" },
  { value: "lime", label: "IN PROGRESS" },
  { value: "green", label: "DONE" },
];
const optionsPriority = [
  { value: "gold", label: "HIGH" },
  { value: "lime", label: "MEDIUM" },
  { value: "green", label: "LOW" },
];
const { Option } = Select;

const TicketsList = () => {
  const ticketList = useSelector((state) => state.tickets.data);
  const [filter, setFilter] = useState({ status: [], priority: [], area: [] });
  const [dataFilter, setDataFilter] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ticketActions.getTickets());
  }, []);

  const children = [];
  for (let i = 1; i <= 10; i++) {
    children.push(<Option key={"Quận " + i}>{"Quận " + i}</Option>);
  }

  const handleChange = (value) => {
    setFilter({ ...filter, area: value });
  };

  const handleStatus = (value, label) => {
    setFilter({ ...filter, status: label.map((l) => l.label.toLowerCase()) });
  };

  const handlePriority = (value, label) => {
    setFilter({ ...filter, priority: label.map((l) => l.label.toLowerCase()) });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const x = ticketList.filter(
      (t) =>
        (filter.status.length > 0 ? filter.status.includes(t.status) : true) &&
        (filter.priority.length > 0
          ? filter.priority.includes(t.priority)
          : true) &&
        (filter.area.length > 0 ? filter.area.includes(t.district) : true)
    );

    setDataFilter(x);
  };

  console.log(filter);
  console.log(dataFilter);
  return (
    <Row>
      <Row
        style={{
          border: "1px solid gray",
          marginTop: "3%",
          marginBottom: "3%",
          borderRadius: "5px",
        }}
      >
        <Col>
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            style={{ width: "90%", margin: "3%" }}
            options={optionsStatus}
            placeholder="Choose status"
            onChange={handleStatus}
          />
        </Col>
        <Col>
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            style={{ width: "90%", margin: "3%" }}
            options={optionsPriority}
            placeholder="Choose priority"
            onChange={handlePriority}
          />
        </Col>
        <Col>
          <Select
            mode="tags"
            style={{ width: "90%", margin: "3%" }}
            placeholder="Choose area to search"
            onChange={handleChange}
          >
            {children}
          </Select>
        </Col>
        <Button
          type="primary"
          style={{ width: "10%", margin: "0.8%" }}
          onClick={handleFilter}
        >
          OK
        </Button>
      </Row>
      {(dataFilter.length > 0 ? dataFilter : ticketList) &&
        (dataFilter.length > 0 ? dataFilter : ticketList).map((t, index) => (
          <Col style={{ marginBottom: "40px" }}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{t.name}</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  Address: {t.address}, {t.district}
                </Card.Text>
                <Divider></Divider>
                <Card.Text style={{ fontStyle: "italic" }}>
                  Items list:
                </Card.Text>
                <Card.Text>
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
