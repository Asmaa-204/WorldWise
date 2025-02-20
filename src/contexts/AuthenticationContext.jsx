import { createContext, useContext, useReducer } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "asmaa1234",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("Unknown Action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(FAKE_USER));
    }
  }

  function logout() {
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("user", null);
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context is used outide the provider ");
  return context;
}

export { AuthProvider, useAuth };
