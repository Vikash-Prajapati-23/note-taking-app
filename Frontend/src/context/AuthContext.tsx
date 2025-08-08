import axios from "axios"; // ✅ Uncomment this
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL;

type User = { fullName: string; email: string } | null;
interface FormData {
  fullName: string;
  email: string;
  dob: string;
  otp: string;
}

interface AuthContextType {
  user: User;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => void;
  logout: () => void;
  loading: boolean; // ✅ Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    dob: "",
    otp: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true); // ✅ Add loading state

  interface FetchUserResp { 
    userData: { fullName: string; email: string }; 
    message: string; 
  }

  const checkAuth = async () => {
    try {
      setLoading(true); // ✅ Set loading to true
      const res = await axios.get<FetchUserResp>(`${baseUrl}/api/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data.userData);
      setIsAuthenticated(true);
      setFormData(prev => ({ 
        ...prev, 
        fullName: res.data.userData.fullName, 
        email: res.data.userData.email 
      }));
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth(); // runs once on app load to restore session from cookie
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/handle-sign-out`, {
        withCredentials: true,
      });
      toast.success((response.data as { message: string }).message);
      setUser(null);
      setIsAuthenticated(false);
      setFormData({
        fullName: "",
        email: "",
        dob: "",
        otp: "",
      });
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        checkAuth,
        formData,
        isAuthenticated,
        setIsAuthenticated,
        setFormData,
        logout,
        loading, // ✅ Provide loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};