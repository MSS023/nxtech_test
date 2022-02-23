import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "../screens/user-login/UserLogin";
import AdminLogin from "../screens/admin-login/AdminLogin";
import Dashboard from "../screens/dashboard/Dashboard";

function Navigation(props) {
  const admin = useSelector((state) => state.admin);
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route
        path="/Dashboard"
        element={admin.login ? <Dashboard /> : <Navigate replace to="/Admin" />}
      />
      <Route
        path="/Admin"
        element={admin.login ? <Navigate replace to="/Dashboard" /> : <AdminLogin />}
      />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default Navigation;
