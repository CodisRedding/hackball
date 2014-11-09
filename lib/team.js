module.exports = team;
team.prototype = {};

function team (teamName, teamPlayers) {
	this.name = teamName;
	this.players = teamPlayers;
}

team.prototype.getTeamName = function () {
	return this.name;
};

team.prototype.toString = function () {
	console.log('Team: ' + this.name);
	for (var player = 0; player < this.players.length; player++) {
		console.log('Player: ' + this.players[player].getPlayerName());
		console.log('Position: ' + this.players[player].getPosition());
	}
};