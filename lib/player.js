module.exports = player;
player.prototype = {};

function player (playerName, playerPosition) {
	this.name = playerName;
	this.position = playerPosition;
}

player.prototype.getPlayerName = function() {
	return this.name;
};

player.prototype.getPosition = function() {
	return this.position;
};