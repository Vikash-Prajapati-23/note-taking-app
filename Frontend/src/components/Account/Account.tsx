import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";
import rightColumn from "../../assets/right-column.png";
import logo from "../../assets/top.png";
import { useState } from "react";

type Step = "initial" | "otp";

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

const Account: React.FC<AccountProps> = ({
  step,
  handleOTP,
  formData,
  setFormData,
  handleSignUp,
}) => {
  const [isSignUp, setIsSighnUp] = useState(false);

  const handleToggle = () => {
    setIsSighnUp((sign) => (sign = !sign));
  };

  return (
    <div className={`h-screen md:flex justify-center items-center md:mt-0 ${isSignUp ? "mt-[35%]" : "mt-[25%]" } `}>
      <div className="relative p-1 md:border-[1px] lg:w-[900px] md:w-[700px] rounded-2xl ">
        <div className="flex justify-center items-center">
          <div className="md:flex-1/3">
            <span className="md:absolute top-5 left-[-12%] ">
              <img src={logo} className="w-fit" alt="logo-image" />
            </span>
            <div className="w-[100%] lg:p-10 p-5 ">
              {!isSignUp ? (
                <Signup
                  step={step}
                  handleOTP={handleOTP}
                  formData={formData}
                  setFormData={setFormData}
                  handleSignUp={handleSignUp}
                />
              ) : (
                <Signin
                  step={step}
                  handleOTP={handleOTP}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              <div className="flex justify-center mt-5 ">
                <span className="text-gray-500 text-sm me-2">
                  Already have an account??
                </span>
                <span
                  onClick={handleToggle}
                  className="text-sm font-semibold text-blue-600 underline cursor-pointer "
                >
                  Sign in
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1/2 md:block hidden">
            <img
              src={rightColumn}
              className="lg:h-[600px] w-[550px] "
              alt="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
