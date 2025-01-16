import { Form, Input, Button, Alert } from "antd";
import DropDown from "./DropDown";
import { useState, useEffect } from "react";
import axios from "axios";

const AssetForm = ({ areaList, onSubmit, createMode }) => {
  const [rule, setRule] = useState([
    {
      required: true,
      message: "Please enter value!",
    },
  ]);

  useEffect(() => {
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
  const [form] = Form.useForm();

  const onAreaChange = (x) => {
    form.setFieldsValue({ area: x });
  };

  const onFinish = (values) => {
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <Form.Item label="Asset Name" name="assetName" rules={rule}>
          <Input />
        </Form.Item>

        <Form.Item label="Manufacturer" name="manufacturer" rules={rule}>
          <Input />
        </Form.Item>
        <Form.Item label="Asset Type" name="assetType" rules={rule}>
          <Input />
        </Form.Item>

        <Form.Item label="Area" name="area" rules={rule}>
          <DropDown
            attribute="Area"
            dropDownOptions={areaList.map((x) => x.areaName)}
            filter={onAreaChange}
          />
        </Form.Item>

        {displayField()}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Save Asset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssetForm;
