import { persistor, store } from '@/app/store';
import { GOOGLE_CLIENT_ID } from '@/consts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
