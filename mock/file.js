export default [
  {
    url: "/api-mock/files/upload",
    method: "POST",
    timeout: 200,
    response: {
      code: "0",
      data: {
        url: "/logo.png",
        name: "logo.png",
        size: "8.52kb",
      },
    },
  },
];
