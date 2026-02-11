import { Link } from 'react-router-dom';

import Lottie from 'lottie-react';

import NotFoundHeaderImage from '../../../assets/images/header-404-image.png';
import testAnimation from '../../../assets/json/lottie/header-animation.json';
import '../../../assets/styles/header.scss';
import { APP_CONSTANTS } from '../../../constants/site.config';
import { useTranslation } from '../../functions/translate/TranslationContext';
// import DecorLines from '../mixins/DecorLines.jsx';
import TypingUnderlineHeading from '../mixins/TypingUnderlineHeading';
// import SquareDecoration from '../mixins/SquareDecoration.jsx';
import sugar1 from '../../../assets/images/sugar1.svg';
import sugar2 from '../../../assets/images/sugar2.svg';

function NotFoundHeader() {
  const { translations } = useTranslation();
  const { notFoundHeaderTitle, notFoundHeaderText, buttonTextMain } = translations || {};

  return (
    <header className="page-header not-found">
      <div className="wrapper">
        <div className="page-header__inner flex">
          <div className="page-header__info">
            <TypingUnderlineHeading as="h1" className="h1-title page-header__title" speed={70}>
              {notFoundHeaderTitle}
            </TypingUnderlineHeading>

            <p className="page-header__text text-baner">{notFoundHeaderText}</p>
            <Link className="btn btn-second" to="/">
              <span>{buttonTextMain}</span>
            </Link>
          </div>

          <div
            className={`page-header__image${APP_CONSTANTS.isAnimated ? ' animation-page-header__image' : ''}`}
          >
            {APP_CONSTANTS.isAnimated ? (
              <Lottie
                className="page-header-image animation-image"
                animationData={testAnimation}
                loop={true}
              />
            ) : (
              <img src={NotFoundHeaderImage} className="page-header-image" />
            )}

            <div className="square-decoration__container">
                {/* <SquareDecoration
                  style={{
                    left: 0,
                    top: '56%',
                  }}
                  icon={sugar1}
                  speedAnimateOpacity={800}
                />

                <SquareDecoration
                  style={{
                    right: 0,
                     top: '56%',
                  }}
                  icon={sugar2}
                  speedAnimateOpacity={700}
                /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <DecorLines /> */}
    </header>
  );
}

export default NotFoundHeader;
