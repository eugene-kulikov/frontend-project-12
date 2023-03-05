import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import App from './App.jsx';
import store from './slices/index.js';
import setLocales from './locales/index.js';
import 'react-toastify/dist/ReactToastify.css';

i18n.use(initReactI18next).init(setLocales());
leoProfanity.add(leoProfanity.getDictionary('ru'));

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
