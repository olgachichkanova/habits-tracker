import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import {
  getAuth,
  User,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

type TProps = {
  firebaseApp: FirebaseApp;
  children: React.ReactNode;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject(),
  logOut: () => undefined,
  loginWithOauthPopup: () => Promise.reject(),
});
export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};
export const useAuth = (): TAuthContext => useContext(authContext);
export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};
const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = getFirestore(firebaseApp);
  return await getDoc(doc(db, '/internal/auth'));
};
export const AuthContextProvider: FC<TProps> = ({ firebaseApp, children }) => {
  const [isAuthenticated, setIsAuthenticaded] = useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(firebaseApp));
  const loginWithEmailAndPassword = (email: string, password: string) => {
    setIsAuthenticaded(null);
    setUser(null);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };
  const loginWithOauthPopup = (provider: string) => {
    setIsAuthenticaded(null);
    setUser(null);
    return signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };
  const logOut = () => signOut(auth);
  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);

    auth.onAuthStateChanged((user) => {
      if (user) {
        isUserAdmin(firebaseApp)
          .then(() => {
            setIsAuthenticaded(true);
            setUser(user);
          })
          .catch(() => {
            logOut();
            setIsAuthenticaded(false);
            setUser(null);
          });
      } else {
        setIsAuthenticaded(false);
        setUser(null);
      }
    });
  }, [auth]);
  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithEmailAndPassword,
        logOut,
        loginWithOauthPopup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
