import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AllStudents from "./pages/AllStudents.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<AllStudents />} />
      <Route path="/students/:id" element={<StudentDetails />} />
    </Routes>
  );
}

export default App;