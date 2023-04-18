import Modal from "react-modal";
const Message = ({ showMessage }) => {
  return (
    <Modal isOpen={showMessage}>
      <h4>Please ,Login to book trip !</h4>
    </Modal>
  );
};
export default Message;
