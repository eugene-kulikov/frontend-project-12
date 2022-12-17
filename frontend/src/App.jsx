import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Registration from './pages/Registration.jsx';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Registration />} />
              <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
  );
}

export default App;
