import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchAllUsers } from '../../redux/api';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Table from 'react-bootstrap/Table';
import { searchFilterChange,selectSearchFilter } from '../Filter/FilterSlice';
import _ from 'lodash';
import ModelAddNew from '../Add/AddUser';
import ModelEditUser from '../EditUser/EditUser';
import { User, deleteUserSuccess } from './UserSlice';
import ModelConfirm from '../Delete/DeleteUser';

const TableUsers: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const users = useSelector((state: RootState) => state.user.users);
  
  useEffect(() => {

    dispatch(fetchAllUsers(1));
    
  }, [dispatch]);
  
  const searchFilter = useSelector(selectSearchFilter);
  const [listUsers, setListUsers] = useState(users);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    dispatch(searchFilterChange(term));
    handleSearchDebounce(term); 
  };

  const handleSearchDebounce = _.debounce((term: string) => {
    if (term) {
      let cloneListUsers = _.cloneDeep(users);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
      setListUsers(prev => ({
        ...prev,
        listUsers: cloneListUsers
      }));
    } else {
      dispatch(fetchAllUsers(1));
    }
  }, 500);

  const [isShowModelDelete, setIsShowModelDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState<User | null>(null);

  const handleCloseModelDelete = () => {
    setDataUserDelete(null);
    setIsShowModelDelete(false);
  };

  const handleDeleteUserFrom = (user: User) => {
    dispatch(deleteUserSuccess(user.id));
  };

  const [isShowModelEdit, setIsShowModelEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({ id: 0, first_name: '' });

  const handleUpdateTableEdit = (user: { id: number; first_name: string }) => {
    setDataUserEdit(user);
    setIsShowModelEdit(true);
};
  const handleCloseModelEdit = () => {
    setIsShowModelEdit(false);
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users: </b>
        </span>
      </div>
      <div className="col-6 my-3">
        <input
          className="form-control"
          placeholder='search user by email...'
           value={searchFilter}
          onChange={handleSearchChange}
        />

      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-3"
                       onClick={() => handleUpdateTableEdit(item)}
                    >Edit
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => handleDeleteUserFrom(item)}
                    >Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      
      <ModelAddNew
      />
     {dataUserDelete && (
        <ModelConfirm
          show={isShowModelDelete}
          handleClose={handleCloseModelDelete}
          dataUserDelete={dataUserDelete}
          handleDeleteUserFrom={handleDeleteUserFrom}
        />
      )}
      {dataUserEdit && (
      <ModelEditUser
        show={isShowModelEdit}
        handleClose={handleCloseModelEdit}
        dataUserEdit={dataUserEdit}
        handleUpdateTableEdit={handleUpdateTableEdit}
  />
)}
      
    </>

  )
}

export default TableUsers;
