import React from "react";
import Icon from "@/common/components/icon";
import { Form, Tabs, Input, Checkbox, Button, Divider } from "antd";
import VerifyCode from "./verify-code";
import styles from "./index.module.css";

export function UserPasswordForm({ loading, size, ...restProps }) {
  return (
    <Form layout="vertical" {...restProps}>
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: "用户名是必填项！" }]}>
        <Input size={size} prefix={<Icon type="icon-account" className={styles.prefixIcon} />} placeholder="请输入" />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: "密码是必填项！" }]}>
        <Input.Password size={size} prefix={<Icon type="icon-unlock" className={styles.prefixIcon} />} placeholder="请输入" />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
      <Form.Item style={{ marginTop: 48 }}>
        <Button block type="primary" size={size} shape="round" loading={loading} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export function EmailForm({ loading, size, onSend, ...restProps }) {
  return (
    <Form layout="vertical" {...restProps}>
      <Form.Item label="邮箱" name="email" rules={[{ required: true, message: "邮箱是必填项！" }]}>
        <Input size={size} prefix={<Icon type="icon-email" className={styles.prefixIcon} />} placeholder="请输入" />
      </Form.Item>
      <Form.Item label="验证码" name="code" rules={[{ required: true, message: "验证码是必填项！" }]}>
        <VerifyCode size={size} prefix={<Icon type="icon-security" className={styles.prefixIcon} />} placeholder="请输入" onSend={onSend} />
      </Form.Item>
      <Form.Item style={{ marginTop: 48 }}>
        <Button block type="primary" size={size} shape="round" loading={loading} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export function ExtraForm({ onGithub }) {
  return (
    <React.Fragment>
      <Divider dashed plain>
        其它方式
      </Divider>
      <div className={styles.other}>
        <Button type="default" shape="circle" size="large" title="Github 授权登录" onClick={onGithub}>
          <Icon type="icon-logistic-logo" />
        </Button>
      </div>
    </React.Fragment>
  );
}

function LoginForm({ onSend, ...restProps }) {
  return (
    <Tabs
      animated
      destroyInactiveTabPane
      items={[
        { label: "密码登录", key: "password", children: <UserPasswordForm {...restProps} /> },
        { label: "邮箱登录", key: "email", children: <EmailForm onSend={onSend} {...restProps} /> },
      ]}
    />
  );
}

export default LoginForm;
