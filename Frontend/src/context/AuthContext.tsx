// import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
//   useEffect,
  type ReactNode,
} from "react";
// import { Navigate } from "react-router-dom";
// import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface FormData {
  fullName: string;
  email: string;
  dob: string;
  otp: string;
}

interface AuthContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
//   checkAuthStatus: () => void;
//   handleSignUp: () => void;
//   login: () => void;
//   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    dob: "",
    otp: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check auth status by calling your backend
//   const checkAuthStatus = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/api/auth/verify-otp`, {
//         withCredentials: true, // Send cookies
//       });

//       // If backend responds successfully, user is authenticated
//       setIsAuthenticated(true);
//     } catch (error) {
//       // If backend returns 401/403, user is not authenticated
//       setIsAuthenticated(false);
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(`${baseUrl}/api/auth/verify-otp`, formData, {
//         withCredentials: true,
//       });
//       toast.success((res.data as { message: string }).message);
//       setIsAuthenticated(true);
//       window.location.href = "/Note";
//     } catch (error: any) {
//       toast.error("Sign up failed, please try again.");
//     }
//   };

//   const login = async () => {
//     try {
//       const res = await axios.post(`${baseUrl}/api/auth/sign-in`, formData, {
//         withCredentials: true,
//       });
//       toast.success((res.data as { message: string }).message);
//       setIsAuthenticated(true);
//       window.location.href = "/Note";
//     } catch (error: any) {
//         toast.error("Sign up failed, please try again.");
//     }
//     // localStorage.setItem("token", token);
//     // setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     return <Navigate to="/Note" replace />;
//   };

  return (
    <AuthContext.Provider
      value={{
        // checkAuthStatus,
        formData,
        isAuthenticated,
        setIsAuthenticated,
        setFormData,
        // handleSignUp,
        // login,
        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
