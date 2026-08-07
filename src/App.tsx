/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { A11yProvider } from './context/A11yContext';
import { AppRoutes } from './routes/AppRoutes';
import { InitialSplashScreen } from './components/common/InitialSplashScreen';
import { RateLimitNotifier } from './components/common/RateLimitNotifier';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      <A11yProvider>
        <AuthProvider>
          {showSplash && <InitialSplashScreen onFinish={() => setShowSplash(false)} />}
          <AppRoutes />
          <RateLimitNotifier />
        </AuthProvider>
      </A11yProvider>
    </BrowserRouter>
  );
}


