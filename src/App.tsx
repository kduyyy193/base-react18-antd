import { Suspense, lazy } from 'react';

const Styling = lazy(() => import('./styling'));

function App() {
  return (
    <Suspense
      fallback={<div className="w-screen h-screen flex place-items-center">Loading...</div>}
    >
      <Styling>
        <></>
      </Styling>
    </Suspense>
  );
}

export default App;
