import React from "react";
import LoginLayout from "./components/login-layout";
import LoginForm, { ExtraForm } from "./components/login-form";
import OauthButton from "./components/oauth-button";

const MessageText = ({ show, text }) => (
  <span
    style={{
      width: "100%",
      display: "inline-block",
      textAlign: "center",
      fontSize: 12,
      color: "#ff0909",
      opacity: show ? 1 : 0,
      transition: "0.4s",
    }}
  >
    {text}
  </span>
);

const LoginPage = () => {
  const showOauthButton = false;

  const status = "error";

  return (
    <LoginLayout float align="center" logo="/logo.png" title="后台管理" desc="欢迎回来" footer={<LoginLayout.Footer copyright="2023 IHCCC" />}>
      <MessageText show={status === "error"} text={"登录失败！"} />
      {showOauthButton ? (
        <OauthButton
          source={{ avatar: "", name: "应用名称" }}
          target={{ avatar: "", name: "应用名称" }}
          onConfirm={() => alert("onConfirm")}
          onCancel={() => {
            window.close();
          }}
        />
      ) : (
        <LoginForm loading={false} initialValues={{}} onSend={() => alert("onSend")} onFinish={() => alert("onFinish")} />
      )}
      <ExtraForm onGithub={() => alert("onGithub")} />
    </LoginLayout>
  );
};

export default LoginPage;
