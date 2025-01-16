import AssetForm from "./AssetForm";
import ConditionForm from "../components/ConditionForm";
import { message } from "antd";
import axios from "axios";

const EditForm = ({
  id,
  component,
  assetList,
  severityList,
  areaList,
  setConfig,
}) => {
  const updateAsset = (request) => {
    const createAssetRequest = {
      assetId: id,
      assetName: request.assetName,
      assetType: request.assetType,
      manufacturer: request.manufacturer,
      areaId: getAreaId(request.area),
      modifiedBy: request.modifiedBy,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/asset/updateAsset`,
        createAssetRequest
      )
      .then((res) => {
        message.success(`Asset: ${res.data.assetName} Update Sucessfull`);
        setConfig("DisplayAsset");
      })
      .catch((err) => {
        console.log(err);
        message.error(`Update Asset Failed`);
      });
  };

  const updateCondition = (request) => {
    const createConditionRequest = {
      conditionId: id,
      assetId: getAssetId(request.asset),
      severity: request.severity,
      conditionName: request.conditionName,
      description: request.description,
      parameter: request.parameter,
      triggerCondition: request.triggerCondition,
      conditionExpression: request.conditionExpression,
      modifiedBy: request.modifiedBy,
      recommendation: request.recommendation,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/condition/updateCondition`,
        createConditionRequest
      )
      .then((res) => {
        message.success(
          `Condition: ${res.data.conditionName} Update Sucessful `
        );
        setConfig("DisplayCondition");
      })
      .catch((err) => {
        console.log(err);
        message.error(`Update Condition Failed`);
      });
  };

  const getAssetId = (assetName) => {
    let asset = assetList.filter((x) => x.assetName === assetName)[0];
    if (asset === undefined) {
      return null;
    }
    return asset.assetId;
  };

  const getAreaId = (areaName) => {
    let area = areaList.filter((x) => x.areaName === areaName)[0];
    if (area === undefined) {
      return null;
    }
    return area.areaId;
  };

  const display = () => {
    if (component === "Asset") {
      return (
        <>
          <h1 className="page-heading">UPDATE ASSET</h1>
          <AssetForm
            createMode={false}
            onSubmit={updateAsset}
            severityList={severityList}
            areaList={areaList}
          />
        </>
      );
    }
    return (
      <>
        <h1 className="page-heading">UPDATE CONDITION</h1>
        <ConditionForm
          createMode={false}
          onSubmit={updateCondition}
          severityList={severityList}
          assetList={assetList}
        />
      </>
    );
  };

  return <>{display()}</>;
};

export default EditForm;
