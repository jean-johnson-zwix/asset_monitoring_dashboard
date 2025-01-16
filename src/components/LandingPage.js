import { Layout, Menu, Dropdown, Row, Col } from "antd";
import { AreaChartOutlined, UserOutlined } from "@ant-design/icons";
import Dashboard from "../pages/Dashboard.js";
import Configuration from "../pages/Configuration.js";
import { useState } from "react";
import logo from "../images/fsd.ico";
import ErrorPage from "../pages/ErrorPage.js";
import { Link, Redirect } from "react-router-dom";

const LandingPage = ({ user, logout, component }) => {
  const { Header, Content, Footer } = Layout;

  const displayUserName = () => {
    console.log("user ", user);
    if (user.userName != undefined || user.userName != null) {
      return "Welcome " + user.userName;
    }
    return <Redirect to="/" />;
  };

  return (
    <Layout>
      <Header className="header">
        <Row>
          <Col span={8} style={{ color: "#fff" }}>
            <Menu
              className="menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[]}
              selectedKeys={[]}
            >
              <Link to="/dashboard">
                <Menu.Item
                  style={{ color: "#FF7326" }}
                  icon={
                    <AreaChartOutlined
                      style={{ fontSize: "25px", color: "#FF7326" }}
                    />
                  }
                  className="option"
                  key="Dashboard"
                >
                  Dashboard
                </Menu.Item>
              </Link>
              <Link to="/admin">
                <Menu.Item
                  style={{ color: "#FFCC0D" }}
                  icon={
                    <UserOutlined
                      className="option"
                      style={{ fontSize: "25px", color: "#FFCC0D" }}
                    />
                  }
                  className="option"
                  key="Configuration"
                >
                  Admin
                </Menu.Item>
              </Link>
            </Menu>
          </Col>
          <Col span={8} style={{ color: "#fff" }}>
            <h1 className="main-heading">FSD ASSET DASHBOARD</h1>
          </Col>
          <Col span={6} style={{ color: "#fff" }}>
            <h2 className="user-name">{displayUserName()}</h2>
          </Col>
          <Col span={2}>
            <Dropdown
              overlay={
                <Menu onClick={() => logout()}>
                  <Link to="/">
                    <Menu.Item>Logout</Menu.Item>
                  </Link>
                </Menu>
              }
            >
              <div className="logo-box">
                <img className="logo" height="30px" width="35.7px" src={logo} />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content className="container" style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {component}
          </Content>
        </Layout>
      </Content>
      <Footer className="footer" style={{ textAlign: "center" }}>
        FSD Program ©2021 Created by <b>Jean Johnson</b>
      </Footer>
    </Layout>
  );
};

export default LandingPage;
