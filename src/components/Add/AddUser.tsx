import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { AnyAction } from 'redux';
import { createUserSuccess } from '../Tables/UserSlice';
import { v4 as uuidv4 } from "uuid";
import { postCreateUser } from '../../redux/api';

const ModelAddNew: React.FC = () => {
    const [name, setName] = useState<string | undefined>("");
    const [job, setJob] = useState<string | undefined>("");
    const [show, setShow] = useState(false);

    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

    const handleClose = () => {
        setShow(false);
        setName("");
        setJob("");
    };

    const handleAddUser = () => {
        if (name && job) {
            const userData = {
                name,
                job,
                id: uuidv4(),
            };
           
            dispatch(postCreateUser(name,job));
            setName("");
            setJob("");
            handleClose();
        }
    };


    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Add New User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
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
                    <Button variant="primary" onClick={handleAddUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelAddNew;
