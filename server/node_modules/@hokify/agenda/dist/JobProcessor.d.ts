import type { IAgendaStatus } from './types/AgendaStatus';
import type { Agenda, JobWithId } from './index';
/**
 * @class
 * Process methods for jobs
 */
export declare class JobProcessor {
    private agenda;
    private maxConcurrency;
    private totalLockLimit;
    private processEvery;
    private jobStatus;
    private localQueueProcessing;
    private localLockLimitReached;
    getStatus(fullDetails?: boolean): Promise<IAgendaStatus>;
    private nextScanAt;
    private jobQueue;
    private runningJobs;
    private lockedJobs;
    private jobsToLock;
    private isLockingOnTheFly;
    private isJobQueueFilling;
    private isRunning;
    private processInterval?;
    constructor(agenda: Agenda, maxConcurrency: number, totalLockLimit: number, processEvery: number);
    stop(): JobWithId[];
    process(extraJob?: JobWithId): Promise<void>;
    /**
     * Returns true if a job of the specified name can be locked.
     * Considers maximum locked jobs at any time if self._lockLimit is > 0
     * Considers maximum locked jobs of the specified name at any time if jobDefinition.lockLimit is > 0
     * @param {String} name name of job to check if we should lock or not
     * @returns {boolean} whether or not you should lock job
     */
    shouldLock(name: string): boolean;
    /**
     * Internal method that adds jobs to be processed to the local queue
     * @param {*} jobs Jobs to queue
     * @param {boolean} inFront puts the job in front of queue if true
     * @returns {undefined}
     */
    private enqueueJob;
    /**
     * Internal method that will lock a job and store it on MongoDB
     * This method is called when we immediately start to process a job without using the process interval
     * We do this because sometimes jobs are scheduled but will be run before the next process time
     * @returns {undefined}
     */
    lockOnTheFly(): Promise<void>;
    private findAndLockNextJob;
    /**
     * Internal method used to fill a queue with jobs that can be run
     * @param {String} name fill a queue with specific job name
     * @returns {undefined}
     */
    private jobQueueFilling;
    /**
     * Internal method that processes any jobs in the local queue (array)
     * handledJobs keeps list of already processed jobs
     * @returns {undefined}
     */
    private jobProcessing;
    /**
     * Internal method that tries to run a job and if it fails, retries again!
     * @returns {boolean} processed a job or not
     */
    private runOrRetry;
    private updateStatus;
}
