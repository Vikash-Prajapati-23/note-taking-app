import { useState } from "react";

const Signin = () => {
  const [isOtp] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1 ">Sign up</h1>
      <span className="text-gray-500 text-sm ">
        Sign up to enjoy the feature of HD
      </span>

      <form action="" className="mt-6 ">
        <div className="flex flex-col mb-5 relative ">
          <label
            className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            id="email"
            className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
            type="email"
            placeholder="Enter your name"
          />
        </div>

        {isOtp && (
          <div className="flex flex-col mb-5 relative ">
            <label
              className="text-gray-500 absolute text-xs px-1 bg-white top-[-16%] left-[4%] "
              htmlFor="password"
            >
              OTP
            </label>
            <input
              id="password"
              className="border-[1px] border-gray-400 rounded-lg py-2 px-3 "
              type="password"
              placeholder="Enter your name"
            />
          </div>
        )}

        <button
          className="bg-blue-500 p-2 w-full text-white rounded-lg cursor-pointer "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
