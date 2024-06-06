import { Collection, Filter, ObjectId, Sort } from 'mongodb';
import type { Job, JobWithId } from './Job';
import type { Agenda } from './index';
import type { IDatabaseOptions, IDbConfig, IMongoOptions } from './types/DbOptions';
import type { IJobParameters } from './types/JobParameters';
/**
 * @class
 */
export declare class JobDbRepository {
    private agenda;
    private connectOptions;
    collection: Collection<IJobParameters>;
    constructor(agenda: Agenda, connectOptions: (IDatabaseOptions | IMongoOptions) & IDbConfig);
    private createConnection;
    private hasMongoConnection;
    private hasDatabaseConfig;
    getJobById(id: string): Promise<import("mongodb").WithId<IJobParameters<unknown>> | null>;
    getJobs(query: Filter<IJobParameters>, sort?: Sort, limit?: number, skip?: number): Promise<IJobParameters[]>;
    removeJobs(query: Filter<IJobParameters>): Promise<number>;
    getQueueSize(): Promise<number>;
    unlockJob(job: Job): Promise<void>;
    /**
     * Internal method to unlock jobs so that they can be re-run
     */
    unlockJobs(jobIds: ObjectId[]): Promise<void>;
    lockJob(job: JobWithId): Promise<IJobParameters | undefined>;
    getNextJobToRun(jobName: string, nextScanAt: Date, lockDeadline: Date, now?: Date): Promise<IJobParameters | undefined>;
    connect(): Promise<void>;
    private database;
    private processDbResult;
    saveJobState(job: Job<any>): Promise<void>;
    /**
     * Save the properties on a job to MongoDB
     * @name Agenda#saveJob
     * @function
     * @param {Job} job job to save into MongoDB
     * @returns {Promise} resolves when job is saved or errors
     */
    saveJob<DATA = unknown | void>(job: Job<DATA>): Promise<Job<DATA>>;
}
