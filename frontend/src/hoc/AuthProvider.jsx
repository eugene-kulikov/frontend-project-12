import { createContext, useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import getUserInfo from '../utils/common.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initialUser = getUserInfo();
  const [user, setUser] = useState(initialUser);

  const login = (body) => axios.post(routes.loginPath(), body)
    .then(({ data }) => {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });

  const signin = (newUser, cb) => {
    setUser(newUser);
    cb();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const username = user ? getUserInfo().username : null;

  const value = {
    user, username, signin, signout, login,
  };

  return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};
