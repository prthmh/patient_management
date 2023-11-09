import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addWardAsync, editWardAsync } from "./wardSlice";

const initialState = {
  ward: "",
  specializations: "",
  capacity: ""
};
export const WardForm = () => {
  const { state: editWard } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wardData, setWardData] = useState(editWard ? editWard : initialState);

  const wardInputHandler = (e) =>
    setWardData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

  const wardSubmitHandler = (e) => {
    e.preventDefault();
    if (
      wardData.ward === "" ||
      wardData.specializations === "" ||
      wardData.capacity === ""
    ) {
      alert("Please fill all the fields.");
    } else {
      if (!editWard) {
        dispatch(addWardAsync(wardData));
      } else {
        dispatch(editWardAsync({ wardId: editWard._id, ward: wardData }));
      }
      setWardData(initialState);
      navigate("/ward");
    }
  };

  return (
    <div className="form">
      <form className="entry_form" onSubmit={wardSubmitHandler}>
        <h2 style={{ margin: 0 }}>{editWard ? "Edit" : "Add"} Ward</h2>
        <label className="form_label">Ward</label>
        <input
          type="number"
          className="from_input"
          name="ward"
          value={wardData.ward}
          onChange={wardInputHandler}
        />
        <label className="form_label">Specialization</label>
        <input
          type="text"
          className="from_input"
          name="specializations"
          value={wardData.specializations}
          onChange={wardInputHandler}
        />
        <label className="form_label">Capacity</label>
        <input
          type="number"
          className="from_input"
          name="capacity"
          value={wardData.capacity}
          onChange={wardInputHandler}
        />
        <button type="submit" className="add_btn submit_btn">
          {editWard ? "Save" : "Add"} Ward
        </button>
      </form>
    </div>
  );
};
