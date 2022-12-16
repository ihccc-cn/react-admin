import UnrealService from "base-components-antd/lib/utils/UnrealService";

const initData = [
  {
    avatar: "/logo.png",
    name: "派大星",
    username: "MR.PAI",
    password: "12345678",
    roles: [{ name: "管理员", key: "admin" }],
    status: "1",
    email: "123@pdm.com",
    phone: "11223389",
    brithday: "2009-12-01",
    address: "比奇堡",
    description: "他是一只粉红色的海星，说话嗓音粗，头脑简单，四肢发达，海绵宝宝的好朋友。",
  },
];

const user = new UnrealService(initData, {
  queryType: {
    name: "like",
    username: "like",
    status: "is",
    email: "like",
    phone: "like",
    address: "like",
  },
});

export default [
  {
    url: "/user/get-token",
    method: "POST",
    timeout: 200,
    response: {
      code: "0",
      data: {
        token_type: "Bearer",
        access_token: "001",
      },
    },
  },
  {
    url: "/user/get-user",
    method: "GET",
    timeout: 200,
    response: {
      code: "0",
      data: {
        id: "100001",
        name: "admin",
        roles: [{ key: "admin" }, { key: "guest" }],
        avatar: "/logo.png",
      },
    },
  },
  {
    url: "/user/query",
    method: "GET",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await user.query(req.query)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/user/create",
    method: "POST",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await user.create(req.body)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/user/update",
    method: "POST",
    rawResponse: async (req, res) => {
      try {
        const { roles, role_key, ...data } = req.body;
        if (role_key.includes("admin")) {
          if (!data.roles) data.roles = [];
          data.roles.push({ name: "管理员", key: "admin" });
        }
        if (role_key.includes("guest")) {
          if (!data.roles) data.roles = [];
          data.roles.push({ name: "游客", key: "guest" });
        }
        res.end(JSON.stringify(await user.update(data)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/user/remove",
    method: "POST",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await user.remove(req.body)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
];
