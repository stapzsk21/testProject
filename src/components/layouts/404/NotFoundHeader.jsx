import { Link } from 'react-router-dom';


import '../../../assets/styles/header.scss';
import { APP_CONSTANTS } from '../../../constants/site.config';
import { useTranslation } from '../../functions/translate/TranslationContext';

function NotFoundHeader() {
  const { translations } = useTranslation();
  const { notFoundHeaderTitle, notFoundHeaderText, buttonTextMain } = translations || {};

  return (
    <header className="page-header not-found">
      <div className="wrapper">
        <div className="page-header__inner flex">
          404
        </div>
      </div>
    </header>
  );
}

export default NotFoundHeader;
