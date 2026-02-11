import { useEffect, useState, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWithHeader from './components/PageWithHeader';
import getBasePath from './components/functions/beta/getBasePath';
import { TranslationProvider } from './components/functions/translate/TranslationContext';
import Footer from './components/layouts/mixins/Footer';
import Iframe from './components/layouts/mixins/Iframe';
import ModalLoader from './components/layouts/popup/ModalLoader';
import { APP_CONSTANTS } from './constants/site.config';
import { pagesWithHeader, notFoundRoute } from './routes/routesConfig';
import useGameStore from './store/gameStore';

function App() {
  const [basePath, setBasePath] = useState('');
  const isGameOpen = useGameStore((state) => state.isGameOpen);
  const closeGame = useGameStore((state) => state.closeGame);

  // Compute base path
  useEffect(() => {
    setBasePath(getBasePath());
  }, []);

  return (
    <TranslationProvider initialLanguage={APP_CONSTANTS.languages.default}>
      <Router basename={basePath}>

        <Routes>
          {/* Страницы с Header */}
          {pagesWithHeader.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <PageWithHeader>
                  <Suspense fallback={<ModalLoader pageLoad />}>{<Component />}</Suspense>
                </PageWithHeader>
              }
            />
          ))}

          {/* 404 */}
          <Route
            path={notFoundRoute.path}
            element={<Suspense fallback={<ModalLoader />}>{<notFoundRoute.component />}</Suspense>}
          />
        </Routes>

        <Footer />
        <Iframe isOpen={isGameOpen} closeGame={closeGame} />
        
      </Router>
    </TranslationProvider>
  );
}

export default App;
