import { useTranslation } from '@components/functions/translate/TranslationContext';
import { Helmet } from 'react-helmet';

function Index() {
  const { translations } = useTranslation();
  const { titlesIndex } = translations || {};

  return (
    <main>
      <Helmet>
        <title>{titlesIndex}</title>
      </Helmet>
    </main>
  );
}

export default Index;
