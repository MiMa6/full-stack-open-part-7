import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", type: "" },
  reducers: {
    setNotificationState(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    delNotifictionState() {
      return { message: "", type: "" };
    },
  },
});

export const { setNotificationState, delNotifictionState } =
  notificationSlice.actions;

export const setNotification = (message, type, time) => {
  return async (dispatch) => {
    dispatch(setNotificationState({ message, type }));
    setTimeout(() => {
      dispatch(delNotifictionState());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
