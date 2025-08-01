import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import Note from "./components/Note/Note";
import axios from "axios";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface FormData {
  fullName: string;
  email: string;
  dob: string;
  otp: string;
}

type Step = "initial" | "otp";

function App() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    dob: "",
    otp: "",
  });

  const [step, setStep] = useState<Step>("initial");

  const handleOTP = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/send-otp`, {
        fullName: formData.fullName,
        email: formData.email,
        dob: formData.dob,
      });
      toast.success((res.data as { message: string }).message);
      // toast("Processing your request...")

      setStep("otp");
    } catch (error: any) {
      toast.error("Failed to send OTP, please try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/verify-otp`, formData, {
        withCredentials: true,
      });
      toast.success((res.data as { message: string }).message);

      window.location.href = "/Note";
    } catch (error: any) {
      toast.error("Sign up failed, please try again.");
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Account
                step={step}
                handleOTP={handleOTP}
                formData={formData}
                setFormData={setFormData}
                handleSignUp={handleSignUp}
              />
            }
          />
          <Route path="/Note" element={<Note formData={formData} setFormData={setFormData} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
