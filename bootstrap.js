/*
 * Rocky Assad
 * Nov 8, '14
 * Hacknashville
 */

var Game = require('./lib/game');
var Team = require('./lib/team');
var Player = require('./lib/player');

/* Setup players */
var playersHome = [];
var playersAway = [];
for(var pos = 0; pos < Game.POSITIONS.length; pos++) {
	playersHome.push(new Player('Player' + pos, Game.POSITIONS[pos]));
	playersAway.push(new Player('Player' + pos, Game.POSITIONS[pos]));
}

/* Setup teams */
var teamAway = new Team('Lights', playersAway);
var teamHome = new Team('Sounds', playersHome);

/* Setup game */
var ballGame = new Game(teamHome, teamAway);

/* Display game info */
ballGame.toString();