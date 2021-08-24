import React, { useEffect, useState } from "react";
import api from "../redux/axios";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const [tickets, setTickets] = useState([]);
  const [eggs, setEgg] = useState(0);
  const [noodle, setNoodle] = useState(0);
  const [cloth, setCloth] = useState(0);
  const [oil, setOil] = useState(0);

  const getTickets = async () => {
    try {
      const res = await api.get("/ticket");
      const tickets = res.data.data;
      setTickets(tickets);
      let sumeggs = 0;
      const egg = tickets.map((t) =>
        t.items.map((i) =>
          i.name == "Trứng" && i.quantity > 0
            ? (sumeggs += i.quantity)
            : (sumeggs += 0)
        )
      );
      setEgg(sumeggs);

      let sumNoodle = 0;
      const noodle = tickets.map((t) =>
        t.items.map((i) =>
          i.name == "Mì Gói" && i.quantity > 0
            ? (sumNoodle += i.quantity)
            : (sumNoodle += 0)
        )
      );
      setNoodle(sumNoodle);

      let sumOil = 0;
      const oil = tickets.map((t) =>
        t.items.map((i) =>
          i.name == "Dầu Ăn" && i.quantity > 0
            ? (sumOil += i.quantity)
            : (sumOil += 0)
        )
      );
      setOil(sumOil);

      let sumCloth = 0;
      const cloth = tickets.map((t) =>
        t.items.map((i) =>
          i.name == "Quần Áo" && i.quantity
            ? (sumCloth += i.quantity)
            : (sumCloth += 0)
        )
      );
      setCloth(sumCloth);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => getTickets(), []);

  const data = {
    labels: ["Mì Gói", "Trứng", "Dầu Ăn", "Quần Áo"],
    datasets: [
      {
        label: "# of Votes",
        data: [noodle, eggs, oil, cloth],
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

  return (
    <>
      <div className="header">
        <h1 className="title">Pie Chart</h1>
      </div>

      <div style={{ width: "30vw", border: "1px solid black" }}>
        <Pie data={data} />
      </div>
    </>
  );
};

export default PieChart;
