const debug = require('debug')('ready-host');

class EventstoreObserver {
  /**
     *
     * @param {EventStoreHttp} eventStore
     */
  constructor(eventStore) {
    this.store = eventStore;
  }

  /**
     *
     * @param {AppEvent} ev
     */
  onNext(ev) {
    if (!ev.stream) {
      return;
    }
    this.store.append(ev, ev.stream)
      .subscribe();
  }

  onError(e) {

  }

  onCompleted() {
  }
}

module.exports = EventstoreObserver;
