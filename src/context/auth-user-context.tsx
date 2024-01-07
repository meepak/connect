import { createContext, useContext, useReducer, useState } from 'react'
import { User } from 'firebase/auth'

export interface UserData extends User {
  isOnboard: boolean
  // add other properties here
}

export enum AuthStatus {
  Checking,
  Authenticated,
  NotAuthenticated,
}

export interface Preferences {
  setThemePreference: (themePref: string) => void
  setUseCustomColor: (value: boolean) => void
  useCustomColor: boolean
  setThemeCustomColor: (color: string) => void
  themePreference: string
  themeCustomColor: string
  isDark: boolean
  debug: boolean
  setDebug: (show: boolean) => void
}

interface AuthUser {
  status: AuthStatus;
  data: UserData | null;
  preferences: Preferences | null;
}

export enum AuthUserActionType {
  SET_AUTH_STATUS = 'SET_AUTH_STATUS',
  SET_USER_DATA = 'SET_USER_DATA',
  SET_PREFERENCES = 'SET_PREFERENCES',
}

type Action =
  | { type: AuthUserActionType.SET_AUTH_STATUS; payload: AuthStatus }
  | { type: AuthUserActionType.SET_USER_DATA; payload: UserData }
  | { type: AuthUserActionType.SET_PREFERENCES; payload: Preferences };

const authUserReducer = (authUser: AuthUser, action: Action): AuthUser => {
  switch (action.type) {
   case AuthUserActionType.SET_AUTH_STATUS:
      let newData = authUser.data;
      let newPreferences = authUser.preferences;

      if (action.payload === AuthStatus.Checking) {
        newData = null;
        newPreferences = null;
      } else if (action.payload === AuthStatus.NotAuthenticated) {
        newData = null;
      }

      return { ...authUser, status: action.payload, data: newData, preferences: newPreferences };
    case AuthUserActionType.SET_USER_DATA:
      return { ...authUser, data: action.payload };
    case AuthUserActionType.SET_PREFERENCES:
      return { ...authUser, preferences: action.payload };
    default:
      return authUser;
  }
};

const initialAuthUser = {
        status: AuthStatus.Checking,
        data: null,
        preferences: null,
      }


type AuthUserState = {
  authUser: AuthUser;
  dispatchAuthUser: React.Dispatch<Action>;
};

export const AuthUserContext = createContext<AuthUserState | undefined>(undefined)


export const AuthUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, dispatchAuthUser] = useReducer(authUserReducer, initialAuthUser);

  return (
    <AuthUserContext.Provider value={{ authUser, dispatchAuthUser: dispatchAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error('useAuthUser must be used within a AuthUserProvider');
  }
  return context;
};

/**
 * -----------------------------------------
 * Usage example
 * -----------------------------------------
 * import React, { useEffect } from 'react';
 * import { AuthUserActionType, useAuthUser } from '@/context';
 * 
 * const SomeComponent = () => {
 *  const {authUser, dispatch} = useAuthUser();
 *  useEffect(() => {
 *    // Fetch user data and update the state
 *    const fetchUserData = async () => {
 *    const userData = await someAsyncFunctionToFetchUserData();
 *    dispatch({ type:  AuthUserActionType.SET_USER_DATA, payload: userData });
 * };
 * 
 *  fetchUserData();
 * }, []);
 * 
 * // Render your component
 * return <Text>{authUser.data ? `Hello, ${authUser.data.name}` : 'Loading...'}</Text>;
 * };
 * 
 */