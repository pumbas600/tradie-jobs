import { createSlice } from '@reduxjs/toolkit';
import { randomJob } from '../../data/DataPopulator';
import Client from '../../types/Client';
import JobInfo, { Status } from '../../types/JobInfo';
import NoteInfo from '../../types/NoteInfo';
import { StoreState } from '../Store';

export interface State {
    jobIdCounter: number;
    jobs: Record<string, JobInfo>;
    selectedJob: string | null;
}

export const initialState: State = {
    jobIdCounter: 0,
    jobs: {},
    selectedJob: null,
};

export function generateJobId(state: State, client: Client): string {
    const id = `${client.clientCode}-${state.jobIdCounter.toString().padStart(3, '0')}`;
    state.jobIdCounter++;
    return id;
}

const jobManagerSlice = createSlice({
    name: 'jobmanager',
    initialState,
    reducers: {
        generateRandomJobs(state, action: { payload: number }) {
            Array(action.payload)
                .fill(null)
                .forEach(() => {
                    const generatedJob = randomJob();
                    const job = { ...generatedJob, id: generateJobId(state, generatedJob.client) };
                    state.jobs[job.id] = job;
                });
        },
        addJob(state, action: { payload: Omit<JobInfo, 'id' | 'created'> }) {
            const newJob = {
                ...action.payload,
                id: generateJobId(state, action.payload.client),
                created: new Date().getTime(),
            };
            state.jobs[newJob.id] = newJob;
        },
        setSelectedJob(state, action: { payload: string }) {
            if (state.jobs[action.payload]) {
                state.selectedJob = action.payload;
            }
        },
        addNote(state, action: { payload: NoteInfo }) {
            if (state.selectedJob !== null) {
                state.jobs[state.selectedJob].notes.push(action.payload);
            }
        },
        updateNote(state, action: { payload: { noteIndex: number; newMessage: string } }) {
            if (state.selectedJob === null) return;

            const job = state.jobs[state.selectedJob];
            if (action.payload.noteIndex >= 0 && action.payload.noteIndex < job.notes.length) {
                job.notes[action.payload.noteIndex].message = action.payload.newMessage;
            }
        },
        deleteNote(state, action: { payload: number }) {
            if (state.selectedJob === null) return;

            const job = state.jobs[state.selectedJob];
            if (action.payload >= 0 && action.payload < job.notes.length) {
                job.notes.splice(action.payload, 1);
            }
        },
        updateStatus(state, action: { payload: Status }) {
            if (state.selectedJob !== null) {
                state.jobs[state.selectedJob].status = action.payload;
            }
        },
    },
});

export const { generateRandomJobs, addJob, setSelectedJob, addNote, updateNote, deleteNote, updateStatus } =
    jobManagerSlice.actions;

export const getAllJobs = (state: StoreState) => Object.values(state.jobManager.jobs);

export const getSelectedJob = (state: StoreState) =>
    state.jobManager.selectedJob === null ? null : state.jobManager.jobs[state.jobManager.selectedJob];

export default jobManagerSlice.reducer;
