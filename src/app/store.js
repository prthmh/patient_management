import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "../features/patient/patientSlice";
import wardReducer from "../features/ward/wardSlice";

export default configureStore({
  reducer: { patients: patientReducer, wards: wardReducer }
});
