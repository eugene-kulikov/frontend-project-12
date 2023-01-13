import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './pages/Registration.jsx';
import RequireAuth from './hoc/RequireAuth.jsx';
import { AuthProvider } from './hoc/AuthProvider.jsx';
import socket from './utils/socket.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('newMessage', (response) => {
      dispatch(messagesActions.addMessage(response));
    });
  }, [dispatch]);

  return (
      <AuthProvider>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={
                      <RequireAuth>
                          <Home />
                      </RequireAuth>
                  } />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Registration />} />
                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
      </AuthProvider>
  );
}

export default App;
