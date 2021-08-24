import React, { useEffect, useState } from "react";
import api from "../redux/axios";
import { Pie } from "react-chartjs-2";


const PieChart = () => {
  const [tickets, setTickets] = useState([]) 
  // Type: receive
  const [eggs, setEgg] = useState(0)
  const [noodle, setNoodle] = useState(0)
  const [cloth, setCloth] = useState(0)
  const [oil, setOil] = useState(0)

  // Type: send
  const [eggsS, setEggS] = useState(0)
  const [noodleS, setNoodleS] = useState(0)
  const [clothS, setClothS] = useState(0)
  const [oilS, setOilS] = useState(0)

  const getTickets = async () => {
    try {
      const res = await api.get("/ticket");
      const tickets = res.data.data;
      setTickets(tickets)
      // RECEIVE
      let sumeggs = 0
      tickets.map((t) => t.items.map((i) => i.name == "Trứng" && i.type =="receive" && i.quantity > 0 ? sumeggs += i.quantity : sumeggs += 0));
      setEgg(sumeggs)

      let sumNoodle = 0
      tickets.map((t) => t.items.map((i) => i.name == "Mì Gói" && i.type =="receive" && i.quantity > 0 ? sumNoodle  += i.quantity : sumNoodle += 0));
      setNoodle(sumNoodle)

      let sumOil = 0
      tickets.map((t) => t.items.map((i) => i.name == "Dầu Ăn" && i.type =="receive" && i.quantity > 0 ? sumOil  += i.quantity : sumOil += 0));
      setOil(sumOil)
      
      let sumCloth = 0
      tickets.map((t) => t.items.map((i) => i.name == "Quần Áo" && i.type =="receive" && i.quantity ? sumCloth  += i.quantity : sumCloth += 0));
      setCloth(sumCloth)
      
      // SEND
      let sumeggsS = 0
      tickets.map((t) => t.items.map((i) => i.name == "Trứng" && i.type =="send" && i.quantity > 0 ? sumeggsS += i.quantity : sumeggsS += 0));
      setEggS(sumeggsS)

      let sumNoodleS = 0
      tickets.map((t) => t.items.map((i) => i.name == "Mì Gói" && i.type =="send" && i.quantity > 0 ? sumNoodleS  += i.quantity : sumNoodleS += 0));
      setNoodleS(sumNoodleS)

      let sumOilS = 0
      tickets.map((t) => t.items.map((i) => i.name == "Dầu Ăn" && i.type =="send" && i.quantity > 0 ? sumOilS  += i.quantity : sumOilS += 0));
      setOilS(sumOilS)
      
      let sumClothS = 0
      tickets.map((t) => t.items.map((i) => i.name == "Quần Áo" && i.type =="send" && i.quantity ? sumClothS  += i.quantity : sumClothS += 0));
      setClothS(sumClothS)

    } catch (error) {
      console.log("Error", error)
    }
  };
  useEffect(() => 
    getTickets()
  , [])


  const data = {
    labels: [`Mì Gói (N)`, `Trứng (N)`, `Dầu Ăn (N)`, `Quần Áo (N)`],
    datasets: [
      {
        label: "# of Votes",
        data: [noodle, eggs, oil, cloth],
        backgroundColor: [
          "#F7464A",
          `rgba(0, 148, 247, 0.7)`,
          "rgba(247, 222, 0, 0.6)",
          `#46BFBD`,

        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataS = {
    labels: [`Mì Gói (G)`, `Trứng (G)`, `Dầu Ăn (G)`, `Quần Áo (G)` ],
    datasets: [
      {
        label: "# of Votes",
        data: [noodleS, eggsS, oilS, clothS],
        backgroundColor: [
          "#F7464A",
          `rgba(0, 148, 247, 0.7)`,
          "rgba(247, 222, 0, 0.6)",
          `#46BFBD`,

        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
  <>

    <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", minWidth: "90%", flexWrap:"wrap"}}>
      <div style={{width:"35vw"}}>
        <h1 style={{fontSize:"2vw", textAlign:"center"}}>Items Pie Chart (Receive)</h1>
        <Pie data={data} style={{border: "1.5px solid grey", margin:"2px", borderRadius:"5px"}}/>
      </div>

      <div style={{width:"35vw"}}>
      <h1 style={{fontSize:"2vw", textAlign:"center"}}>Items Pie Chart (Send)</h1>
        <Pie data={dataS} style={{border: "1.5px solid grey", margin:"2px", borderRadius:"5px"}} />
      </div>
    </div>
    
  </>
  )
};

export default PieChart;
