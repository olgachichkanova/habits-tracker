import { UserCredential } from 'firebase/auth';
export type TLoginWithEmailAndPasswordResult = UserCredential;
export type TAuthContext = {
  isAuthenticated: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>;
  loginWithOauthPopup: (provider: string) => Promise<TLoginWithEmailAndPasswordResult>;
  logOut: () => void;
};
