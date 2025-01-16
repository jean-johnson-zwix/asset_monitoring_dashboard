import { Card, Form, Input, Button, Alert } from "antd";
import axios from "axios";
import { useState } from "react";
import "../css-styles/login-page.css";
import logo from "../images/fsd.ico";
import { Redirect } from "react-router-dom";
const LoginPage = ({ loginUser }) => {
  const [alert, setAlert] = useState(<div></div>);
  const [loggedIn, setLoggedIn] = useState(false);

  const redirect = () => {
    if (loggedIn) {
      return <Redirect to="/dashboard" />;
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    authenticateUser(values.username, values.password);
  };

  const authenticateUser = (userName, userPassword) => {
    const requestBody = {
      userName: userName,
      userPassword: userPassword,
    };

    // const requestHeaders = {
    //   Authorization: "Basic amVhbjpmc2QtcGFzc3dvcmQ=",
    //   "Access-Control-Allow-Origin": "*",
    // };

    axios
      .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/auth/login`, requestBody)
      .then((res) => {
        if (res.data.status === "ERROR") {
          setAlert(
            <Alert
              message={`Authentication Error: ${res.data.error}`}
              type="error"
              closable
            />
          );
        } else if (
          res.data.authentication === "Admin" ||
          res.data.authentication === "User"
        ) {
          loginUser(userName, res.data.authentication);
          setLoggedIn(true);
        } else {
          console.log("Invalid data: ", res);
        }
      })
      .catch((err) => {
        setAlert(
          <Alert message={`Internal Error Occured`} type="error" closable />
        );
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      {redirect()}
      <Card
        cover={
          <div>
            <div className="login-logo-box">
              <img
                className="login-logo"
                height="45px"
                width="53.55px"
                src={logo}
              />
            </div>
            <h1 className="login-heading">FSD ASSET DASHBOARD</h1>
          </div>
        }
        className="login-box"
      >
        {alert}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className="login-button" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
