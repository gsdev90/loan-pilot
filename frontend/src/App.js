import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoanApplication from './pages/LoanApplication';
import LoanDashboard from './pages/LoanDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanApplication />} />
        <Route path="/dashboard" element={<LoanDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React from 'react';
// import LoanDashboard from './pages/LoanDashboard'; // Adjust the path if needed

// function App() {
//   return (
//     <div>
//       <LoanDashboard />
//     </div>
//   );
// }

// export default App;