import AssetForm from "./AssetForm";
import ConditionForm from "../components/ConditionForm";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";

const CreateForm = ({
  severityList,
  areaList,
  assetList,
  config,
  setConfig,
}) => {
  const [asset, setAsset] = useState({ assetName: null, assetId: null });

  const createAsset = (request) => {
    const createAssetRequest = {
      assetName: request.assetName,
      assetType: request.assetType,
      manufacturer: request.manufacturer,
      areaId: getAreaId(request.area),
      createdBy: request.createdBy,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/asset/createAsset`,
        createAssetRequest
      )
      .then((res) => {
        message.success(
          `Asset: ${res.data.assetName} Created with Id: ${res.data.assetId} Sucessfully `
        );
        setAsset({ assetName: request.assetName, assetId: res.data.assetId });
        setConfig("CreateCondition");
      })
      .catch((err) => {
        console.log(err);
        message.error(`Create Asset Failed`);
      });
  };

  const createCondition = (request) => {
    const createConditionRequest = {
      assetId: getAssetId(request.asset),
      severity: request.severity,
      conditionName: request.conditionName,
      description: request.description,
      parameter: request.parameter,
      triggerCondition: request.triggerCondition,
      conditionExpression: request.conditionExpression,
      createdBy: request.createdBy,
      recommendation: request.recommendation,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/condition/createCondition`,
        createConditionRequest
      )
      .then((res) => {
        message.success(
          `Condition: ${res.data.conditionName} Created with Id: ${res.data.conditionId} Sucessfully `
        );
        setConfig("DisplayAsset");
      })
      .catch((err) => {
        console.log(err);
        message.error(`Create Condition Failed`);
      });

    setAsset({ assetName: null, assetId: null });
  };

  const getAssetId = (assetName) => {
    if (assetName === asset.assetName) {
      return asset.assetId;
    } else {
      return assetList.filter((x) => x.assetName === assetName)[0].assetId;
    }
  };

  const getAreaId = (areaName) => {
    return areaList.filter((x) => x.areaName === areaName)[0].areaId;
  };

  const display = () => {
    if (config === "CreateAsset") {
      return (
        <>
          <h1 className="page-heading">CREATE ASSET</h1>
          <AssetForm
            createMode={true}
            onSubmit={createAsset}
            severityList={severityList}
            areaList={areaList}
          />
        </>
      );
    }
    return (
      <>
        <h1 className="page-heading">CREATE CONDITION</h1>
        <ConditionForm
          createMode={true}
          assetName={asset.assetName}
          onSubmit={createCondition}
          severityList={severityList}
          assetList={assetList}
        />
      </>
    );
  };

  return <div>{display()}</div>;
};

export default CreateForm;
