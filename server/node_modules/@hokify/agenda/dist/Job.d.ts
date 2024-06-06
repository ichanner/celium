import { ObjectId } from 'mongodb';
import type { Agenda } from './index';
import { IJobParameters } from './types/JobParameters';
import { JobPriority } from './utils/priority';
/**
 * @class
 */
export declare class Job<DATA = unknown | void> {
    readonly agenda: Agenda;
    private readonly byJobProcessor;
    readonly attrs: IJobParameters<DATA>;
    /** this flag is set to true, if a job got canceled (e.g. due to a timeout or other exception),
     * you can use it for long running tasks to periodically check if canceled is true,
     * also touch will check if and throws that the job got canceled
     */
    private canceled?;
    getCanceledMessage(): string | true | Error | undefined;
    private forkedChild?;
    cancel(error?: Error | string): void;
    /** internal variable to ensure a job does not set unlimited numbers of setTimeouts if the job is not processed
     * immediately */
    gotTimerToExecute: boolean;
    /**
     * creates a new job object
     * @param agenda
     * @param args
     * @param byJobProcessor
     */
    constructor(agenda: Agenda, args: Partial<IJobParameters<void>> & {
        name: string;
        type: 'normal' | 'single';
    }, byJobProcessor?: boolean);
    constructor(agenda: Agenda, args: Partial<IJobParameters<DATA>> & {
        name: string;
        type: 'normal' | 'single';
        data: DATA;
    }, byJobProcessor?: boolean);
    /**
     * Given a job, turn it into an JobParameters object
     */
    toJson(): IJobParameters;
    /**
     * Sets a job to repeat every X amount of time
     * @param interval
     * @param options
     */
    repeatEvery(interval: string | number, options?: {
        timezone?: string;
        skipImmediate?: boolean;
    }): this;
    /**
     * Sets a job to repeat at a specific time
     * @param time
     */
    repeatAt(time: string): this;
    /**
     * if set, a job is forked via node child process and runs in a seperate/own
     * thread
     * @param enableForkMode
     */
    forkMode(enableForkMode: boolean): this;
    /**
     * Prevents the job from running
     */
    disable(): this;
    /**
     * Allows job to run
     */
    enable(): this;
    /**
     * Data to ensure is unique for job to be created
     * @param unique
     * @param opts
     */
    unique(unique: Required<IJobParameters<DATA>>['unique'], opts?: IJobParameters['uniqueOpts']): this;
    /**
     * Schedules a job to run at specified time
     * @param time
     */
    schedule(time: string | Date): this;
    /**
     * Sets priority of the job
     * @param priority priority of when job should be queued
     */
    priority(priority: JobPriority): this;
    /**
     * Fails the job with a reason (error) specified
     *
     * @param reason
     */
    fail(reason: Error | string): this;
    private fetchStatus;
    /**
     * A job is running if:
     * (lastRunAt exists AND lastFinishedAt does not exist)
     * OR
     * (lastRunAt exists AND lastFinishedAt exists but the lastRunAt is newer [in time] than lastFinishedAt)
     * @returns Whether or not job is running at the moment (true for running)
     */
    isRunning(): Promise<boolean>;
    /**
     * Saves a job to database
     */
    save(): Promise<Job>;
    /**
     * Remove the job from database
     */
    remove(): Promise<number>;
    isDead(): Promise<boolean>;
    isExpired(): Promise<boolean>;
    /**
     * Updates "lockedAt" time so the job does not get picked up again
     * @param progress 0 to 100
     */
    touch(progress?: number): Promise<void>;
    private computeNextRunAt;
    run(): Promise<void>;
    runJob(): Promise<void>;
    private isPromise;
}
export type JobWithId = Job & {
    attrs: IJobParameters & {
        _id: ObjectId;
    };
};
