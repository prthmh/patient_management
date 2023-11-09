import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchPatients } from "../features/patient/patientSlice";
import { PatientList } from "../features/patient/PatientList";
import { fetchWards } from "../features/ward/wardSlice";

export const PatientView = () => {
  const { patients, status, error } = useSelector(({ patients }) => patients);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, []);
  console.log(patients);
  return (
    <div>
      {/* {status === "loading" && <h3>Loading...</h3>} */}
      {status === "error" && <p>{error}</p>}
      <div className="header">
        <h2>Patients View</h2>
        <button onClick={() => navigate("/add/patient")} className="add_btn">
          Add Patient
        </button>
      </div>
      <div className="list">
        <PatientList patients={patients} />
      </div>
    </div>
  );
};
