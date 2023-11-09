import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wards: [],
  status: "idle",
  error: null
};

const API_URL = "https://patient-management-api.pratmbr.repl.co/ward";

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(API_URL);
  return response.data.wards;
});

export const addWardAsync = createAsyncThunk(
  "wards/addWardAsync",
  async (newWard) => {
    const response = await axios.post(API_URL, newWard);
    return response.data.ward;
  }
);

export const editWardAsync = createAsyncThunk(
  "wards/editWardAsync",
  async ({ wardId, ward }) => {
    const response = await axios.put(`${API_URL}/${wardId}`, ward);
    return response.data.ward;
  }
);

export const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async ({ wardId }) => {
    const response = await axios.delete(`${API_URL}/${wardId}`);
    return response.data.ward;
  }
);

const wardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload);
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [editWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;
      state.wards = state.wards.map((ward) =>
        ward._id === updatedWard._id ? updatedWard : ward
      );
    },
    [editWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload._id
      );
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default wardSlice.reducer;
