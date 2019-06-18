exports.command = 'random [--max] [--port]';
exports.desc = 'Serve all action as json API';
exports.builder = {
    max: {
      default: 1000,
      desc: 'Random events to be generated',
    },
    port: {
        default: 8080,
        desc: 'Port to serve',
    },
    env: {
        desc: 'Dot env to use',
        default: '.env',

    },
};
exports.handler = (argv) => {
    require('dotenv').config({
        path: `${process.cwd()}/${argv.env}`,
    });
    const debug = require('debug')('demo.serve');
    const Rx = require('rx');
    const $ = Rx.Observable;

    // see https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/testing.md#long-stack-traces-support
    Rx.config.longStackSupport = true;

    const _ = require('lodash');
    const EventStoreHttp = require('../app/client/EventStoreHttp');
    const EventstoreObserver = require('../app/observer/EventstoreObserver');
    const Event = require('../app/event/Event');

    const eventStore = new EventStoreHttp(
        process.env.EVENTSTORE_SERVICE,
        process.env.EVENTSTORE_USERNAME,
        process.env.EVENTSTORE_PASSWORD,
        process.env.EVENTSTORE_SERVICE_PORT_HTTP
    );

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const storeObserver = new EventstoreObserver(eventStore);
    const names = [
        'Alex',
        'Bea',
        'Carlos',
        'Jacob',
        'Jorge',
        'Leticia',
        'Manuel',
        'Pablo',
        'Sara',
        'Vicente',
    ];
    const events = [
        {stream: 'reserva', event: 'PaqueteReservado'},
        {stream: 'reserva', event: 'EmailEnviado'},
        {stream: 'reserva', event: 'AgenciaAceptado'},
        {stream: 'reserva', event: 'ViajeRealizado'},
        {stream: 'reserva', event: 'EncuestaSatisfaccionCompletada'},
        {stream: 'hospital', event: 'CancerPancreasDiagnosticado'},
        {stream: 'hospital', event: 'AfeccionesCardiacasMedicado'},
        {stream: 'hospital', event: 'TratamientoXEmpezado'},
        {stream: 'hospital', event: 'TratamientoL1Fallo'},
        {stream: 'hospital', event: 'TratamientoL2Fallo'},
    ];
    for (let i = 0; i < argv.max; i++) {
        const name = names[ getRandomInt(names.length) ];
        const event = events[ getRandomInt(events.length)];
        ev = new Event(event.event, event.stream, {'nombre': name});
        debug('evento', ev);
        $.of(ev).subscribe(storeObserver);
    }
};
