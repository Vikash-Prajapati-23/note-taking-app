import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Access your base URL like this:
const baseUrl = import.meta.env.VITE_BASE_URL;

interface FormData {
  fullName: string;
  email: string;
  dob: string;
  otp: string;
}

type Step = "initial" | "otp";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    dob: "",
    otp: "",
  });

  const [step, setStep] = useState<Step>("initial");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/auth/send-otp`, {
        fullName: formData.fullName,
        email: formData.email,
        dob: formData.dob,
      });
      toast.success("OTP sent successfully!");
      // toast("Processing your request...")

      setMessage((res.data as { message: string }).message);
      setStep("otp"); // Move to OTP input step
    } catch (error: any) {
      toast.error("Failed to send OTP, please try again.");
      setMessage(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/auth/verify-otp`, formData, {
        withCredentials: true,
      });
      setMessage((res.data as { message: string }).message);

      navigate("/Note");
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === "initial") {
      handleSendOtp();
    } else {
      handleVerifyOtp(e);
    }
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 p-2 w-full text-white rounded-lg cursor-pointer haver:bg-blue-600 transition ease-in .3s"
        >
          {loading
            ? "Processing..."
            : step === "initial"
            ? "Send OTP"
            : "Verify OTP & Sign Up"}
        </button>

        {message && (
          <p className="text-sm text-center text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
