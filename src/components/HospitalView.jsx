import { useSelector } from "react-redux";

export const HospitalView = () => {
  const { patients } = useSelector(({ patients }) => patients);
  const { wards } = useSelector(({ wards }) => wards);

  const totPatients = patients.length;

  const totCapacity = wards.reduce((total, curr) => total + curr.capacity, 0);

  const occupancyRate = totCapacity ? (totPatients / totCapacity) * 100 : 0;

  const wardOccupancy = patients.reduce((acc, { ward: { ward } }) => {
    acc[ward] = (acc[ward] || 0) + 1;
    return acc;
  }, {});

  const topWard = Object.keys(wardOccupancy).reduce((top, ward) => {
    if (wardOccupancy[top]) {
      if (wardOccupancy[ward] > wardOccupancy[top]) {
        return ward;
      }
    } else {
      return ward;
    }
    return top;
  }, "");

  const topWardType = wards.find((ward) => ward.ward === Number(topWard));
  console.log(topWardType);

  return (
    <div className="hospital_view">
      <div className="hospital_detail">
        <div className="info">
          <div>
            <strong>No. of patients:</strong>
          </div>
          <div>{totPatients}</div>
        </div>
        <div className="info">
          <div>
            <strong>Total Capacity of hospital:</strong>
          </div>
          <div>{totCapacity}</div>
        </div>
        <div className="info">
          <div>
            <strong>Hospital Occupancy:</strong>
          </div>
          <div>{occupancyRate.toFixed(2)}</div>
        </div>
        <div className="info">
          <div>
            <strong>Top Ward:</strong>
          </div>
          <div>{topWard}</div>
        </div>
        <div className="info">
          <div>
            <strong>Top Ward Type:</strong>
          </div>
          <div>{topWardType.specializations}</div>
        </div>
      </div>
    </div>
  );
};
