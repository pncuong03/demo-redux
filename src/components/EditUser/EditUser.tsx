import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { putUpdateUser } from '../../redux/api';
import { updateUserSuccess } from '../Tables/UserSlice';

interface ModelEditUserProps {
    show: boolean;
    handleClose: () => void;
    dataUserEdit: { id: number; first_name: string };
    handleUpdateTableEdit: (data: { first_name: string; id: number }) => void;
}

const ModelEditUser: React.FC<ModelEditUserProps> = (props) => {
    const { show, handleClose, dataUserEdit, handleUpdateTableEdit } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const dispatch = useDispatch();

    const handleEditUser = async () => {
        dispatch(updateUserSuccess({ ...dataUserEdit, name, job })); 

        handleUpdateTableEdit({
            first_name: name,
            id: dataUserEdit.id,
        });

        handleClose();
    };

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Job</label>
                        <input
                            type="text"
                            className="form-control"
                            value={job}
                            onChange={(event) => setJob(event.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModelEditUser;
