import { createSlice } from '@reduxjs/toolkit';
import { SortingInfo } from '../../types/Sorting';
import { StoreState } from '../Store';

export interface State {
    visibleJobs: string[];
    info: SortingInfo;
}

export const initialState: State = {
    visibleJobs: [],
    info: {
        direction: 'desc',
        by: 'created',
    },
};

const sortingSlice = createSlice({
    name: 'sorting',
    initialState,
    reducers: {
        setVisibleJobs(state, action: { payload: string[] }) {
            state.visibleJobs = action.payload;
        },
        setSorting(state, action: { payload: SortingInfo }) {
            state.info = action.payload;
        },
    },
});

export const { setSorting, setVisibleJobs } = sortingSlice.actions;

export const getSorting = (state: StoreState) => state.sorting.info;

export const getVisibleJobs = (state: StoreState) => state.sorting.visibleJobs;

export default sortingSlice.reducer;
