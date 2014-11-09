#!/usr/bin/env node

var CronJob = require('cron').CronJob;
var Github = require('./lib/github');
var config = require('./config.json');
var BaseballGame = require('./lib/game');
var Team = require('./lib/team');
var Player = require('./lib/player');

/* Setup players */
var playersHome = [];
var playersAway = [];
for(var pos = 0; pos < BaseballGame.POSITIONS.length; pos++) {
	playersHome.push(new Player('Player' + pos, BaseballGame.POSITIONS[pos]));
	playersAway.push(new Player('Player' + pos, BaseballGame.POSITIONS[pos]));
}

/* Setup teams */
var teamAway = new Team('Lights', playersAway);
var teamHome = new Team('Sounds', playersHome);

/* Setup game */
var game = new BaseballGame(teamHome, teamAway);

game.start(teamHome);
game.toString();

/* Poll for open issues */
var gh = new Github();
gh.auth(config.github_user, config.github_pass);

new CronJob('*/5 * * * * *', function () {
	gh.getOpenIssues(config.github_repo, function (err, issues) {
		if (err) {
			console.log(err);
			return;
		}

		for (var issue = 0; issue < issues.length; issue++) {
			game.makePlay();
		}
	});
}, null, true, 'America/Chicago');