import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePatientAsync } from "./patientSlice";

export const PatientDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { patients } = useSelector(({ patients }) => patients);
  const findPatient = patients.find((patient) => patient._id === id);
  console.log(findPatient);

  const deletePatientHandler = (id) => {
    dispatch(deletePatientAsync({ patientId: id }));
    navigate("/");
  };

  return (
    <div className="detail">
      <div className="individual">
        <div className="info">
          <div>
            <strong>Name:</strong>
          </div>
          <div>{findPatient?.name}</div>
        </div>
        <div className="info">
          <div>
            <strong>Age:</strong>
          </div>
          <div>{findPatient?.age}</div>
        </div>
        <div className="info">
          <div>
            <strong>Gender:</strong>
          </div>
          <div>{findPatient?.gender}</div>
        </div>
        <div className="info">
          <div>
            <strong>Medical History:</strong>
          </div>
          <div>{findPatient?.medicalHistory}</div>
        </div>
        <div className="info">
          <div>
            <strong>Contact:</strong>
          </div>
          <div>{findPatient?.contact}</div>
        </div>
        <div className="info">
          <div>
            <strong>Ward:</strong>
          </div>
          <div>{findPatient?.ward?.ward}</div>
        </div>
        <div className="info">
          <div>
            <strong>Ward Type:</strong>
          </div>
          <div>{findPatient?.ward?.specializations}</div>
        </div>
        <div className="action_btns">
          <Link to="/edit/patient" state={findPatient}>
            <button className="add_btn submit_btn">Edit</button>
          </Link>
          <button
            onClick={() => deletePatientHandler(findPatient._id)}
            className="delete_btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
