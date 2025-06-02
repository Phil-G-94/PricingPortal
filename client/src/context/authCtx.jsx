import { createContext } from "react";

const ctx = {
  isAuthed: false,
  loadingAuth: false,
  fetchAuth: undefined,
};

const AuthContext = createContext(ctx);

export default AuthContext;
