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

const ItemBox = ({ content }) => <div className="detail-box">{content}</div>;

const AssetDetail = ({ asset, conditionList }) => {
  return (
    <>
      <h3 className="detail-heading">Asset</h3>
      <Item label="Asset Id" content={asset.assetId} />
      <Item label="Asset Name" content={asset.assetName} />
      <Item label="Asset Type" content={asset.assetType} />
      <Item label="Manufacturer" content={asset.manufacturer} />
      <Item label="Area Name" content={asset.areaName} />
      <Item label="Created By" content={asset.createdBy} />
      <Divider />
      <h3 className="detail-heading">Condition</h3>
      {conditionList.map((c) => (
        <ItemBox content={c.conditionName} />
      ))}
    </>
  );
};

export default AssetDetail;
