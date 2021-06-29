import { createContext, useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import useTheme from "../hooks/useTheme";
import { auth, firebase } from "../services/firebase";
import "../styles/spinner.scss";

type UserProps = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextState = {
  user: UserProps | undefined;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);
    if (res.user) {
      const { displayName, photoURL, uid } = res.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  if (loading) {
    return (
      <div id="loading-page" className={theme}>
        <Spinner />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
