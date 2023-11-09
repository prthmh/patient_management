import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: [],
  status: "idle",
  error: null
};

const API_URL = "https://patient-management-api.pratmbr.repl.co/patient";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.patients;
  }
);

export const addPatientAsync = createAsyncThunk(
  "patients/addPatientAsync",
  async (newPatient) => {
    const response = await axios.post(API_URL, newPatient);
    return response.data.patient;
  }
);

export const editPatientAsync = createAsyncThunk(
  "patients/editPatientAsync",
  async ({ patientId, patient }) => {
    const response = await axios.put(`${API_URL}/${patientId}`, patient);
    return response.data.patient;
  }
);

export const deletePatientAsync = createAsyncThunk(
  "patients/deletePatientAsync",
  async ({ patientId }) => {
    const response = await axios.delete(`${API_URL}/${patientId}`);
    return response.data.patient;
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addPatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients.push(action.payload);
    },
    [addPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [editPatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;
      state.patients = state.patients.map((patient) =>
        patient._id === updatedPatient._id ? updatedPatient : patient
      );
    },
    [editPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload._id
      );
    },
    [deletePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default patientSlice.reducer;
