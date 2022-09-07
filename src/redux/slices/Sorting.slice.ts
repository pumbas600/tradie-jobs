import { createSlice } from '@reduxjs/toolkit';
import { allValues } from '../../helpers/Utilities';
import { Status } from '../../types/JobInfo';
import { Filters, SortingInfo } from '../../types/Sorting';
import { StoreState } from '../Store';

export interface State {
    visibleJobs: string[];
    info: SortingInfo;
    filters: Filters;
}

export const initialState: State = {
    visibleJobs: [],
    info: {
        direction: 'desc',
        by: 'created',
    },
    filters: {
        search: '',
        status: allValues(Status),
        client: [],
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
        setSearchFilter(state, action: { payload: string }) {
            state.filters.search = action.payload;
        },
        setStatusFilters(state, action: { payload: Status[] }) {
            state.filters.status = action.payload;
        },
        setClientFilters(state, action: { payload: string[] }) {
            state.filters.client = action.payload;
        },
    },
});

export const { setVisibleJobs, setSorting, setSearchFilter, setStatusFilters, setClientFilters } = sortingSlice.actions;

export const getSorting = (state: StoreState) => state.sorting.info;

export const getVisibleJobs = (state: StoreState) => state.sorting.visibleJobs;

export const getFilters = (state: StoreState) => state.sorting.filters;

export default sortingSlice.reducer;
