import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import DropDown from "./DropDown";

const ConditionForm = ({
  assetList,
  severityList,
  onSubmit,
  assetName,
  createMode,
}) => {
  const [form] = Form.useForm();

  const [rule, setRule] = useState([
    {
      required: true,
      message: "Please enter value!",
    },
  ]);

  useEffect(() => {
    displayAsset();
    if (createMode) {
      setRule([
        {
          required: true,
          message: "Please enter value!",
        },
      ]);
    } else {
      setRule([
        {
          required: false,
        },
      ]);
    }
  }, []);

  const [assetDisplay, setAssetDisplay] = useState(<div></div>);

  const onAssetChange = (x) => {
    form.setFieldsValue({ asset: x });
  };

  const onSeverityChange = (x) => {
    form.setFieldsValue({ severity: x });
  };

  const onTriggerConditionChange = (x) => {
    form.setFieldsValue({ triggerCondition: x });
  };

  const onFinish = (values) => {
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const displayAsset = () => {
    if (assetName != null) {
      console.log("assetName ", assetName);
      form.setFieldsValue({ asset: assetName });
      setAssetDisplay(<Input disabled />);
    } else {
      setAssetDisplay(
        <DropDown
          attribute="Asset"
          dropDownOptions={assetList.map((x) => x.assetName)}
          filter={onAssetChange}
        />
      );
    }
  };

  const displayField = () => {
    if (createMode) {
      return (
        <Form.Item
          label="Created By"
          name="createdBy"
          rules={[
            {
              required: true,
              message: "Please enter value!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      );
    }

    return (
      <Form.Item
        label="Modified By"
        name="modifiedBy"
        rules={[
          {
            required: true,
            message: "Please enter value!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    );
  };
  return (
    <div>
      <Form
        form={form}
        name="control-hooks"
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
        <Form.Item label="Condition Name" name="conditionName" rules={rule}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={rule}>
          <Input />
        </Form.Item>

        <Form.Item label="Recommendation" name="recommendation">
          <Input />
        </Form.Item>

        <Form.Item label="Parameter" name="parameter" rules={rule}>
          <Input />
        </Form.Item>

        <Form.Item label="Asset Name" name="asset" rules={rule}>
          {assetDisplay}
        </Form.Item>

        <Form.Item label="Severity" name="severity" rules={rule}>
          <DropDown
            attribute="Severity"
            dropDownOptions={severityList}
            filter={onSeverityChange}
          />
        </Form.Item>

        <Form.Item
          label="Trigger Condition"
          name="triggerCondition"
          rules={rule}
        >
          <DropDown
            attribute="Trigger Condition"
            dropDownOptions={["LESS THAN", "GREATER THAN", "EQUAL TO"]}
            filter={onTriggerConditionChange}
          />
        </Form.Item>

        <Form.Item
          label="Condition Expression"
          name="conditionExpression"
          rules={rule}
        >
          <Input />
        </Form.Item>

        {displayField()}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Save Condition
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConditionForm;
