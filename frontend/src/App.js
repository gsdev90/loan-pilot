import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoanApplication from './pages/LoanApplication';
import LoanDashboard from './pages/LoanDashboard';
import LoanList from './pages/LoanList';
import LoanDetail from './pages/LoanDetail';
import LoanEdit from './pages/LoanEdit';
import LenderList from './pages/LenderList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanApplication />} />
        <Route path="/dashboard" element={<LoanDashboard />} />
        <Route path="/loans" element={<LoanList />} />  {/* 👈 New route */}
        <Route path="/loan-list/:id" element={<LoanDetail />} />
        <Route path="/loan-list/:id/edit" element={<LoanEdit />} />
        <Route path="/lenders" element={<LenderList />} />
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