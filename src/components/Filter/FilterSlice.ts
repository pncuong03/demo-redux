import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface FiltersState {
  search: string;
}

const initialState: FiltersState = {
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    searchFilterChange: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { searchFilterChange } = filtersSlice.actions;
export const selectSearchFilter = (state: RootState) => state.filters.search;

export default filtersSlice.reducer;
