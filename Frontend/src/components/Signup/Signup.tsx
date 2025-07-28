// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [isOtp, setIsOtp] = useState(false);

//   const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     navigate("/Note");
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-1 ">Sign up</h1>
//       <span className="text-gray-500 text-sm ">
//         Sign up to enjoy the feature of HD
//       </span>

//       <form onSubmit={handleNavigate} className="mt-6 ">
//         <div className="flex flex-col mb-5 relative ">
//           <label
//             className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
//             htmlFor="name"
//           >
//             Your Name
//           </label>
//           <input
//             id="name"
//             className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
//             type="text"
//             placeholder="Enter your name"
//           />
//         </div>
//         <div className="flex flex-col mb-5 relative ">
//           <label
//             className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
//             htmlFor="birth-date"
//           >
//             Date of Birth
//           </label>
//           <input
//             id="birth-date"
//             className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
//             type="date"
//             placeholder="Enter your name"
//           />
//         </div>
//         <div className="flex flex-col mb-5 relative ">
//           <label
//             className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
//             htmlFor="email"
//           >
//             Your Email
//           </label>
//           <input
//             id="email"
//             className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
//             type="email"
//             placeholder="Enter your name"
//           />
//         </div>

//         {isOtp && (
//           <div className="flex flex-col mb-5 relative ">
//             <label
//               className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
//               htmlFor="password"
//             >
//               OTP
//             </label>
//             <input
//               id="password"
//               className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
//               type="password"
//               placeholder="Enter your name"
//             />
//           </div>
//         )}

//         <button
//           // onClick={handleNavigate}
//           className="bg-blue-500 p-2 w-full text-white rounded-lg cursor-pointer "
//           type="submit"
//         >
//           Send OTP
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

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
      toast.success("OTP verified successfully!");
      // toast("Processing your request...")

      setMessage((res.data as { message: string }).message);
      setStep("otp"); // Move to OTP input step
    } catch (error: any) {
      toast.error("Invalid OTP, please try again.");
      setMessage(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/auth/verify-otp`, formData);
      setMessage((res.data as { message: string }).message);

      // ✅ Redirect to dashboard after success
      window.location.href = "/dashboard";
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "initial") {
      handleSendOtp();
    } else {
      handleVerifyOtp();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="date"
        placeholder="dob"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      {step === "otp" && (
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          title="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading
          ? "Processing..."
          : step === "initial"
          ? "Send OTP"
          : "Verify OTP & Sign Up"}
      </button>

      {message && <p className="text-sm text-center text-red-600">{message}</p>}
    </form>
  );
};

export default SignupForm;
