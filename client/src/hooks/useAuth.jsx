import { useContext } from "react";
import AuthContext from "../context/authCtx";

function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("Hook must be used within a Provider");
  }

  return ctx;
}

export default useAuth;
