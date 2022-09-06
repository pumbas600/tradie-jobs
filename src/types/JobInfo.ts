import Client from './Client';
import NoteInfo from './NoteInfo';

export default interface JobInfo {
    id: string;
    name: string;
    status: Status;
    created: number;
    client: Client;
    description?: string;
    notes: NoteInfo[];
}

export enum Status {
    Scheduled = 'Scheduled',
    Active = 'Active',
    Invoicing = 'Invoicing',
    ToPrice = 'To Price',
    Completed = 'Completed',
}
