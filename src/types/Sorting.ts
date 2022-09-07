import { Status } from './JobInfo';

export type SortingDirection = 'asc' | 'desc';

export type SortedBy = 'created' | 'status' | 'id' | 'name' | 'client';

export type Comparator<T> = (a: T, b: T) => number;

export interface SortingInfo {
    by: SortedBy;
    direction: SortingDirection;
}

export interface Filters {
    search: string;
    status: Status[];
}
