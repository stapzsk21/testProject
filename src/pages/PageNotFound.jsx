import { Helmet } from 'react-helmet';
import { useTranslation } from '../components/functions/translate/TranslationContext';
import NotFoundHeader from '../components/layouts/404/NotFoundHeader';

function PageNotFound() {
  const { translations } = useTranslation();
  const { titlesNotFound } = translations || {};

  return (
    <>
      <Helmet>
        <title>{titlesNotFound}</title>
      </Helmet>
      <NotFoundHeader />
    </>
  );
}

export default PageNotFound;
