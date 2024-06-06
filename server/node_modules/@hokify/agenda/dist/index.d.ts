/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import type { Db, Filter, MongoClientOptions, Sort } from 'mongodb';
import { SortDirection } from 'mongodb';
import { ForkOptions } from 'child_process';
import type { IJobDefinition } from './types/JobDefinition';
import type { IAgendaConfig } from './types/AgendaConfig';
import type { IDatabaseOptions, IDbConfig, IMongoOptions } from './types/DbOptions';
import type { IAgendaStatus } from './types/AgendaStatus';
import type { IJobParameters } from './types/JobParameters';
import { Job, JobWithId } from './Job';
import { JobDbRepository } from './JobDbRepository';
import { JobPriority } from './utils/priority';
/**
 * @class
 */
export declare class Agenda extends EventEmitter {
    readonly attrs: IAgendaConfig & IDbConfig;
    readonly forkedWorker?: boolean;
    readonly forkHelper?: {
        path: string;
        options?: ForkOptions;
    };
    db: JobDbRepository;
    on(event: 'processJob', listener: (job: JobWithId) => void): this;
    on(event: 'fail', listener: (error: Error, job: JobWithId) => void): this;
    on(event: 'success', listener: (job: JobWithId) => void): this;
    on(event: 'start', listener: (job: JobWithId) => void): this;
    on(event: 'complete', listener: (job: JobWithId) => void): this;
    on(event: string, listener: (job: JobWithId) => void): this;
    on(event: string, listener: (error: Error, job: JobWithId) => void): this;
    on(event: 'ready', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    readonly definitions: {
        [name: string]: IJobDefinition;
    };
    private jobProcessor?;
    readonly ready: Promise<void>;
    isActiveJobProcessor(): boolean;
    getForkedJob(jobId: string): Promise<Job<unknown>>;
    getRunningStats(fullDetails?: boolean): Promise<IAgendaStatus>;
    /**
     * @param {Object} config - Agenda Config
     * @param {Function} cb - Callback after Agenda has started and connected to mongo
     */
    constructor(config?: {
        name?: string;
        defaultConcurrency?: number;
        processEvery?: string | number;
        maxConcurrency?: number;
        defaultLockLimit?: number;
        lockLimit?: number;
        defaultLockLifetime?: number;
    } & (IDatabaseOptions | IMongoOptions | {}) & IDbConfig & {
        forkHelper?: {
            path: string;
            options?: ForkOptions;
        };
        forkedWorker?: boolean;
    }, cb?: (error?: Error) => void);
    /**
     * Connect to the spec'd MongoDB server and database.
     */
    database(address: string, collection?: string, options?: MongoClientOptions): Promise<Agenda>;
    /**
     * Use existing mongo connectino to pass into agenda
     * @param mongo
     * @param collection
     */
    mongo(mongo: Db, collection?: string): Promise<Agenda>;
    /**
     * Set the sort query for finding next job
     * Default is { nextRunAt: 1, priority: -1 }
     * @param query
     */
    sort(query: {
        [key: string]: SortDirection;
    }): Agenda;
    private hasDatabaseConfig;
    /**
     * Cancels any jobs matching the passed MongoDB query, and removes them from the database.
     * @param query
     */
    cancel(query: Filter<IJobParameters>): Promise<number>;
    /**
     * Set name of queue
     * @param name
     */
    name(name: string): Agenda;
    /**
     * Set the time how often the job processor checks for new jobs to process
     * @param time
     */
    processEvery(time: string | number): Agenda;
    /**
     * Set the concurrency for jobs (globally), type does not matter
     * @param num
     */
    maxConcurrency(num: number): Agenda;
    /**
     * Set the default concurrency for each job
     * @param num number of max concurrency
     */
    defaultConcurrency(num: number): Agenda;
    /**
     * Set the default amount jobs that are allowed to be locked at one time (GLOBAL)
     * @param num
     */
    lockLimit(num: number): Agenda;
    /**
     * Set default lock limit per job type
     * @param num
     */
    defaultLockLimit(num: number): Agenda;
    /**
     * Set the default lock time (in ms)
     * Default is 10 * 60 * 1000 ms (10 minutes)
     * @param ms
     */
    defaultLockLifetime(ms: number): Agenda;
    /**
     * Finds all jobs matching 'query'
     * @param query
     * @param sort
     * @param limit
     * @param skip
     */
    jobs(query?: Filter<IJobParameters>, sort?: Sort, limit?: number, skip?: number): Promise<Job[]>;
    /**
     * Removes all jobs from queue
     * @note: Only use after defining your jobs
     */
    purge(): Promise<number>;
    /**
     * Setup definition for job
     * Method is used by consumers of lib to setup their functions
     * BREAKING CHANGE in v4: options moved from 2nd to 3rd parameter!
     * @param name
     * @param processor
     * @param options
     */
    define<DATA = any>(name: string, processor: (agendaJob: Job<DATA>, done: (error?: Error) => void) => void, options?: Partial<Pick<IJobDefinition, 'lockLimit' | 'lockLifetime' | 'concurrency'>> & {
        priority?: JobPriority;
    }): void;
    define<DATA = any>(name: string, processor: (agendaJob: Job<DATA>) => Promise<void>, options?: Partial<Pick<IJobDefinition, 'lockLimit' | 'lockLifetime' | 'concurrency'>> & {
        priority?: JobPriority;
    }): void;
    /**
     * Internal helper method that uses createJob to create jobs for an array of names
     * @param {Number} interval run every X interval
     * @param {Array<String>} names Strings of jobs to schedule
     * @param {Object} data data to run for job
     * @param {Object} options options to run job for
     * @returns {Array<Job>} array of jobs created
     */
    private createJobs;
    /**
     * Given a name and some data, create a new job
     * @param name
     */
    create(name: string): Job<void>;
    create<DATA = unknown>(name: string, data: DATA): Job<DATA>;
    /**
     * Creates a scheduled job with given interval and name/names of the job to run
     * @param interval
     * @param names
     * @param data
     * @param options
     */
    every(interval: string | number, names: string[], data?: undefined, options?: {
        timezone?: string;
        skipImmediate?: boolean;
        forkMode?: boolean;
    }): Promise<Job<void>[]>;
    every(interval: string | number, name: string, data?: undefined, options?: {
        timezone?: string;
        skipImmediate?: boolean;
        forkMode?: boolean;
    }): Promise<Job<void>>;
    every<DATA = unknown>(interval: string | number, names: string[], data: DATA, options?: {
        timezone?: string;
        skipImmediate?: boolean;
        forkMode?: boolean;
    }): Promise<Job<DATA>[]>;
    every<DATA = unknown>(interval: string | number, name: string, data: DATA, options?: {
        timezone?: string;
        skipImmediate?: boolean;
        forkMode?: boolean;
    }): Promise<Job<DATA>>;
    /**
     * Schedule a job or jobs at a specific time
     * @param when
     * @param names
     */
    schedule<DATA = void>(when: string | Date, names: string[]): Promise<Job<DATA>[]>;
    schedule<DATA = void>(when: string | Date, names: string): Promise<Job<DATA>>;
    schedule<DATA = unknown>(when: string | Date, names: string[], data: DATA): Promise<Job<DATA>[]>;
    schedule<DATA = unknown>(when: string | Date, name: string, data: DATA): Promise<Job<DATA>>;
    /**
     * Create a job for this exact moment
     * @param name
     */
    now<DATA = void>(name: string): Promise<Job<DATA>>;
    now<DATA = unknown>(name: string, data: DATA): Promise<Job<DATA>>;
    /**
     * Starts processing jobs using processJobs() methods, storing an interval ID
     * This method will only resolve if a db has been set up beforehand.
     */
    start(): Promise<void>;
    /**
     * Clear the interval that processes the jobs and unlocks all currently locked jobs
     */
    stop(): Promise<void>;
}
export * from './types/AgendaConfig';
export * from './types/JobDefinition';
export * from './types/JobParameters';
export * from './types/DbOptions';
export * from './Job';
