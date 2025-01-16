import { Card, Button, Popconfirm, Row, Col } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const DisplayComponent = ({
  componentName,
  componentList,
  onDelete,
  onEdit,
  onSelect,
}) => {
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  return (
    <div>
      <h1 className="page-heading">{componentName} List</h1>
      <Card>
        {componentList.map((c) => (
          <Card.Grid style={gridStyle} onClick={() => onSelect(c.name)}>
            <Row style={{ paddingBottom: "15px" }}>
              <Col span={24}>
                <div className="display-item-name">{c.name}</div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Popconfirm
                  title="Confirm Delete"
                  onConfirm={() => onDelete(c.name)}
                >
                  <Button
                    shape="circle"
                    icon={
                      <DeleteTwoTone
                        style={{ fontSize: "20px" }}
                        twoToneColor="#ffa26e"
                      />
                    }
                  />
                </Popconfirm>
                {"  "}
                <Button
                  shape="circle"
                  icon={
                    <EditTwoTone
                      style={{ fontSize: "20px" }}
                      twoToneColor="#ff6688"
                    />
                  }
                  onClick={() => onEdit(c.name)}
                />
              </Col>
            </Row>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

export default DisplayComponent;
