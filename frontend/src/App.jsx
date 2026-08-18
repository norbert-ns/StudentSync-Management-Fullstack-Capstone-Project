/* 
React codes for App.jsx will go here
path: frontend/src/App.jsx
*/

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home.jsx';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem' }}>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;