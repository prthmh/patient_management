import { Route, Routes } from "react-router-dom";
import "./styles.css";
import { PatientView } from "./components/PatientView";
import { NavBar } from "./components/NavBar";
import { WardView } from "./components/WardView";
import { PatientForm } from "./features/patient/PatientForm";
import { WardForm } from "./features/ward/WardForm";
import { PatientDetail } from "./features/patient/PatientDetail";
import { WardDetail } from "./features/ward/WardDetail";
import { HospitalView } from "./components/HospitalView";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<PatientView />} />
        <Route path="/ward" element={<WardView />} />
        <Route path="/add/patient" element={<PatientForm />} />
        <Route path="/edit/patient" element={<PatientForm />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
        <Route path="/add/ward" element={<WardForm />} />
        <Route path="/edit/ward" element={<WardForm />} />
        <Route path="/ward/:id" element={<WardDetail />} />
        <Route path="/hospital" element={<HospitalView />} />
      </Routes>
    </div>
  );
}
