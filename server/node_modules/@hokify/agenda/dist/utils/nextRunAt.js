"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeFromRepeatAt = exports.computeFromInterval = exports.isValidHumanInterval = void 0;
/* eslint-disable import/first */
const luxon_1 = require("luxon");
const date = require("date.js");
const debug = require("debug");
const cron_parser_1 = require("cron-parser");
const humanInterval = require("human-interval");
const isValidDate_1 = require("./isValidDate");
const log = debug('agenda:nextRunAt');
const dateForTimezone = (timezoneDate, timezone) => luxon_1.DateTime.fromJSDate(timezoneDate, { zone: timezone });
function isValidHumanInterval(value) {
    const transformedValue = humanInterval(value);
    return typeof transformedValue === 'number' && Number.isNaN(transformedValue) === false;
}
exports.isValidHumanInterval = isValidHumanInterval;
/**
 * Internal method that computes the interval
 */
const computeFromInterval = (attrs) => {
    const previousNextRunAt = attrs.nextRunAt || new Date();
    log('[%s:%s] computing next run via interval [%s]', attrs.name, attrs._id, attrs.repeatInterval);
    const lastRun = dateForTimezone(attrs.lastRunAt || new Date(), attrs.repeatTimezone);
    const cronOptions = {
        currentDate: lastRun.toJSDate(),
        tz: attrs.repeatTimezone
    };
    let nextRunAt = null;
    let error;
    if (typeof attrs.repeatInterval === 'string') {
        try {
            let cronTime = (0, cron_parser_1.parseExpression)(attrs.repeatInterval, cronOptions);
            let nextDate = cronTime.next().toDate();
            if (nextDate.valueOf() === lastRun.valueOf() ||
                nextDate.valueOf() <= previousNextRunAt.valueOf()) {
                // Handle cronTime giving back the same date for the next run time
                cronOptions.currentDate = new Date(lastRun.valueOf() + 1000);
                cronTime = (0, cron_parser_1.parseExpression)(attrs.repeatInterval, cronOptions);
                nextDate = cronTime.next().toDate();
            }
            nextRunAt = nextDate;
            // eslint-disable-next-line no-empty
        }
        catch (err) {
            error = err;
        }
    }
    if (isValidHumanInterval(attrs.repeatInterval)) {
        if (!attrs.lastRunAt) {
            nextRunAt = new Date(lastRun.valueOf());
        }
        else {
            const intervalValue = humanInterval(attrs.repeatInterval);
            nextRunAt = new Date(lastRun.valueOf() + intervalValue);
        }
    }
    if (!(0, isValidDate_1.isValidDate)(nextRunAt)) {
        log('[%s:%s] failed to calculate nextRunAt due to invalid repeat interval', attrs.name, attrs._id);
        throw new Error(`failed to calculate nextRunAt due to invalid repeat interval (${attrs.repeatInterval}): ${error || 'no readable human interval'}`);
    }
    return nextRunAt;
};
exports.computeFromInterval = computeFromInterval;
/**
 * Internal method to compute next run time from the repeat string
 * @returns {undefined}
 */
function computeFromRepeatAt(attrs) {
    const lastRun = attrs.lastRunAt || new Date();
    const nextDate = date(attrs.repeatAt).valueOf();
    // If you do not specify offset date for below test it will fail for ms
    const offset = Date.now();
    if (offset === date(attrs.repeatAt, offset).valueOf()) {
        log('[%s:%s] failed to calculate repeatAt due to invalid format', attrs.name, attrs._id);
        // this.attrs.nextRunAt = undefined;
        // this.fail('failed to calculate repeatAt time due to invalid format');
        throw new Error('failed to calculate repeatAt time due to invalid format');
    }
    if (nextDate.valueOf() === lastRun.valueOf()) {
        return date('tomorrow at ', attrs.repeatAt);
    }
    return date(attrs.repeatAt);
}
exports.computeFromRepeatAt = computeFromRepeatAt;
//# sourceMappingURL=nextRunAt.js.map