import Client from '../types/Client';
import JobInfo from '../types/JobInfo';

let jobIdCounter = 0;
const jobs: Record<string, JobInfo> = {};

export function getAllJobs(): JobInfo[] {
    return Object.values(jobs);
}

export function addJob(job: Omit<JobInfo, 'id' | 'created'>): JobInfo {
    const newJob = { ...job, id: generateJobId(job.client), created: new Date().getTime() };
    jobs[newJob.id] = newJob;
    return newJob;
}

export function generateJobId(client: Client): string {
    const id = `${client.clientCode}-${jobIdCounter.toString().padStart(3, '0')}`;
    jobIdCounter++;
    return id;
}

export function getJob(id: string): JobInfo | null {
    return jobs[id] ?? null;
}
