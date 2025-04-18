import React from "react";
import { Avatar, Button, Space } from "antd";
import Icon from "@/common/components/icon";
import styles from "./index.module.css";

function OauthButton({ source, target, onConfirm, onCancel }) {
  return (
    <React.Fragment>
      <div className={styles.oauthLink}>
        <div className={styles.clientBlock}>
          <div className={styles.image}>
            <Avatar size={60} icon={<Icon type="icon-account" />} src={source?.avatar} alt="头像" />
          </div>
          <span>{source?.name || "-"}</span>
        </div>
        <Icon type="icon-double-arro-right" className={styles.arrow} />
        <div className={styles.clientBlock}>
          <div className={styles.image}>
            <Avatar size={60} icon={<Icon type="icon-account" />} src={target?.avatar} alt="头像" />
          </div>
          <span>{target?.name || "-"}</span>
        </div>
      </div>
      <p className={styles.desc}>确认授权给 {target?.name} 平台吗？</p>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button block type="primary" size="large" shape="round" onClick={onConfirm}>
          授权
        </Button>
        <Button block type="link" size="large" shape="round" onClick={onCancel}>
          取消
        </Button>
      </Space>
    </React.Fragment>
  );
}

export default OauthButton;
