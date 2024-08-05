import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import "i18n/config";
import withClearCache from "./withClearCache";
import RouterProviderInstance from "routes";
import reportWebVitals from "reportWebVitals";

const Styling = lazy(() =>
  import("./styling").catch((error) => {
    throw error;
  })
);

const ClearCacheComponent = withClearCache(RouterProviderInstance);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Styling>
        <ClearCacheComponent />
      </Styling>
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log web vitals to the console or send to an analytics endpoint.
reportWebVitals(console.log);
