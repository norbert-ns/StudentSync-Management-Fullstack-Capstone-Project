import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllStudents from './pages/AllStudents';
import StudentDetails from './pages/StudentDetails';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/students/:id" element={<StudentDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;