import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// interface FormData {
//   fullName: string;
//   email: string;
//   dob: string;
//   otp: string;
// }
interface AccountProps {
  step: Step;
  handleOTP: () => Promise<void>;
  // formData: FormData;
  // setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  // handleSignUp: () => Promise<void>;
}

type Step = "initial" | "otp";

const SignupForm: React.FC<AccountProps> = ({
  step,
  handleOTP,
  // formData,
  // setFormData,
  // handleSignUp,
}) => {
  const { formData, setFormData, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    setLoading(true);
    handleOTP();
    setTimeout(() => {
      setResendOtp(true);
    }, 10000);
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
     try {
      const res = await axios.post(`${baseUrl}/api/auth/verify-otp`, formData, {
        withCredentials: true,
      });
      toast.success((res.data as { message: string }).message);
      setIsAuthenticated(true);
      navigate("/Note");
      // window.location.href = "/Note";
    } catch (error: any) {
      toast.error("Sign up failed, please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === "initial") {
      handleSendOtp();
    } else {
      handleVerifyOtp(e);
    }
  };

  const handleResendOtp = () => {
    handleOTP();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1 ">Sign up</h1>
      <span className="text-gray-500 text-sm ">
        Sign up to enjoy the feature of HD
      </span>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col mb-5 relative ">
          <label
            className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
            htmlFor="name"
          >
            Your Name
          </label>
          <input
            type="text"
            name="fullName"
            title="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded border-gray-400"
          />
        </div>

        <div className="flex flex-col mb-5 relative ">
          <label
            className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
            htmlFor="birth-date"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            title="EmailP"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded border-gray-400"
          />
        </div>

        <div className="flex flex-col mb-5 relative ">
          <label
            className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
            htmlFor="birth-date"
          >
            Date of Birth
          </label>
          <input
            type="date"
            title="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded border-gray-400"
          />
        </div>

        {step === "otp" && (
          <div className="flex flex-col mb-5 relative ">
            <label
              className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
              htmlFor="password"
            >
              OTP
            </label>
            <input
              type="text"
              name="otp"
              title="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded border-gray-400"
            />
          </div>
        )}

        {resendOtp && (
          <button
            className="text-blue-500 underline mb-5 cursor-pointer"
            onClick={handleResendOtp}
            type="button"
          >
            Resend OTP
          </button>
        )}

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed  p-2 w-full text-white rounded-lg cursor-pointer haver:bg-blue-600 transition ease-in .3s"
        >
          {loading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-6 w-6"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="32"
                  strokeDashoffset="32"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    dur="2s"
                    values="0 32;16 16;0 32;0 32"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dashoffset"
                    dur="2s"
                    values="0;-16;-32;-32"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          ) : step === "initial" ? (
            "Send OTP"
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
