import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './pages/Registration.jsx';
import RequireAuth from './hoc/RequireAuth.jsx';
import { AuthProvider } from './hoc/AuthProvider.jsx';
import socket from './utils/socket.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import rollbarConfig from './rollbarConfig.js';

const App = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    socket.on('newMessage', (response) => {
      dispatch(messagesActions.addMessage(response));
    });
    socket.on('newChannel', (response) => {
      dispatch(channelsActions.addChannel(response));
      dispatch(channelsActions.setCurrentChannelId(response.id));
      toast.success(t('toast.success.addChannel'));
    });
    socket.on('removeChannel', (response) => {
      dispatch(channelsActions.removeChannel(response.id));
      toast.success(t('toast.success.removeChannel'));
    });
    socket.on('renameChannel', (response) => {
      dispatch(channelsActions.updateChannel({ id: response.id, changes: response }));
      toast.success(t('toast.success.renameChannel'));
    });
  }, [dispatch, t]);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={<Layout />}
            >
              <Route
                index
                element={(
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                )}
              />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Registration />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
