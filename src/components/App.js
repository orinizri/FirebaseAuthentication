import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/authContext";
import Signup from "./signup";
import { Routes, BrowserRouter, Route, Router } from 'react-router-dom'
import Dashboard from "./dashboard";
import Login from "./login";
import PrivateRoute from "./privateRoute";


function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <BrowserRouter>
            <Routes >
              <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

export default App;
