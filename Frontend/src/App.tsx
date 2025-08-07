import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import Note from "./components/Note/Note";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import ErrorPage from "./error/Error";
import { AuthProvider, useAuth } from "./context/AuthContext";

const baseUrl = import.meta.env.VITE_BASE_URL;

// interface FormData {
//   fullName: string;
//   email: string;
//   dob: string;
//   otp: string;
// }

type Step = "initial" | "otp";

function App() {
  // const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, formData } = useAuth();
  // const [formData, setFormData] = useState<FormData>({
  //   fullName: "",
  //   email: "",
  //   dob: "",
  //   otp: "",
  // });
  const [step, setStep] = useState<Step>("initial");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsAuthenticated(!!token);
  // }, []);

  const handleOTP = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/send-otp`, {
        fullName: formData.fullName,
        email: formData.email,
        dob: formData.dob,
      });
      toast.success((res.data as { message: string }).message);
      setStep("otp");
    } catch (error: any) {
      toast.error("Failed to send OTP, please try again.");
    }
  };

  // const handleSignUp = async () => {
  //   try {
  //     const res = await axios.post(`${baseUrl}/api/auth/verify-otp`, formData, {
  //       withCredentials: true,
  //     });
  //     toast.success((res.data as { message: string }).message);
  //     setIsAuthenticated(true);
  //     window.location.href = "/Note";
  //   } catch (error: any) {
  //     toast.error("Sign up failed, please try again.");
  //   }
  // };

  return (
    <>
      <Router>
        {/* <AuthProvider > */}
          
        <Routes>
          <Route
            path="/"
            element={
              <Account
                step={step}
                handleOTP={handleOTP}
                // formData={formData}
                // setFormData={setFormData}
                // handleSignUp={handleSignUp}
                // isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/Note"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Note />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </>
  );
}

export default App;
