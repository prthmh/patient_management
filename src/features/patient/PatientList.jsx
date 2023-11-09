import { useNavigate } from "react-router-dom";

export const PatientList = ({ patients }) => {
  const navigate = useNavigate();
  return (
    <div className="patient_list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Ward</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(
            ({ _id, name, age, gender, medicalHistory, ward, contact }) => (
              <tr
                key={_id}
                onClick={() => navigate(`/patient/${_id}`)}
                className="list_item"
                title="Go to patient detail"
              >
                <td>{name}</td>
                <td>{age}</td>
                <td>{gender}</td>
                <td>{ward.ward}</td>
                <td>{contact}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
