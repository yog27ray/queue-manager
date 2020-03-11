"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const rp = __importStar(require("request-promise"));
const schedule = __importStar(require("node-schedule"));
const slave_config_1 = require("./slave-config");
const queue_manager_config_1 = require("../event-manager/queue-manager-config");
const event_manager_1 = require("../event-manager");
const inversify_1 = require("../inversify");
const log = debug_1.default('queue-manager:EventScheduler');
class SlaveEventScheduler {
    constructor(queueName, listener, cronInterval) {
        this.queueName = queueName;
        this.config = inversify_1.container.get(slave_config_1.SlaveConfig);
        this.queueManagerConfig = inversify_1.container.get(queue_manager_config_1.QueueManagerConfig);
        this.config.listener = listener;
        this.initialize(cronInterval);
    }
    initialize(cronInterval = '15 * * * * *') {
        this.checkIfMoreItemsCanBeProcessed();
        if (process.env.NODE_ENV === 'test') {
            return;
        }
        log('Adding scheduler job for event slave.');
        schedule.scheduleJob(cronInterval, () => !this.config.polling && this.checkIfMoreItemsCanBeProcessed());
    }
    checkIfMoreItemsCanBeProcessed() {
        this.config.polling = true;
        if (this.config.config.count >= SlaveEventScheduler.Config.MAX_COUNT) {
            return;
        }
        while (this.config.config.count < SlaveEventScheduler.Config.MAX_COUNT && this.config.hasMore) {
            this.requestEventToProcess();
        }
        if (!this.config.config.count && !this.config.hasMore) {
            this.config.polling = false;
        }
    }
    requestEventToProcess() {
        this.config.config.count += 1;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(async () => {
            try {
                const [response] = await rp({
                    method: 'POST',
                    uri: `${this.queueManagerConfig.masterURL}/queue/${this.queueName}/event/poll`,
                    json: true,
                });
                if (!response) {
                    this.config.hasMore = false;
                    return;
                }
                await this.config.listener(new event_manager_1.EventItem(response));
                this.requestEventToProcess();
            }
            catch (error) {
                log(error);
                if (!error.code && error.message.startsWith('Error: connect ECONNREFUSED')) {
                    this.config.hasMore = false;
                    return;
                }
            }
            this.config.config.count -= 1;
            this.checkIfMoreItemsCanBeProcessed();
        }, 0);
    }
}
exports.SlaveEventScheduler = SlaveEventScheduler;
SlaveEventScheduler.Config = { MAX_COUNT: 1 };
//# sourceMappingURL=slave-event-scheduler.js.map