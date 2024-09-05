import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../../firebase.config.js";
import useAxiosCommon from "@/Hooks/useAxiosCommon.jsx";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxiosCommon();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, google);
  };
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, github);
  };
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const logOut = async () => {
    setLoading(true);
    await axios.get("logout", {
      withCredentials: true,
    });
    return signOut(auth);
  };
  const getToken = async (email) => {
    const { data } = await axios.post(
      "jwt",
      { email },
      { withCredentials: true }
    );
    return data;
  };
  const addUser = async (user) => {
    const currentUser = {
      email: user?.email,
      name: user.displayName,
      image: user.photoURL,
      role: "user",
      requested: "user",
    };
    const { data } = await axios.put("users", currentUser);
    return data;
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getToken(currentUser.email);
        addUser(currentUser);
      }
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  });

  const authInfo = {
    auth,
    user,
    loading,
    setLoading,
    createUser,
    updateUser,
    googleLogin,
    githubLogin,
    logIn,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
