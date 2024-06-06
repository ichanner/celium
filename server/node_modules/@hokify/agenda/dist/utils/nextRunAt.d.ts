import type { IJobParameters } from '../types/JobParameters';
export declare function isValidHumanInterval(value: unknown): value is string;
/**
 * Internal method that computes the interval
 */
export declare const computeFromInterval: (attrs: IJobParameters<any>) => Date;
/**
 * Internal method to compute next run time from the repeat string
 * @returns {undefined}
 */
export declare function computeFromRepeatAt(attrs: IJobParameters<any>): Date;
