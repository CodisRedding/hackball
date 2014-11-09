#!/usr/bin/env node

var CronJob = require('cron').CronJob;
var Github = require('./lib/github');
var config = require('./config.json');

var gh = new Github();
gh.auth(config.github_user, config.github_pass);

/* Poll for open issues */
new CronJob('*/5 * * * * *', function () {
	console.log('polling...');
	gh.getOpenIssues(config.github_repo, function (err, issues) {
		if (err) {
			console.log(err);
			return;
		}
	});
}, null, true, 'America/Chicago');

/*
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
*/