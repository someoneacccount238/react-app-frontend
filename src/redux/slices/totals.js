import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

//read
export const fetchEntries = createAsyncThunk("mytotals", async () => {
  const { data } = await axios.get("/mytotals");
  return data;
});

//create
export const addFoodEntry = createAsyncThunk("mytotals/add", async () => {
  const { data } = await axios.post("/mytotals/add");
  return data;
});
//delete
export const removeFoodEntry = createAsyncThunk("mytotals/remove", async () => {
  const { data } = await axios.delete("/mytotals/:id");
  return data;
});

const initialState = {
  entries: {
    items: [],
    status: "loading",
  },
};

const myTotalsSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.pending, (state, action) => {
      state.entries.items = action.payload;
      state.entries.status = "loading";
    });
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.entries.items = action.payload;
      state.entries.status = "loaded";
    });
    builder.addCase(fetchEntries.rejected, (state) => {
      state.entries.items = [];
      state.entries.status = "error";
    });
  },
});

export const entriesReducer = myTotalsSlice.reducer;
