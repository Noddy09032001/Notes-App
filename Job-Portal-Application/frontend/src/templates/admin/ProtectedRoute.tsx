import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface User {
  id: string;
  role: string;
}

interface AuthState {
  user: User | null;
}

interface RootState {
  auth: AuthState;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useSelector((store: RootState) => store.auth);
  //const user:any = ""
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};
export default ProtectedRoute;
