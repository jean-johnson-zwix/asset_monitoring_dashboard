import { Select } from "antd";

const DropDown = ({ attribute, dropDownOptions, filter }) => {
  const { Option } = Select;

  const onChange = (value) => {
    filter(value);
  };

  const displayOptions = () => {
    let options = [];
    dropDownOptions.forEach((op) => {
      options.push(<Option value={op}>{op}</Option>);
    });

    // options.push(<Option value="none">NONE</Option>);
    return options;
  };

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder={`Select ${attribute}`}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {displayOptions()}
    </Select>
  );
};

export default DropDown;
