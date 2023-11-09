import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const gettActiveStyles = ({ isActive }) => ({
    borderBottom: isActive && "3px solid var(--primary)"
  });
  return (
    <div className="navbar">
      <NavLink to="/" className="nav_element">
        <h2 style={{ margin: 0 }} className="logo">
          Patient Management
        </h2>
      </NavLink>
      <div className="operation_pages">
        <NavLink to="/" className="nav_element" style={gettActiveStyles}>
          Patients
        </NavLink>
        <NavLink to="/ward" className="nav_element" style={gettActiveStyles}>
          Wards
        </NavLink>
        <NavLink
          to="/hospital"
          className="nav_element"
          style={gettActiveStyles}
        >
          Hospital
        </NavLink>
      </div>
    </div>
  );
};
