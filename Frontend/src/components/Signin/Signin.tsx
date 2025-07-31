import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface FormData {
  email: string;
  otp: string;
}

type Step = "initial" | "opt";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("initial");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/auth/send-otp`, {
        email: formData.email,
      });
      // toast.success("OTP sent successfully!");
      // toast("Processing your request...")
      toast.success((res.data as { message: string }).message);
      setStep("opt"); // Move to OTP input step
    } catch (error: any) {
      toast.error("Failed to send OTP, please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/handle-sign-in`,
        formData,
        {
          withCredentials: true,
        }
      );
      // loading;
      
      navigate("/Note");
      toast.success((res.data as { message: string }).message);
    } catch (error) {
      console.error("Sign In failed.!", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === "initial") {
      handleSendOtp();
    } else {
      handleSignIn(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1 ">Sign up</h1>
      <span className="text-gray-500 text-sm ">
        Sign up to enjoy the feature of HD
      </span>

      <form onSubmit={handleSubmit} className="mt-6 ">
        <div className="flex flex-col mb-5 relative ">
          <label
            className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
            type="email"
            placeholder="Enter your name"
          />
        </div>

        {step === "opt" ? (
          <div className="flex flex-col mb-5 relative ">
            <label
              className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              onChange={handleChange}
              className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
              type="text"
              placeholder="Enter OTP"
            />
          </div>
        ) : (
          ""
        )}

        <button
          className="bg-blue-500 p-2 w-full text-white rounded-lg cursor-pointer "
          disabled={loading}
          type="submit"
        >
          {loading
            ? "Processing..."
            : step === "initial"
            ? "Send OTP"
            : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
