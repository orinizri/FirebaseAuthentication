import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/authContext";
import Signup from "./signup";
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Dashboard from "./dashboard";
import Login from "./login";
import PrivateRoute from "./privateRoute";
import ForgotPassword from "./forgotpassword";
import Profile from "./Profile/profile";


function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <BrowserRouter>
            <Routes >
              <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
              <Route path='/update-profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
