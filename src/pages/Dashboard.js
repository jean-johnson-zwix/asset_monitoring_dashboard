import AssetTable from "../components/AssetTable";
import TimeSeries from "../components/TimeSeries";
import axios from "axios";
import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
import "../css-styles/dashboard.css";
import { Card, Row, Col } from "antd";

const Dashboard = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [telemetryData, setTelemetryData] = useState([]);
  const [assetBySeverity, setAssetBySeverity] = useState([]);
  const [assetByArea, setAssetByArea] = useState([]);
  const [assetByCondition, setAssetByCondition] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const DateDisplay = () => {
    let dateSet = new Set(
      telemetryData
        .map((data) => new Date(data[0]))
        .map(
          (dateTime) =>
            `${dateTime.getDate()} ${
              monthNames[dateTime.getMonth()]
            }, ${dateTime.getFullYear()}`
        )
    );
    let dateList = [...dateSet];
    return (
      <>
        {dateList.map((x) => (
          <Card.Grid
            className="date-button"
            onClick={() => onDateSelect(x)}
            style={{ width: "50%", textAlign: "center" }}
          >
            {x}
          </Card.Grid>
        ))}
      </>
    );
  };

  const onDateSelect = (dateString) => {
    let date = dateString.split(/ |, /);
    let filteredData = telemetryData.filter(
      (data) =>
        new Date(data[0]).getDate() === parseInt(date[0]) &&
        new Date(data[0]).getMonth() === monthNames.indexOf(date[1]) &&
        new Date(data[0]).getFullYear() === parseInt(date[2])
    );
    setTimeSeriesData(filteredData);

    console.log(telemetryData);
  };

  useEffect(() => {
    getAllAssetDetails();
  }, []);

  const getAllAssetDetails = () => {
    //GET DATA FROM SERVER
    axios
      .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/asset/getAssetSummary`)
      .then((res) => {
        getAssetBySeverity(res.data);
        getAssetByCondition(res.data);
        getAssetByArea(res.data);
      })
      .catch((err) => console.log("error: ", err));
  };

  const getTimeSeriesData = (assetName) => {
    //GET DATA FROM SERVER
    let data = [];
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/telemetry/getAssetData?assetName=${assetName}`
      )
      .then((res) => {
        res.data.forEach((telemetryData) => {
          let d = [];
          d[0] = new Date(telemetryData.timestamp).getTime();
          d[1] = telemetryData.inputValue;
          data.push(d);
        });

        setTelemetryData(data);
        setTimeSeriesData(data);
        setSelectedAsset(assetName);
      })
      .catch((err) => console.log("error: ", err));
  };

  const getAssetBySeverity = (assetSummary) => {
    let severityData = [];
    let severityList = assetSummary.map((data) => data.severity);

    [...new Set(severityList)].forEach((severity) => {
      let d = [];
      d[0] = severity;
      d[1] =
        (severityList.filter((s) => s === severity).length * 100) /
        severityList.length;
      severityData.push(d);
    });

    setAssetBySeverity(severityData);
  };

  const getAssetByCondition = (assetSummary) => {
    let conditionData = [];
    let conditionList = assetSummary.map((data) => data.condition);

    [...new Set(conditionList)].forEach((condition) => {
      let d = [];
      d[0] = condition;
      d[1] =
        (conditionList.filter((c) => c === condition).length * 100) /
        conditionList.length;
      conditionData.push(d);
    });

    setAssetByCondition(conditionData);
  };

  const getAssetByArea = (assetSummary) => {
    let areaData = [];
    let areaList = assetSummary.map((data) => data.area);

    [...new Set(areaList)].forEach((area) => {
      let d = [];
      d[0] = area;
      d[1] =
        (areaList.filter((a) => a === area).length * 100) / areaList.length;
      areaData.push(d);
    });

    setAssetByArea(areaData);
  };

  return (
    <div>
      <Card bordered={false}>
        <Card.Grid style={{ width: "33.3%" }}>
          <PieChart pieData={assetBySeverity} title="Asset By Severity" />
        </Card.Grid>
        <Card.Grid style={{ width: "33.3%" }}>
          <PieChart pieData={assetByArea} title="Asset By Area" />
        </Card.Grid>
        <Card.Grid style={{ width: "33.3%" }}>
          <PieChart pieData={assetByCondition} title="Asset By Condition" />
        </Card.Grid>
      </Card>
      <hr className="divider" />
      <Card>
        <Row>
          <Col span={8}>
            <DateDisplay />
          </Col>
          <Col span={16}>
            <TimeSeries assetName={selectedAsset} graphData={timeSeriesData} />
          </Col>
        </Row>
      </Card>
      <hr className="divider" />
      <AssetTable displayTimeSeries={getTimeSeriesData} />
    </div>
  );
};

export default Dashboard;
