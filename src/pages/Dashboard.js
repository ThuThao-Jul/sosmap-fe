import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  LineChartOutlined,
  TeamOutlined,
  UserOutlined,
  OrderedListOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import PieChartStatus from "../components/PieChartStatus";
import TicketsList from "../components/TicketsList";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <h1
            className="logo"
            style={{
              visibility: collapsed ? "hidden" : "visible",
              color: "white",
              fontSize: "24px",
              textAlign: "center",
              margin: "20px",
            }}
          >
            Dashboard
          </h1>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu key="sub1" icon={<PieChartOutlined />} title="Charts">
              <Menu.Item
                key="1"
                icon={<OrderedListOutlined />}
                style={{ paddingLeft: "32px", fontSize: "12px" }}
              >
                <Link to="/"> Tickets List </Link>
              </Menu.Item>
              <Menu.Item
                style={{ paddingLeft: "32px", fontSize: "12px" }}
                icon={<LineChartOutlined />}
                key="4"
              >
                <Link to="ticketsDate"> Tickets Per Date </Link>
              </Menu.Item>
              <Menu.Item
                style={{ paddingLeft: "32px", fontSize: "12px" }}
                icon={<BarChartOutlined />}
                key="5"
              >
                <Link to="ticketsDistrict"> Tickets Per Districts</Link>
              </Menu.Item>
              <Menu.Item
                style={{ paddingLeft: "32px", fontSize: "12px" }}
                icon={<PieChartOutlined />}
                key="6"
              >
                <Link to="ticketsStatus"> Tickets Per Status</Link>
              </Menu.Item>
              <Menu.Item
                style={{ paddingLeft: "32px", fontSize: "12px" }}
                icon={<PieChartOutlined />}
                key="3"
              >
                <Link to="itemsType"> Items Per Types </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team"></SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Switch>
                <Route exact path="/" component={TicketsList} />
                <Route exact path="/itemsType" component={PieChart} />
                <Route exact path="/ticketsDistrict" component={BarChart} />
                <Route exact path="/ticketsStatus" component={PieChartStatus} />
                <Route exact path="/ticketsDate" component={LineChart} />
                {/* <Route component={NotFoundPage} /> */}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default DashboardPage;
