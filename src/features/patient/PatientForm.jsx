import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { genderList } from "../../utils/constants";
import { addPatientAsync, editPatientAsync } from "./patientSlice";

const initialState = {
  name: "",
  age: "",
  gender: "",
  medicalHistory: "",
  contact: "",
  ward: ""
};
export const PatientForm = () => {
  const { state: patient } = useLocation();
  const { wards } = useSelector(({ wards }) => wards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(
    patient ? patient : initialState
  );
  const { name, age, gender, medicalHistory, contact, ward } = patientData;

  const patientInputHandler = (e) =>
    setPatientData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  console.log("p form", patientData);
  const patientSubmitHandler = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      age === "" ||
      contact === "" ||
      gender === "" ||
      medicalHistory === "" ||
      ward === ""
    ) {
      alert("Please fill all the fields.");
    } else {
      if (!patient) {
        dispatch(addPatientAsync(patientData));
      } else {
        dispatch(
          editPatientAsync({ patientId: patient._id, patient: patientData })
        );
      }
      setPatientData(initialState);
      navigate("/");
    }
  };

  return (
    <div className="form">
      <form className="entry_form" onSubmit={patientSubmitHandler}>
        <h2 style={{ margin: 0 }}>{patient ? "Edit" : "Add"} Patient</h2>
        <label className="form_label">Name</label>
        <input
          type="text"
          className="from_input"
          name="name"
          value={name}
          onChange={patientInputHandler}
        />
        <label className="form_label">Age</label>
        <input
          type="text"
          className="from_input"
          name="age"
          value={age}
          onChange={patientInputHandler}
        />
        <label className="form_label">Gender</label>
        <select
          name="gender"
          value={gender}
          onChange={patientInputHandler}
          className="from_input"
        >
          <option value="">Select Gender</option>
          {genderList.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <label className="form_label">Medical History</label>
        <input
          type="text"
          className="from_input"
          name="medicalHistory"
          value={medicalHistory}
          onChange={patientInputHandler}
        />
        <label className="form_label">Contact</label>
        <input
          type="text"
          className="from_input"
          name="contact"
          value={contact}
          onChange={patientInputHandler}
        />
        <label className="form_label">Ward</label>
        <select
          name="ward"
          value={ward._id}
          onChange={patientInputHandler}
          className="from_input"
        >
          <option value="">Select Ward</option>
          {wards.map((ward) => (
            <option
              key={ward._id}
              value={ward._id}
              onChange={patientInputHandler}
            >
              {ward.ward} - {ward.specializations} (Capacity - {ward.capacity})
            </option>
          ))}
        </select>
        <button type="submit" className="add_btn submit_btn">
          {patient ? "Save" : "Add"} Patient
        </button>
      </form>
    </div>
  );
};
