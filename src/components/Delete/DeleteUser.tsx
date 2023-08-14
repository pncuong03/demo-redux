import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { User, deleteUserSuccess } from '../Tables/UserSlice';

interface ModelConfirmProps {
  show: boolean;
  handleClose: () => void;
  dataUserDelete: User;
  handleDeleteUserFrom: (user: User) => void;
}

const ModelConfirm: React.FC<ModelConfirmProps> = ({ show, handleClose, dataUserDelete, handleDeleteUserFrom }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    dispatch(deleteUserSuccess(dataUserDelete.id));
    handleDeleteUserFrom(dataUserDelete); 
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the user with ID {dataUserDelete.id}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModelConfirm;
