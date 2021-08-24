import React, { useEffect, useState } from "react";
import api from "../redux/axios";
import { Bar } from "react-chartjs-2";
import { Checkbox, Divider, Table } from 'antd';
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
    const dataBar = {
        labels: checkedList,
        datasets: [{
          type: 'bar',
          label: 'Not processed',
          data: checkedData.map((d) =>  d.notProcessed),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: '#F7464A'
        }, {
          type: 'bar',
          label: 'In progress',
          data: checkedData.map((d) => d.inProgress),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 230, 0, 0.644)'
        },{
            type: 'bar',
            label: 'Done',
            data: checkedData.map((d) => d.done),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: '#46BFBD' 
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


    const columns = [
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        fixed: 'left',
        filters: [
          {
            text: 'Not processed',
            value: 'not processed',
          },
          {
            text: 'In progress',
            value: 'in progress',
          },
          {
            text: 'Done',
            value: 'done,'
          }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        width: 60,
        filters: [
          {
            text: 'Low',
            value: 'low',
          },
          {
            text: 'Medium',
            value: 'medium',
          },
          {
            text: 'High',
            value: 'high',
          }
        ],
        onFilter: (value, record) => record.priority.indexOf(value) === 0,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 60,
      },
      {
        title: 'Phone number',
        dataIndex: 'phone',
        key: 'phone',
        width: 100,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 100,
      },
      {
        title: 'District',
        dataIndex: 'district',
        key: 'district',
        width: 60,
        sorter: (a, b) => a.district.split(" ")[1] - b.district.split(" ")[1],
        fixed: 'right',
      },
    ];

    const data = [];
    for (let i = 0; i < ticket.length; i++) {
      data.push({
        key: ticket[i]._id,
        status: ticket[i].status,
        priority: ticket[i].priority,
        name: ticket[i].name,
        phone: ticket[i].phoneNumber,
        address: ticket[i].address,
        district: ticket[i].district,
      });
    }

    
    return (
    <>
    <div className="header">
      <h1 className="title">BY DISTRICTS</h1>
    </div>

 {/* Customized districts */}
  <div style={{border: "1px solid green", margin:"2%", width:"80%", textAlign:"center"}}>
 <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
  </div>

    <div style={{ width:"100%", border: "1px solid black", marginBottom:"5%", marginTop:"3%"}}>
     

      <Bar data={dataBar} />

    </div>

      {/* Table */}
      <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    scroll={{ x: 'calc(700px + 50%)', y: 240 }}
  />
    </>
    )
}

export default BarChart