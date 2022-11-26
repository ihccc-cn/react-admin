function access({ userInfo }) {
  return {
    admin: userInfo.admin,
  };
}

export default access;
