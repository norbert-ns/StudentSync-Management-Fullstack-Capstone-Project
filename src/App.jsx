import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem' }}>
        {/* Main dashboard content will be added here by teammates */}
      </main>
      <Footer />
    </div>
  );
}

export default App;