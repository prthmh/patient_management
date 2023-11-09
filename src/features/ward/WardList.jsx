import { useNavigate } from "react-router-dom";

export const WardList = ({ wards }) => {
  const navigate = useNavigate();
  return (
    <div className="patient_list">
      <table>
        <thead>
          <tr>
            <th>Ward</th>
            <th>Specialization</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {wards.map(({ _id, ward, specializations, capacity }) => (
            <tr
              key={_id}
              onClick={() => navigate(`/ward/${_id}`)}
              className="list_item"
              title="Go to ward detail"
            >
              <td>{ward}</td>
              <td>{specializations}</td>
              <td>{capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
