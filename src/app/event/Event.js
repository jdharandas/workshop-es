const uuidv1 = require('uuid/v1');
const os = require('os');

class Event {
    /**
     *
     * @param type
     * @param stream
     * @param data
     * @param meta
     * @param id
     */
    constructor(type, stream, data, meta, id) {
        this.type = type;
        this.stream = stream;
        this.data = data || {};
        this.meta = {
            ...meta,
            host: os.hostname(),
            version: 1,
            created_at: new Date(),
        };
        this.id = (id) || uuidv1();
    }
}

module.exports = Event;
