#!/usr/bin/env node

var CronJob = require('cron').CronJob;
var Github = require('./lib/github');
var config = require('./config.json');

var gh = new Github();

gh.auth(config.github_user, config.github_pass);

new CronJob('* * * * * *', function () {
	console.log('githubbing');
	gh.getOpenIssues(config.github_user, config.github_repo, function (err, issues) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(issues.length);
	});
}, null, true, 'America/Chicago');

/*
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
*/