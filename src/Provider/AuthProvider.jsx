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
    try {
      await axios.get("/logout", { withCredentials: true });
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };
  const getToken = async (email) => {
    try {
      const { data } = await axios.post(
        "/jwt",
        { email },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };
  const addUser = async (user) => {
    const email = user?.email?.toLowerCase();
    const loggedUser = {
      email,
      name: user?.displayName,
      image: user?.photoURL,
      phone: "",
      role: "user",
      requested: "user",
    };

    try {
      if (email) {
        try {
          const { data: exist } = await axios.get(`/users/${email}`);
          if (exist?.email) {
            return exist;
          }
        } catch (error) {
          if (error.response?.status === 404) {
            const { data: newUser } = await axios.put("/users", loggedUser);
            console.log("New user added:", newUser);
            return newUser;
          } else {
            throw error;
          }
        }
      } else {
        throw new Error("Email is null or undefined");
      }
    } catch (error) {
      console.error(
        "Error adding or checking user:",
        error.message || error.response?.data
      );
    }
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getToken(currentUser.email);
        const socialMediaProviders = [
          "google.com",
          "github.com",
          "facebook.com",
        ];
        if (
          socialMediaProviders.includes(
            currentUser?.providerData[0]?.providerId
          )
        ) {
          addUser(currentUser);
        }
      }
      setLoading(false);
    });
    return () => unSubscribe();
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
