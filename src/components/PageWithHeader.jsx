import { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import ModalLoader from './layouts/popup/ModalLoader';

const Header = lazy(() => import('./layouts/mixins/Header'));

const PageWithHeader = ({ children }) => (
  <Suspense fallback={<ModalLoader absolute />}>
    <Header />
    {children}
  </Suspense>
);

PageWithHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWithHeader;
