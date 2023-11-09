import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchWards } from "../features/ward/wardSlice";
import { WardList } from "../features/ward/WardList";

export const WardView = () => {
  const { wards, status, error } = useSelector(({ wards }) => wards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWards());
  }, []);
  console.log(wards);
  return (
    <div>
      {/* {status === "loading" && <h3>Loading...</h3>} */}
      {status === "error" && <p>{error}</p>}
      <div className="header">
        <h2>Wards View</h2>
        <button onClick={() => navigate("/add/ward")} className="add_btn">
          Add Ward
        </button>
      </div>
      <div className="list">
        <WardList wards={wards} />
      </div>
    </div>
  );
};
