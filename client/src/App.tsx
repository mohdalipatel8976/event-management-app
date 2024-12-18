import {BrowserRouter, Routes, Route } from "react-router-dom";
import Themeprovider from "./theme";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/private/home";


function App() {
  return (
   <Themeprovider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
   </BrowserRouter>
   </Themeprovider>
  );
}

export default App
