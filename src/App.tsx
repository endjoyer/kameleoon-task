import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Finalize from './pages/Finalize';
import Results from './pages/Results';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/results/:testId" element={<Results />} />
          <Route path="/finalize/:testId" element={<Finalize />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
