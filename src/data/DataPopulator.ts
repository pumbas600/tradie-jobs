import Client from '../types/Client';
import JobInfo, { Status } from '../types/JobInfo';
import { generateJobId } from './JobManager';

const earliestCreated = new Date('1 Sep 2022').getTime();

const clients: Client[] = [
    {
        clientCode: 'JJEF',
        name: 'Josh Jeffers',
        email: 'joshjeffers600@gmail.com',
    },
    {
        clientCode: 'FERG',
        name: 'Fergus Software',
        phone: '0800 461 219',
    },
];

// From https://stackoverflow.com/a/56264925/12643981
function randomEnum<T extends {}>(anEnum: T): T[keyof T] {
    const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

function randomDate(): Date {
    // Generate a random date between now and the earliest possible created date
    const time = Math.floor(Math.random() * (Date.now() - earliestCreated)) + earliestCreated;
    return new Date(time);
}

function randomClient(): Client {
    return clients[Math.floor(Math.random() * clients.length)];
}

export function randomJob(): JobInfo {
    const client = randomClient();
    return {
        id: generateJobId(client),
        name: 'A Job Name',
        status: randomEnum(Status),
        created: randomDate(),
        client: client,
        description: 'This is an example description...',
        notes: [],
    };
}
