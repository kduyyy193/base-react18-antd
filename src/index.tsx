import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';

import 'i18n/config';
import withClearCache from './withClearCache';
import RouterProviderInstance from 'routes';

const Styling = lazy(() => import('./styling'));

const ClearCacheComponent = withClearCache(RouterProviderInstance);

function App() {
  return (
    <Suspense
      fallback={<div className="w-screen h-screen flex place-items-center">Loading...</div>}
    >
      <Styling>
        <ClearCacheComponent />
      </Styling>
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
