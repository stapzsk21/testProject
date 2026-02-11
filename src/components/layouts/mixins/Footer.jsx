import { Link } from 'react-router-dom';
import useLangStore from '../../../store/langStore';

import logo from '../../../assets/images/footer-logo.png';
import footerAge from '../../../assets/images/footer-age-icon.svg';
import footerSertificate from '../../../assets/images/footer-sertificate-icon.png';
import buttonDownloadIcon from '../../../assets/images/button-download-icon.svg';
import instIcon from '../../../assets/images/inst-icon.svg';
import tgIcon from '../../../assets/images/tg-icon.svg';
import xIcon from '../../../assets/images/x-icon.svg';
import mailIcon from '../../../assets/images/mail-icon.svg';
import { useTranslation } from '../../functions/translate/TranslationContext';
import LanguageSwitcher from '../nav/LanguageSwitcher';
import imgDefault from '../../../assets/images/footer-image.png';
import imgEn from '../../../assets/images/footer-image-en.png';
import imgEs from '../../../assets/images/footer-image-es.png';
import imgRu from '../../../assets/images/footer-image-ru.png';


function Footer() {
  const { translations } = useTranslation();
  const currentLang = useLangStore((s) => s.currentLang);

  const {
    footerTitle,
    footerText,
    footerButton,
    footerAgeText,
    footerSertificateText,
    footerMediaText,
  } = translations || {};


  const images = {
    es: imgEs,
    en: imgEn,
    ru: imgRu,
  };

  return (
    <footer className="footer">
      <div className="wrapper">

        <div className="footer__inner">

          <div className="footer__image">
            <img src={images[currentLang] || imgDefault} alt="footerImage" />
          </div>

          <div className="footer-download">
            <img className="footer-download__logo" src={logo} alt="logo" />
            <p className="footer-title">{footerTitle}</p>
            <p className="footer-text">{footerText}</p>
            <Link className="btn btn-main" to="">
              <img src={buttonDownloadIcon} alt="buttonDownloadIcon" />
              {footerButton}
            </Link>
          </div>

          <div className="footer-info">
            <div className="footer-info__item">
              <img className="footer-info__logo" src={footerAge} alt="footerAge" />
              <p className="footer-info__text">{footerAgeText}</p>
            </div>
            <div className="footer-info__item">
              <img className="footer-info__logo" src={footerSertificate} alt="footerSertificate" />
              <p className="footer-info__text">{footerSertificateText}</p>
            </div>
          </div>

          <div className="footer-media">
            <LanguageSwitcher />

            <div className="footer-media__social">
              <p className="footer-media__text">{footerMediaText}</p>
              <div className="footer-media__images">
                <Link className="footer-media__link" to="">
                  <img src={instIcon} alt="instIcon" />
                </Link>
                <Link className="footer-media__link" to="">
                  <img src={tgIcon} alt="tgIcon" />
                </Link>
                <Link className="footer-media__link" to="">
                  <img src={xIcon} alt="xIcon" />
                </Link>
                <Link className="footer-media__link" to="">
                  <img src={mailIcon} alt="mailIcon" />
                </Link>
              </div>
            </div>
          </div>

        </div>




      </div>
    </footer>
  );
}

export default Footer;