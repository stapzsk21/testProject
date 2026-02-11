import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';
import bell from '../../../assets/images/icons/bell.svg?raw';
import search from '../../../assets/images/icons/search.svg?raw';
import brArrow from '../../../assets/images/icons/breadcrumbs-arrow.svg?raw';
import useBurgerStore from '../../../store/burgerStore';
import { useTranslation } from '../../functions/translate/TranslationContext';
import Burger from '../nav/Burger';
import LanguageSwitcher from '../nav/LanguageSwitcher';
// import NavDropdown from '../nav/NavDropdown';
import NavMobMenu from '../nav/NavMobMenu';

function Nav() {
  const { translations } = useTranslation();
  const location = useLocation();
  const {
    navTextTerminal,
    navTextNews,
    navTextFaq,
    navTextContacts,
    navTextLogin,
    navTextReg,
  } = translations || {};
  const { isMenuOpen, toggleMenu } = useBurgerStore();
  const navRef = useRef(null);
  // const [openDropdown, setOpenDropdown] = useState(null); // "markets" | "company" | null
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(prev => !prev);
  };

  // const OPEN_DELAY = 200; // задержка перед открытием
  // const CLOSE_DELAY = 200; // задержка перед закрытием
  // const openTimerRef = useRef(null);
  // const closeTimerRef = useRef(null);

  // Функция для закрытия выпадающего меню
  // const handleLinkClick = () => {
  //   setIsDropdownHovered(false);
  //   setOpenDropdown(null);
  //   // гасим все таймеры, чтобы не переоткрылось
  //   if (openTimerRef.current) {
  //     clearTimeout(openTimerRef.current);
  //     openTimerRef.current = null;
  //   }
  //   if (closeTimerRef.current) {
  //     clearTimeout(closeTimerRef.current);
  //     closeTimerRef.current = null;
  //   }
  // };
  // Функции для управления выпадающими меню
  // const handleMouseEnter = (dropdownType) => {
  //   // при входе отменяем закрытие
  //   if (closeTimerRef.current) {
  //     clearTimeout(closeTimerRef.current);
  //     closeTimerRef.current = null;
  //   }
  //   // если уже открыт этот же дропдаун — просто помечаем ховер
  //   if (openDropdown === dropdownType) {
  //     setIsDropdownHovered(true);
  //     return;
  //   }
  //   // отменяем старый план на открытие
  //   if (openTimerRef.current) {
  //     clearTimeout(openTimerRef.current);
  //     openTimerRef.current = null;
  //   }
  //   // небольшая задержка на открытие
  //   openTimerRef.current = setTimeout(() => {
  //     setOpenDropdown(dropdownType);
  //     setIsDropdownHovered(true);
  //     openTimerRef.current = null;
  //   }, OPEN_DELAY);
  // };

  // const handleMouseLeave = () => {
  //   // отменяем возможное открытие, если курсор ушёл
  //   if (openTimerRef.current) {
  //     clearTimeout(openTimerRef.current);
  //     openTimerRef.current = null;
  //   }
  //   // ставим задержку на закрытие, чтобы можно было перейти на меню
  //   if (closeTimerRef.current) {
  //     clearTimeout(closeTimerRef.current);
  //     closeTimerRef.current = null;
  //   }
  //   closeTimerRef.current = setTimeout(() => {
  //     setIsDropdownHovered(false);
  //     setOpenDropdown(null);
  //     closeTimerRef.current = null;
  //   }, CLOSE_DELAY);
  // };

  const handleStickyNav = () => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const coordinateMenu = nav.offsetTop;
    const handleScroll = () => {
      if (window.scrollY > coordinateMenu) {
        nav.classList.add('sticky');
      } else {
        nav.classList.remove('sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  useEffect(() => {
    // Вызываем логику фиксации меню
    const cleanup = handleStickyNav();
    return cleanup;
  }, []);

  // Добавляем эффект для закрытия меню при изменении маршрута
  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [location]);

  // Чистим таймеры при размонтировании
  // useEffect(() => {
  //   return () => {
  //     if (openTimerRef.current) {
  //       clearTimeout(openTimerRef.current);
  //     }
  //     if (closeTimerRef.current) {
  //       clearTimeout(closeTimerRef.current);
  //     }
  //   };
  // }, []);

  // Комбинируем классы с помощью условий
  const navClasses = `nav${isMenuOpen ? ' responsive' : ''}`;
  const listClasses = `breadcrumbs-list flex${isOpened ? ' open' : ''}`;
  const buttonClasses = `breadcrumbs-list__item button${isOpened ? ' open' : ''}`;

  return (
    <nav className={navClasses} id="mainNav">
      <div className="nav-wrapper top flex">
        <div className="nav-wrapper__logo flex">
          <Link className="nav-logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="nav-wrapper__input hide-on-mob">
          <input
            type="text"
            className="input search-input"
            placeholder="Search for another company..."
          />
        </div>

        <ul className="nav-list flex hide-on-mob">
          <li className="nav-list__item  nav-list__line">
            <Link className="nav-list__link nav-text" to="">Categories</Link>
          </li>
          <li className="nav-list__item  nav-list__line">
            <Link className="nav-list__link nav-text" to="">Blog</Link>
          </li>
          <li className="nav-list__item  nav-list__line">
            <Link className="nav-list__link" to="/"><div dangerouslySetInnerHTML={{ __html: bell }} className="nav-icon" /></Link>
          </li>
          <li className="nav-list__item  nav-list__line">
            <Link className="nav-list__link nav-text" to="">Log in</Link>
          </li>
          <Link className="btn btn-main" to="">For businesses</Link>
        </ul>

        <div className="nav-btns hide-on-desk">
          <div className="nav-list__line">
            <Link className="nav-btns__link" to="/"><div dangerouslySetInnerHTML={{ __html: bell }} className="nav-icon" /></Link>
          </div>
          <div className="nav-list__line">
            <Link className="nav-btns__link" to="/"><div dangerouslySetInnerHTML={{ __html: search }} className="nav-icon search" /></Link>
          </div>
          <Burger />
        </div>

        <NavMobMenu isMenuOpen={isMenuOpen} />
      </div>
      <div className="nav-wrapper bottom flex">
        <ul className={listClasses}>
          <li className={buttonClasses} onClick={handleClick}><span>...</span></li>
          <li className="breadcrumbs-list__item hidden">
            <Link className="breadcrumbs-list__link nav-text" to="">Money & Insurance</Link>
          </li>
          <div dangerouslySetInnerHTML={{ __html: brArrow }} className="breadcrumbs-arrow-icon hidden" />
          <li className="breadcrumbs-list__item hidden">
            <Link className="breadcrumbs-list__link nav-text" to="">Investments & Wealth</Link>
          </li>
          <div dangerouslySetInnerHTML={{ __html: brArrow }} className="breadcrumbs-arrow-icon" />
          <li className="breadcrumbs-list__item">
            <Link className="breadcrumbs-list__link nav-text" to="">Stock Broker</Link>
          </li>
          <div dangerouslySetInnerHTML={{ __html: brArrow }} className="breadcrumbs-arrow-icon" />
          <li className="breadcrumbs-list__item nav-text">Stock Broker</li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
