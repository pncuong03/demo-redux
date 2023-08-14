import axios from 'axios';
import { Dispatch } from 'redux';
import { fetchAllUsersSuccess, createUserSuccess, updateUserSuccess, deleteUserSuccess } from '../components/Tables/UserSlice';


export const fetchAllUsers = (page: number) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    dispatch(fetchAllUsersSuccess(response.data.data));
    
  } catch (error) {
 
  }
};

export const postCreateUser = (name: string, job: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post("https://reqres.in/api/users", { name: name, job: job });
    dispatch(createUserSuccess(response.data));
  } catch (error) {
   
  }
};

export const putUpdateUser = (name: string, job: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.put("https://reqres.in/api/users/2", { name: name, job: job });
    dispatch(updateUserSuccess(response.data));
  } catch (error) {
   
  }
};

export const deleteUser = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
   
  }
};
