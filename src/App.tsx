import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

import 'i18n/config';

const Styling = lazy(() => import('./styling'));

function App() {
  const { t, i18n } = useTranslation();
  return (
    <Suspense
      fallback={<div className="w-screen h-screen flex place-items-center">Loading...</div>}
    >
      <Styling>
        <div>
          <h2>{t('auth.Login')}</h2>
          <button className="bg-blue-400 p-4 mx-4" onClick={() => i18n.changeLanguage('en')}>
            English
          </button>
          <button className="bg-blue-400 p-4 mx-4" onClick={() => i18n.changeLanguage('vi')}>
            Tiếng Việt
          </button>
        </div>
      </Styling>
    </Suspense>
  );
}

export default App;
