import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  email: string;
  name: string;
  job: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchAllUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    createUserSuccess(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    updateUserSuccess: (state, action: PayloadAction<{ id: number; name: string; job: string }>) => {
      const { id, name, job } = action.payload;

      const userIndex = state.users.findIndex(user => user.id === id);

      if (userIndex !== -1) {
        const updatedUser = {
          ...state.users[userIndex],
          name,
          job,
        };

        state.users[userIndex] = updatedUser;
      }
    },
    deleteUserSuccess(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { fetchAllUsersSuccess, createUserSuccess, updateUserSuccess, deleteUserSuccess } =
UserSlice.actions;


export default UserSlice.reducer;
