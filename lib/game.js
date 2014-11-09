module.exports = game;
game.prototype = {};

function game (gameHomeTeam, gameAwayTeam) {
	this.bases = require('./bases');
	this.batting = undefined;
	this.awayTeam = gameAwayTeam;
	this.homeTeam = gameHomeTeam;
	this.score = [];
}

game.POSITIONS = require('./positions');

game.prototype.getTeams = function() {
	return [this.homeTeam, this.awayTeam];
};

game.prototype.getAwayTeam = function() {
	return this.awayTeam;
};

game.prototype.getHomeTeam = function() {
	return this.homeTeam;
};

game.prototype.startGame = function(teamBatting) {
	this.batting = this.teamBatting;
	this.bases.clear();
};

game.prototype.addPlay = function(team, play) {
	// score based on play
};

game.prototype.toString = function() {
	console.log('/* AWAY TEAM */');
	this.awayTeam.toString();
	console.log('\n');	
	console.log('/* HOME TEAM */');
	this.homeTeam.toString();
};


