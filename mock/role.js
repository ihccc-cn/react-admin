import UnrealService from "base-components-antd/lib/utils/UnrealService";

const initData = [
  {
    name: "管理员",
    key: "admin",
    enable: "1",
    remark: "平台管理员",
  },
  {
    name: "游客",
    key: "guest",
    enable: "0",
    remark: "平台管理员",
  },
];

const role = new UnrealService(initData, {
  queryType: {
    name: "like",
    key: "like",
    enable: "is",
  },
});

export default [
  {
    url: "/role/query",
    method: "GET",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await role.query(req.query)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/role/create",
    method: "POST",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await role.create(req.body)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/role/update",
    method: "POST",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await role.update(req.body)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/role/remove",
    method: "POST",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await role.remove(req.body)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/role/enable",
    method: "POST",
    rawResponse: async (req, res) => {
      try {
        const { id, enable } = req.body;
        res.end(JSON.stringify(await role.update({ id, enable })));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
  {
    url: "/role/list",
    method: "GET",
    rawResponse: async (req, res) => {
      try {
        res.end(JSON.stringify(await role.list(req.query)));
      } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ code: "-1", error }));
      }
    },
  },
];
