import {ILoginData} from "../interfaces/generic.ts";
import {apiURL} from "./apiServices.ts";

export const login = async (myLoginData: ILoginData) => {
  try {
    const res = await apiURL.post('/login', myLoginData);
    const {token, userId} = res.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const register = async (registerData: ILoginData) => {
  try {
    const res = await apiURL.post('/signup', registerData);
    const {token, userId} = res.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};