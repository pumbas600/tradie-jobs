import Client from './Client';
import Note from './Note';

export default interface JobInfo {
    id: string;
    name: string;
    status: Status;
    created: Date;
    client: Client;
    notes: Note[];
}

export enum Status {
    Scheduled = 'Scheduled',
    Active = 'Active',
    Invoicing = 'Invoicing',
    ToPrice = 'To Price',
    Completed = 'Completed',
}
