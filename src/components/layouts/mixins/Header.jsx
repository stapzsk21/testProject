import logo from '../../../assets/images/logo.png';
import headerImage from '../../../assets/images/header-image.png';
import '../../../assets/styles/header.scss';
import { useTranslation } from '../../functions/translate/TranslationContext';
import useGameStore from '../../../store/gameStore';

const Header = () => {
  const { translations } = useTranslation();
  const {
    buttonMain,
  } = translations || {};
  const openGame = useGameStore((state) => state.openGame);

  return (
    <header className='page-header'>
      <div className="wrapper">

        <div className="page-header__inner">
          <div className="page-header__logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="page-header__image">
            <img src={headerImage} alt="headerImage" />
          </div>

          <button className="btn btn-main" onClick={openGame}>{buttonMain}</button>
        </div>

          
      </div>
    </header>
  );
};

export default Header;
