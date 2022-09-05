import { LoremIpsum } from 'lorem-ipsum';
import Client from '../types/Client';
import JobInfo, { Status } from '../types/JobInfo';
import NoteInfo from '../types/NoteInfo';
import { generateJobId } from './JobManager';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

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

function capitalise(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

/**
 * Generates a random integer between 0 and the upper limit (inclusive).
 *
 * @param upperLimit The upper limit for the random integer
 */
function randint(upperLimit: number): number {
    return Math.floor(Math.random() * (upperLimit + 1));
}

/**
 * Generates a random integer between the lower limit and the upper limit (inclusive).
 *
 * @param lowerLimit The lower limit for the random integer
 * @param upperLimit The upper limit for the random integer
 */
function randBetween(lowerLimit: number, upperLimit: number): number {
    return randint(upperLimit - lowerLimit) + lowerLimit;
}

// From https://stackoverflow.com/a/56264925/12643981
function randomEnum<T extends {}>(anEnum: T): T[keyof T] {
    const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

function randomDate(): Date {
    // Generate a random date between now and the earliest possible created date
    const time = randBetween(Date.now(), earliestCreated);
    return new Date(time);
}

function randomClient(): Client {
    return clients[randint(clients.length - 1)];
}

function randomNotes(): NoteInfo[] {
    const notesCount = randint(5);
    return Array(notesCount)
        .fill(null)
        .map((_) => ({
            created: randomDate(),
            message: lorem.generateSentences(1),
        }));
}

export function randomJob(): JobInfo {
    const wordsInName = randBetween(2, 4);
    console.log(wordsInName);

    const client = randomClient();
    return {
        id: generateJobId(client),
        name: capitalise(lorem.generateWords(wordsInName)),
        status: randomEnum(Status),
        created: randomDate(),
        client: client,
        description: lorem.generateParagraphs(1),
        notes: randomNotes(),
    };
}
