import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './screens/admin-login/AdminLogin';
import Dashboard from './screens/dashboard/Dashboard';
import UserLogin from './screens/user-login/UserLogin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="Admin" element={<AdminLogin />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
