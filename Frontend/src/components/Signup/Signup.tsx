import React, { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  dob: string;
  otp: string;
}
interface AccountProps {
  step: Step;
  handleOTP: () => Promise<void>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSignUp: () => Promise<void>;
}

type Step = "initial" | "otp";

const SignupForm: React.FC<AccountProps> = ({
  step,
  handleOTP,
  formData,
  setFormData,
  handleSignUp,
}) => {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    setLoading(true);
    handleOTP();
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    handleSignUp();
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === "initial") {
      handleSendOtp();
    } else {
      handleVerifyOtp();
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

        {/* {message && (
          <p className="text-sm text-center text-red-600">{message}</p>
        )} */}
      </form>
    </div>
  );
};

export default SignupForm;
