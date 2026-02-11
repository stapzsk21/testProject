import errorImage from '../../../assets/images/error-image.png';

const ModalError = ({ title, text }) => {
  return (
    <div className="modal-content error">
      <div className="modal-content-text flex">
        <h3 className="modal-title h3-title">{title}</h3>
        <div className="form-line-horizontal" />
        <p className="modal-text text-standart">{text}</p>
        <img className="modal-image" src={errorImage} />
      </div>
    </div>
  );
};

export default ModalError;
