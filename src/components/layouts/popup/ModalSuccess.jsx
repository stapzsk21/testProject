import successImage from '../../../assets/images/success-image.png';

const ModalSuccess = ({ title, text }) => {
  return (
    <div className="modal-content success">
      <div className="modal-content-text flex">
        <h3 className="modal-title h3-title">{title}</h3>
        <div className="form-line-horizontal" />
        <p className="modal-text text-standart">{text}</p>
        <img className="modal-image" src={successImage} />
      </div>
    </div>
  );
};

export default ModalSuccess;
