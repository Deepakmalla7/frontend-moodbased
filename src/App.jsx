import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddSong from "./components/AddSong.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import About from "./components/AboutUs.jsx"; // Ensure case matches filename
import HomePage from "./components/HomePage.jsx";
import { New } from "./components/NewHome.jsx";
import UserTable from "./components/UserTable.jsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect '/' to '/signup' */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new" element={<New />} />

        
        {/* Dashboard with nested routes */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<HomePage />} /> {/* Default Page */}
          <Route path="addsong" element={<AddSong />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="aboutus" element={<About />} />
          <Route path="users" element={<UserTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
