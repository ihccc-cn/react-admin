import clsx from "clsx";
import { Row, Col, Form, Radio, Input, Button, Space } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

const FormRender = () => {
  return (
    <Form layout="vertical" style={{ width: "100%" }}>
      <Row gutter={20}>
        <Col span={4}>
          <Form.Item label="用户名" name="username">
            <Input placeholder="请输入" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="电话" name="phone">
            <Input placeholder="请输入" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio.Button value="1">正常</Radio.Button>
              <Radio.Button value="0">异常</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

function SearchBar({}) {
  return (
    <div className={clsx("search-bar")}>
      <div className={clsx("search-form-layout")}>
        <FormRender />
      </div>
      <div className={clsx("search-buttons")}>
        <Space direction="vertical">
          <Button type="primary" icon={<Icon type="icon-search" />}>
            查询
          </Button>
          <Button icon={<Icon type="icon-return" />}>重置</Button>
        </Space>
      </div>
    </div>
  );
}

SearchBar.defaultProps = {};

export default SearchBar;
