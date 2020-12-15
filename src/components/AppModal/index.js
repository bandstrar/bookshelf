import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

const AppModal = (props) => {
  const {
    buttonLabel,
    className,
    modalTitle,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="m-2">
      <Button className='modal-add bookshelves-buttons' onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className='modal-header'>{modalTitle}</ModalHeader>
        <ModalBody className='modal-body'>
          {React.cloneElement(props.children, { toggle })}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AppModal;
