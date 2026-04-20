import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { Provider } from 'react-redux';
import { store } from '@/redux/store.ts';

/**
 * Ant Design
 */
import { ConfigProvider } from 'antd';

/**
 * Language
 */
import en_US from 'antd/lib/locale/en_US';

import { MainRoute } from '@/routes/routeMain';
import { AdminRoute } from '@/routes/routeAdmin';

const routes = [
  ...MainRoute,
  ...AdminRoute,
];
const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ConfigProvider locale={en_US}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </React.Fragment>
  );
}
export default App
