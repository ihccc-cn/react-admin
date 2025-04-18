import { UnrealService } from "@wowon/components/lib/utils";

const initData = [
  {
    avatar: "/pdx.jpg",
    name: "派大星",
    username: "MR.PAI",
    password: "12345678",
    roles: [{ name: "管理员", key: "admin" }],
    status: "1",
    email: "pdm@123.com",
    phone: "11223389",
    brithday: "2009-12-01",
    address: "比奇堡",
    description: "他是一只粉红色的海星，说话嗓音粗，头脑简单，四肢发达，海绵宝宝的好朋友。",
  },
  {
    avatar: "/hmbb.jpg",
    name: "海绵宝宝",
    username: "MR.BABY",
    password: "12345678",
    roles: [{ name: "管理员", key: "admin" }],
    status: "1",
    email: "hmbb@123.com",
    phone: "11223356",
    brithday: "-8928-06-07",
    address: "比奇堡",
    description: "生活在太平洋海底一座被称为比奇堡的城市，身份是蟹堡王餐厅的高级厨师。黄色长方形海绵，其身体构成如同清洁用海绵。",
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
    rawResponse: async (_, res) => {
      res.setHeader("Content-Type", "application/json;charset=UTF-8");
      try {
        res.end(JSON.stringify(await user.profile({ name: "派大星" })));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/user/query",
    method: "GET",
    rawResponse: async (req, res) => {
      res.setHeader("Content-Type", "application/json;charset=UTF-8");
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
      res.setHeader("Content-Type", "application/json;charset=UTF-8");
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
      res.setHeader("Content-Type", "application/json;charset=UTF-8");
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
      res.setHeader("Content-Type", "application/json;charset=UTF-8");
      try {
        res.end(JSON.stringify(await user.remove(req.body)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
];
