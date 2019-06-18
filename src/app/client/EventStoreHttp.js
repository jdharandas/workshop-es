const Rx = require('rx');

const $ = Rx.Observable;
const EventStore = require('geteventstore-promise');
const debug = require('debug')('ready-host.eventstore');

class EventStoreHttp {
  constructor(ip, username = 'admin', password = 'changeit', port = 2113) {
    debug(`Use eventstore http ${username}@${ip}:${port}`);
    this.client = new EventStore.HTTPClient({
      hostname: ip,
      port,
      credentials: {
        username,
        password,
      },
    });
    this.eventFactory = new EventStore.EventFactory();
  }

  append(ev, stream, expectedVersion = -2) {
    return $.create((observer) => {
      $.fromPromise(
        this.client.writeEvents(
          stream,
          [this.eventFactory.newEvent(ev.type, ev.data, ev.meta, ev.id)],
          {
            expectedVersion,
          },
        ),
      ).subscribe(observer);
    });
  }
}

module.exports = EventStoreHttp;
