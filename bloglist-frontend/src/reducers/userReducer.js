const userReducer = (state = null, action) => {
  switch (action.type) {
    case "ADD_USER":
      return action.data;
    case "DELETE_USER":
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "ADD_USER",
    data: user,
  };
};

export const clearUser = () => {
  return {
    type: "DELETE_USER",
  };
};

export default userReducer;
