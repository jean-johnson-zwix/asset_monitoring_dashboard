import { Divider, Row, Col } from "antd";

const Item = ({ label, content }) => (
  <div className="detail-wrap">
    <p>
      <Row>
        <Col span={10}>
          <span className="detail-label">{label}: </span>
        </Col>
        <Col span={14}>
          <span className="detail-content">{content}</span>
        </Col>
      </Row>
    </p>
  </div>
);

const ConditionDetail = ({ asset, condition }) => {
  return (
    <>
      <h3 className="detail-heading">Condition</h3>
      <Item label="Condition Id" content={condition.conditionId} />
      <Item label="Condition Name" content={condition.conditionName} />
      <Item label="Description" content={condition.description} />
      <Item label="Expression" content={condition.conditionExpression} />
      <Item label="Trigger Condition" content={condition.triggerCondition} />
      <Item label="Recommend" content={condition.recommendation} />
      <Item label="Parameter" content={condition.parameter} />
      <Item label="Severity" content={condition.severity} />
      <Item label="Created By" content={condition.createdBy} />
      <Divider />
      <h3 className="detail-heading">Asset</h3>
      <Item label="Asset Id" content={asset.assetId} />
      <Item label="Asset Name" content={asset.assetName} />
      <Item label="Asset Type" content={asset.assetType} />
      <Item label="Manufacturer" content={asset.manufacturer} />
      <Item label="Area Name" content={asset.areaName} />
      <Item label="Created By" content={asset.createdBy} />
    </>
  );
};

export default ConditionDetail;
