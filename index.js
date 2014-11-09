#!/usr/bin/env node

//var cron = require('./lib/cron');
var CronJob = require('cron').CronJob;

new CronJob('* * * * * *', function() {
	console.log('You will see this message every second');
}, null, true, 'America/Chicago');

var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);