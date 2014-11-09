module.exports = team;
team.prototype = {};

function team (teamName, teamPlayers) {
	this.name = teamName;
	this.players = teamPlayers;
	this.score = 0;
}

team.prototype.getTeamName = function () {
	return this.name;
};

team.prototype.getPlayers = function () {
	return this.players;
};

team.prototype.addRuns = function (runs) {
	this.score += runs;
};

team.prototype.getScore = function () {
	return this.score;
};

team.prototype.toString = function () {
	console.log('Team: ' + this.name);
	for (var player = 0; player < this.players.length; player++) {
		console.log('Player: ' + this.players[player].getPlayerName());
		console.log('Position: ' + this.players[player].getPosition());
	}
};