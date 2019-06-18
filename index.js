#!/usr/bin/env node
const argv = require('yargs').commandDir('src/bin')
    .demandCommand()
    .help()
    .argv;
