import { Result, Button } from "antd";

const ErrorPage = () => {
  return (
    <Result
      status="403"
      title="Permission Denied"
      subTitle="You do not have permission to view this page"
    />
  );
};

export default ErrorPage;
