import JobInfo from '../types/JobInfo';

let jobCounter = 0;
const jobs: Record<string, JobInfo> = {};

export function getAllJobs(): JobInfo[] {
    return Object.values(jobs);
}

export function addJob(job: Omit<JobInfo, 'id' | 'created'>): JobInfo {
    const id = `${job.client.clientCode}-${jobCounter.toString().padStart(3, '0')}`;
    const newJob = { ...job, id, created: new Date() };
    jobs[id] = newJob;
    jobCounter++;
    return newJob;
}

export function getJob(id: string): JobInfo | null {
    return jobs[id] ?? null;
}
