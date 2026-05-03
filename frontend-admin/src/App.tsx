import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { Provider } from 'react-redux';
import { store } from '@/redux/store.ts';

/**
 * Ant Design
 */
import { ConfigProvider } from 'antd';

/**
 * Helmet
 */
import { HelmetProvider, Helmet } from 'react-helmet-async';

/**
 * Language
 */
import en_US from 'antd/lib/locale/en_US';

/**
 * Logo
 */
import logo from '@/assets/images/logo-icon-white.png';

/**
 * Mocks
 */
import { setupMockServer } from "@/mocks/mocks.ts";

import { MainRoute } from '@/routes/routeMain';
import { AdminRoute } from '@/routes/routeAdmin';

if (import.meta.env.VITE_DEVELOPMENT_MODE == 'true') {
  console.log('Development Mode Enabled');
  setupMockServer();
}

const routes = [
  ...MainRoute,
  ...AdminRoute,
];
const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div></div>}>
        <HelmetProvider>
          <ConfigProvider locale={en_US}>
            <Provider store={store}>
              <Helmet>
                <title>{import.meta.env.VITE_APP_NAME}</title>
                <link rel="icon" href={logo} />
                <meta property="og:image" content={window.location.origin + logo} />
                <meta property="og:image:alt" content="Your Logo" />
                <meta name="twitter:image" content={window.location.origin + logo} />
              </Helmet>
              <RouterProvider router={router} />
            </Provider>
          </ConfigProvider>
        </HelmetProvider>
      </Suspense>
    </React.Fragment>
  );
}
export default App
