import React, { useEffect, useState } from "react";
import api from "../redux/axios";
import { Bar } from "react-chartjs-2";
import { Checkbox, Divider } from 'antd';
const CheckboxGroup = Checkbox.Group;



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
    const plainOptions = districtData.map((d) => d.district);
    const defaultCheckedList = districtData.map((d) => d.district);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const checkedData = districtData.filter((i) => checkedList.includes(i.district))
    console.log(checkedData)
    const data = {
        labels: checkedList,
        datasets: [{
          type: 'bar',
          label: 'Not processed',
          data: checkedData.map((d) =>  d.notProcessed),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: '#FF6767'
        }, {
          type: 'bar',
          label: 'In progress',
          data: checkedData.map((d) => d.inProgress),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: '#96BAFF'
        },{
            type: 'bar',
            label: 'Done',
            data: checkedData.map((d) => d.done),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: '#7FC8A9' 
        }]
      };
      
     

      const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
      };

      const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
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
      <h1 className="title">BY DISTRICTS</h1>
    </div>

 {/* Customized districts */}
  <div style={{border: "1px solid green", margin:"2%", width:"80%"}}>
 <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
  </div>

    <div style={{ width:"100%", border: "1px solid black" }}>
     

      <Bar data={data} />
    </div>
    </>
    )
}

export default BarChart