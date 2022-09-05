import { LoremIpsum } from 'lorem-ipsum';
import { capitalise, randBetween, randint, randomEnum } from '../helpers/Utilities';
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
