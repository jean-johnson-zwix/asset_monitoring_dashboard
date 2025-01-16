import { Table, Button, Space, Popover, Row, Col, Card } from "antd";
import { ReloadOutlined, BellTwoTone } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import DropDown from "./DropDown";

const AssetTable = ({ displayTimeSeries }) => {
  const [assetData, setAssetData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [severityList, setSeverityList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: <h1 className="asset-table-title">ASSET</h1>,
      dataIndex: "asset",
      key: "asset",
      render: (text) => <a onClick={() => onAssetSelect(text)}>{text}</a>,
    },
    {
      title: <h1 className="asset-table-title">STATUS</h1>,
      key: "status",
      render: (assetData) => {
        let textColor = findColor(assetData.status);
        return <div style={{ color: textColor }}>{assetData.status}</div>;
      },
    },
    {
      title: <h1 className="asset-table-title">SEVERITY</h1>,
      dataIndex: "severity",
      key: "severity",
      render: (severity) => (
        <div
          style={{
            color: severity,
            backgroundColor: severity,
            width: "100%",
            height: "100%",
            borderRadius: "4px",
          }}
        >
          i
        </div>
      ),
    },
    {
      title: <h1 className="asset-table-title">USER</h1>,
      key: "user",
      dataIndex: "user",
    },
    {
      title: <h1 className="asset-table-title">ROLE</h1>,
      key: "role",
      dataIndex: "role",
    },
    {
      title: <h1 className="asset-table-title">DESCIRPTION</h1>,
      key: "description",
      dataIndex: "description",
    },
    {
      title: <h1 className="asset-table-title">AREA</h1>,
      key: "area",
      dataIndex: "area",
    },
    {
      title: <h1 className="asset-table-title">NOTIFICATION</h1>,
      key: "notification",
      render: (assetData) => {
        const popOverContent = () => {
          return <div>{assetData.notification}</div>;
        };
        if (assetData.notification !== "NO DATA") {
          return (
            <div>
              <Popover content={popOverContent()} title="Alert">
                <BellTwoTone
                  style={{ fontSize: "20px" }}
                  twoToneColor="#FFBE00"
                />
              </Popover>
            </div>
          );
        }
      },
    },
  ];

  const findColor = (severity) => {
    if (severity === "RUNNING") return "#00A388";
    if (severity === "SCHEDULED_DOWN") return "#0288D1";
    if (severity === "MAINTENANCE_REQUIRED") return "#FA9600";
    if (severity === "FAILURE") return "#FF2D00";
    return "#BFBFBF";
  };

  const getData = () => {
    //GET DATA FROM SERVER
    let data = [];
    axios
      .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/asset/allAssetDetails`)
      .then((res) => {
        let i = 1;
        res.data.forEach((newData) => {
          newData.key = i.toString();
          newData.severity = findColor(newData.status);
          data.push(newData);
          i++;
        });

        setAssetData(data);
        setDataSource(data);
        setAssetList([...new Set(data.map((x) => x.asset)), "None"]);
        setSeverityList([...new Set(data.map((x) => x.status)), "None"]);
        setAreaList([...new Set(data.map((x) => x.area)), "None"]);
      })
      .catch((err) => console.log("error: ", err));
  };

  const filterByAsset = (assetName) => {
    if (assetName === "None") {
      setDataSource(assetData);
      return;
    }
    let data = [];
    assetData.forEach((d) => {
      if (assetName === d.asset) {
        data.push(d);
      }
    });
    setDataSource(data);
  };

  const filterBySeverity = (severityName) => {
    if (severityName === "None") {
      setDataSource(assetData);
      return;
    }
    let data = [];
    assetData.forEach((d) => {
      if (severityName === d.status) {
        data.push(d);
      }
    });
    setDataSource(data);
  };

  const filterByArea = (areaName) => {
    if (areaName === "None") {
      setDataSource(assetData);
      return;
    }
    let data = [];
    assetData.forEach((d) => {
      if (areaName === d.area) {
        data.push(d);
      }
    });
    setDataSource(data);
  };

  const onAssetSelect = (asset) => {
    displayTimeSeries(asset);
  };

  return (
    <>
      <div className="filter-options">
        <Row>
          <Col span={4}>
            <Button
              className="refresh-button"
              icon={<ReloadOutlined />}
              onClick={() => getData()}
            >
              Refresh
            </Button>
          </Col>
          <Col className="filter-title" span={20}>
            <h2 className="filter-heading">ASSET INFORMATION</h2>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="filter-dropdown">
            Filter by Severity
          </Col>
          <Col span={8} className="filter-dropdown">
            Filter by Asset
          </Col>
          <Col span={8} className="filter-dropdown">
            Filter by Area
          </Col>
        </Row>
        <Row>
          <Col className="filter-dropdown" span={8}>
            <DropDown
              attribute="Severity"
              dropDownOptions={severityList}
              filter={filterBySeverity}
            />
          </Col>
          <Col className="filter-dropdown" span={8}>
            <DropDown
              attribute="Asset"
              dropDownOptions={assetList}
              filter={filterByAsset}
            />
          </Col>
          <Col className="filter-dropdown" span={8}>
            <DropDown
              attribute="Area"
              dropDownOptions={areaList}
              filter={filterByArea}
            />
          </Col>
        </Row>
        <Row className="asset-table">
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1000 }}
          />
        </Row>
      </div>
    </>
  );
};

export default AssetTable;
