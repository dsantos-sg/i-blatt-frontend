import { Dispatch, SetStateAction, ReactNode } from 'react';

export interface ReactGeneric {
  children?: ReactNode;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps extends LoginProps {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  nativeLanguage: string;
}

export interface ModalProps {
  show: boolean;
  cb: Dispatch<SetStateAction<boolean>>;
  isDisable?: boolean;
  children?: ReactNode;
}

export interface BtnProps {
  isDisable: boolean;
  text: string;
  cb: any;
}

export interface ErrorSucessMessageProps {
  sucess: { status: boolean; msg: string };
  error: { status: boolean; msg: string };
  invalid: { status: boolean; msg: string };
}

export interface ValidationProps {
  userName: boolean;
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
  nativeLanguage: boolean;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  handleIsAuthenticated: (isAuthenticated: boolean) => void;
  tokenExpiration: null | number;
}

export interface ITokenExpiration {
  exp: null | number;
}

export interface IRegisterData {
  userName: string;
  email: string;
  password: string;
  nativeLanguage: string;
}

export interface IForeignLanguage {
  foreignLanguage: string;
  _id: string;
}

export interface IWordsId {
  _id: string;
}

export interface IUser {
  userName: string;
  email: string;
  nativeLanguage: string;
  foreignLanguages: IForeignLanguage[];
  words: IWordsId[];
  createdAt: string;
  updatedAt: string;
}

export interface IPrivateLayoutProps {
  drawerOpen: boolean;
  handleDrawerOpen: (isDrawerOpen: boolean) => void;
  bottomNavigationIndex: number | null;
  handleBottomNavigationIndex: (navigationIndex: number) => void;
  searchValue: string;
  handleSearchValue: (searchValue: string) => void;
  newWordDialogOpen: boolean;
  handleNewWordDialogOpen: (isNewWordDialogOpen: boolean) => void;
}
