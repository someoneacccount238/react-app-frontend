import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { entriesReducer } from "./slices/totals";
import { calendarReducer } from "./slices/calendar";

// const defaultState={
//     cash:0
// }

// const reducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case "ADD_CASH":
//       return { ...state, cash: state.cash + action.payload };
//     case "GET_CASH":
//       return { ...state, cash: state.cash - action.payload };
//     default:
//       return state;
//   }
// };

const store = configureStore({
  reducer: {
    auth: authReducer,
    totals: entriesReducer,
    calendar:calendarReducer
  },
});

export default store;
