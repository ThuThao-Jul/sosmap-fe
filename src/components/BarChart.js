import React, { useEffect, useState } from "react";
import api from "../redux/axios";
import { Bar } from "react-chartjs-2";



const BarChart = () => {
    const [ticket, setTicket] = useState([]);
    let districtData = [] ;

    for (let i=1; i<=10; i++) {
       let district = "quận " + i;
       let notProcessed = ticket.filter((ticket) => ticket.status === 'not processed' && ticket.district === "quận " + i).length;
       let inProgress = ticket.filter((ticket) => ticket.status === 'in progress' && ticket.district === "quận " + i).length;
       let done = ticket.filter((ticket) => ticket.status === 'done' && ticket.district === "quận " + i).length;
       let detailData = {"district": district, "notProcessed": notProcessed, "inProgress": inProgress, "done": done};
       districtData.push(detailData);
    }
   
    
   console.log(districtData)

    const data = {
        labels: districtData.map((d) => d.district),
        datasets: [{
          type: 'bar',
          label: 'Not processed',
          data: districtData.map((d) => d.notProcessed),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: '#FF6767'
        }, {
          type: 'bar',
          label: 'In progress',
          data: districtData.map((d) => d.inProgress),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: '#96BAFF'
        },{
            type: 'bar',
            label: 'Done',
            data: districtData.map((d) => d.done),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: '#7FC8A9' 
        }]
      };

    const getTickets = async () => {
        const res = await api.get("http://localhost:5000/api/ticket");
        setTicket(res.data.data)
    }

    useEffect(() => {
        getTickets()
    },[])
    
    return (
    <>
    <div className="header">
      <h1 className="title">Bar Chart</h1>
    </div>

    <div style={{ border: "1px solid black" }}>
      <Bar data={data} />
    </div>
    </>
    )
}

export default BarChart