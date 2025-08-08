import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import Note from "./components/Note/Note";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import ErrorPage from "./error/Error";
import { useAuth } from "./context/AuthContext";

const baseUrl = import.meta.env.VITE_BASE_URL;

type Step = "initial" | "otp";

function App() {
  const { formData } = useAuth();
  const [step, setStep] = useState<Step>("initial");

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

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Account step={step} handleOTP={handleOTP} />}
          />
          <Route
            path="/Note"
            element={
              <ProtectedRoute>
                <Note />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
