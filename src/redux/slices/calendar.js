import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

//read
export const fetchDateEntries = createAsyncThunk("calendar", async (id) => {
  const { data } = await axios.get(`/calendar/:${id}`);
  return data;
});

//create
export const addDateEntry = createAsyncThunk("calendar/add", async () => {
  const { data } = await axios.post("/calendar/add");
  return data;
});

const initialState = {
  entries: {
    items: [],
    status: "loading",
  },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDateEntries.pending, (state, action) => {
      state.entries.items = action.payload;
      state.entries.status = "loading";
    });
    builder.addCase(fetchDateEntries.fulfilled, (state, action) => {
      state.entries.items = action.payload;
      state.entries.status = "loaded";
    });
    builder.addCase(fetchDateEntries.rejected, (state) => {
      state.entries.items = [];
      state.entries.status = "error";
    });
  },
});

export const calendarReducer = calendarSlice.reducer;
