exports.command = 'serve <event> [json] [--port]';
exports.desc = 'Serve all action as json API';
exports.builder = {
    event: {
        desc: "Event type"
    },
    json: {
        desc: 'Link to a file or direct json',
        default: {},
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

    const storeObserver = new EventstoreObserver(eventStore);
    const params = JSON.parse(argv.json);

    // Command result will be sent to all observers
    let ev;
    switch (argv.event) {
        case 'PaqueteReservado':
            ev = new Event(argv.event, 'reserva', params);
            break;
        case 'EmailEnviado':
            ev = new Event(argv.event, 'reserva', params);
            break;
        case 'AgenciaAceptado':
            ev = new Event(argv.event, 'reserva', params);
            break;
        case 'ViajeRealizado':
            ev = new Event(argv.event, 'reserva', params);
            break;
        case 'EncuestaSatisfaccionCompletada':
            ev = new Event(argv.event, 'reserva', params);
            break;

        case 'CancerPancreasDiagnosticado':
            ev = new Event(argv.event, 'hospital', params);
            break;
        case 'AfeccionesCardiacasMedicado':
            ev = new Event(argv.event, 'hospital', params);
            break;
        case 'TratamientoXEmpezado':
            ev = new Event(argv.event, 'hospital', params);
            break;
        case 'TratamientoL1Fallo':
            ev = new Event(argv.event, 'hospital', params);
            break;
        case 'TratamientoL2Fallo':
            ev = new Event(argv.event, 'hospital', params);
            break;
    }
    if (ev) {
        debug('evento', ev);
        $.of(ev).subscribe(storeObserver);
    }
};
