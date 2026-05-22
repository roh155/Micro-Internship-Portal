import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register'; // ---> NEW: Import Register
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'sans-serif' }}>
          Micro-Internship Portal
        </h1>
        
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />) : <Login />
            } 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register />} 
          />
          <Route 
            path="/dashboard" 
            element={user && user.role === 'student' ? <Dashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin" 
            element={user && user.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
          />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;