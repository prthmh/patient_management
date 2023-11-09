import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWardAsync } from "./wardSlice";

export const WardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { wards } = useSelector(({ wards }) => wards);
  const findWard = wards.find((ward) => ward._id === id);
  console.log(findWard);

  const deleteWardHandler = (id) => {
    dispatch(deleteWardAsync({ wardId: id }));
    navigate("/ward");
  };

  return (
    <div className="detail">
      <div className="individual">
        <div className="info">
          <div>
            <strong>Ward:</strong>
          </div>
          <div>{findWard?.ward}</div>
        </div>
        <div className="info">
          <div>
            <strong>Specializations:</strong>
          </div>
          <div>{findWard?.specializations}</div>
        </div>
        <div className="info">
          <div>
            <strong>Capacity:</strong>
          </div>
          <div>{findWard?.capacity}</div>
        </div>
        <div className="action_btns">
          <Link to="/edit/ward" state={findWard}>
            <button className="add_btn submit_btn">Edit</button>
          </Link>
          <button
            onClick={() => deleteWardHandler(findWard._id)}
            className="delete_btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
