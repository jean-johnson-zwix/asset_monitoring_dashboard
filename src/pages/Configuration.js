import { useEffect, useState } from "react";
import { Drawer, Layout, Menu, Alert, message } from "antd";
import CreateForm from "../components/CreateForm";
import DisplayList from "../components/DisplayList";
import AssetDetail from "../components/AssetDetail";
import ConditionDetail from "../components/ConditionDetail";
import axios from "axios";
import EditForm from "../components/EditForm";
import { EditTwoTone, StarTwoTone } from "@ant-design/icons";
import "../css-styles/configuration.css";
import { Redirect } from "react-router-dom";

const Configuration = ({ user }) => {
  const { Header, Content, Sider } = Layout;

  const { SubMenu } = Menu;

  const [config, setConfig] = useState("DisplayAsset");
  const [assetList, setAssetList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [severityList, setSeverityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [editConfig, setEditConfig] = useState({ id: null, component: null });
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState("Initial Value");

  useEffect(() => {
    getAssetList();
    getConditionList();
    getSeverityList();
    getAreaList();
  }, [config]);

  const redirect = () => {
    console.log("user ", user);
    if (user.auth != "Admin") {
      return <Redirect to="/error" />;
    }
  };

  const getAssetList = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/asset/getAllAsset`)
      .then((res) => {
        setAssetList(res.data);
      })
      .catch((err) => console.log("error: ", err));
  };

  const getConditionList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/condition/getAllCondition`
      )
      .then((res) => {
        setConditionList(res.data);
      })
      .catch((err) => console.log("error: ", err));
  };

  const getSeverityList = () => {
    let data = [];
    axios
      .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/severity/getAllSeverity`)
      .then((res) => {
        res.data.forEach((severity) => {
          data.push(severity.severityName);
        });
        setSeverityList(data);
      })
      .catch((err) => console.log("error: ", err));
  };

  const getAreaList = () => {
    let data = [];
    axios
      .get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/area/getAllArea`)
      .then((res) => {
        res.data.forEach((area) => {
          let t = [];
          t.areaName = area.areaName;
          t.areaId = area.areaId;
          data.push(t);
        });
        setAreaList(data);
      })
      .catch((err) => console.log("error: ", err));
  };

  const getAreaName = (areaId) => {
    return areaList.filter((x) => x.areaId === areaId)[0].areaName;
  };

  const getAssetId = (assetName) => {
    return assetList.filter((x) => x.assetName === assetName)[0].assetId;
  };

  const getConditionId = (conditionName) => {
    return conditionList.filter((x) => x.conditionName === conditionName)[0]
      .conditionId;
  };

  const assetDelete = (assetName) => {
    axios
      .put(
        `${
          process.env.REACT_APP_BACKEND_ENDPOINT
        }/asset/deleteAsset/${getAssetId(assetName)}`
      )
      .then((res) => {
        if (res.status === 200) {
          message.success(`Asset: ${assetName} Delete Sucessful `);
          getAssetList();
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(`Delete Asset Failed`);
      });
  };

  const assetEdit = (assetName) => {
    console.log("edit ", getAssetId(assetName));
    setEditConfig({ id: getAssetId(assetName), component: "Asset" });
    setConfig("Edit");
  };

  const conditionDelete = (conditionName) => {
    axios
      .put(
        `${
          process.env.REACT_APP_BACKEND_ENDPOINT
        }/condition/deleteCondition/${getConditionId(conditionName)}`
      )
      .then((res) => {
        if (res.status === 200) {
          message.success(`Condition: ${conditionName} Delete Sucessful `);
          getConditionList();
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(`Create Condition Failed`);
      });
  };

  const conditionEdit = (conditionName) => {
    setEditConfig({
      id: getConditionId(conditionName),
      component: "Condition",
    });
    setConfig("Edit");
  };

  const assetSelect = (assetName) => {
    let selectedAsset = assetList.filter((x) => x.assetName === assetName)[0];
    let selectedConditionList = conditionList.filter(
      (x) => x.assetId === selectedAsset.assetId
    );
    selectedAsset["areaName"] = getAreaName(selectedAsset.areaId);
    setDrawerContent(
      <div>
        <AssetDetail
          asset={selectedAsset}
          conditionList={selectedConditionList}
        />
      </div>
    );
    setShowDrawer(true);
  };

  const conditionSelect = (conditionName) => {
    let selectedCondition = conditionList.filter(
      (x) => x.conditionName === conditionName
    )[0];
    let selectedAsset = assetList.filter(
      (x) => x.assetId === selectedCondition.assetId
    )[0];

    selectedAsset["areaName"] = getAreaName(selectedAsset.areaId);
    setDrawerContent(
      <div>
        <ConditionDetail asset={selectedAsset} condition={selectedCondition} />
      </div>
    );
    setShowDrawer(true);
  };

  const setDisplay = () => {
    if (config === "Edit") {
      return (
        <>
          <EditForm
            id={editConfig.id}
            component={editConfig.component}
            severityList={severityList}
            areaList={areaList}
            assetList={assetList}
            setConfig={setConfig}
          />
        </>
      );
    }
    if (config === "DisplayAsset") {
      return (
        <>
          <DisplayList
            componentName="Asset"
            onSelect={assetSelect}
            onDelete={assetDelete}
            onEdit={assetEdit}
            componentList={assetList.map((asset) => {
              let a = { name: asset.assetName };
              return a;
            })}
          />
        </>
      );
    }
    if (config === "DisplayCondition") {
      return (
        <>
          <DisplayList
            componentName="Condition"
            onSelect={conditionSelect}
            onDelete={conditionDelete}
            onEdit={conditionEdit}
            componentList={conditionList.map((condition) => {
              let c = { name: condition.conditionName };
              return c;
            })}
          />
        </>
      );
    }
    return (
      <>
        <CreateForm
          severityList={severityList}
          areaList={areaList}
          assetList={assetList}
          config={config}
          setConfig={setConfig}
        />
      </>
    );
  };

  const onClose = () => {
    setShowDrawer(false);
  };

  return (
    <div>
      {redirect()}
      <Layout>
        <Sider className="site-layout-background" width={200}>
          <Menu
            className="config-menu"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%" }}
            onClick={(e) => setConfig(e.key)}
          >
            <SubMenu
              key="Manage"
              title="Manage"
              style={{ color: "#f15c80" }}
              icon={
                <EditTwoTone
                  twoToneColor="#f15c80"
                  style={{ fontSize: "25px" }}
                />
              }
            >
              <Menu.Item key="DisplayAsset">Assets</Menu.Item>
              <Menu.Item key="DisplayCondition">Conditions</Menu.Item>
            </SubMenu>

            <SubMenu
              key="Create"
              title="Create"
              style={{ color: "#e4d354" }}
              icon={
                <StarTwoTone
                  twoToneColor="#e4d354"
                  style={{ fontSize: "25px" }}
                />
              }
            >
              <Menu.Item key="CreateAsset">Assets</Menu.Item>
              <Menu.Item key="CreateCondition">Conditions</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Drawer
              width={300}
              title="Component Details"
              placement="right"
              visible={showDrawer}
              onClose={onClose}
              closable={true}
            >
              {drawerContent}
            </Drawer>
            {setDisplay()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Configuration;
