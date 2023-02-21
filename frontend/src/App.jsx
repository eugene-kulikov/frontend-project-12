import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './pages/Registration.jsx';
import RequireAuth from './hoc/RequireAuth.jsx';
import { AuthProvider } from './hoc/AuthProvider.jsx';
import rollbarConfig from './rollbarConfig.js';
import useChatConnection from './hooks/useChatConnection.js';

const App = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useChatConnection(dispatch, t);

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
