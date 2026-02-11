import logo from '../../../assets/images/logo.svg';

function ModalLoader({ absolute = false, pageLoad = false }) {
  function getClassName() {
    if (absolute) {
      return 'modal-loader absolute';
    }
    if (pageLoad) {
      return 'modal-loader page-load';
    }
    return 'modal-loader';
  }

  return (
    <div className={getClassName()}>
      <img className="modal-loader__icon" src={logo} />
    </div>
  );
}

export default ModalLoader;
