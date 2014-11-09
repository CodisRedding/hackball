module.exports = game;
game.prototype = {};

function game (gameHomeTeam, gameAwayTeam) {
	this.state = require('./state.json');
	this.state.home_team = gameHomeTeam;
	this.state.away_team = gameAwayTeam;
	this.state.on_first = undefined;
	this.state.on_second = undefined;
	this.state.on_third = undefined;
}

game.POSITIONS = require('./positions');
game.PLAYS = require('./plays');

game.prototype.getAwayTeam = function () {
	return this.state.away_team;
};

game.prototype.getHomeTeam = function () {
	return this.state.home_team;
};

game.prototype.start = function (teamBatting) {
	var batter = Math.floor(Math.random() * game.POSITIONS.length);

	this.state.team_batting = teamBatting;
	this.state.batting = teamBatting.getPlayers()[batter];
};

game.prototype.makePlay = function () {
	var play = Math.floor(Math.random() * game.PLAYS.length);
	var next_batter = Math.floor(Math.random() * game.POSITIONS.length);

	/* State changers */
	switch (game.PLAYS[play]) {
		case 'SINGLE':
			this._single(true);
			this.state.batting = this.state.team_batting.getPlayers()[next_batter];
			this.toString();
			break;
		case 'DOUBLE':
			this._double();
			this.state.batting = this.state.team_batting.getPlayers()[next_batter];
			this.toString();
			break;
		case 'TRIPLE':
			this._triple();
			this.state.batting = this.state.team_batting.getPlayers()[next_batter];
			this.toString();
			break;
		case 'HOMERUN':
			this._homerun();
			this.state.batting = this.state.team_batting.getPlayers()[next_batter];
			this.toString();
			break;
		case 'STRIKE':
			this._strike(next_batter);
			this.toString();
			break;
		case 'BALL':
			this._ball();
			this.toString();
			break;
		case 'HITINFACE':
			this._hitByBall();
			this.state.batting = this.state.team_batting.getPlayers()[next_batter];
			this.toString();
			break;
		case 'FLYOUT':
			this._flyOut(next_batter);
			this.toString();
			break;
		default:
			console.log(play);
			console.log('wtf');
	}
};

game.prototype._flyOut = function (next_batter) {
	console.log(this.state.batting.getPlayerName() + ' smashed the ball to center field!');
	console.log('but, the ball was caught and everyone boo\'d you');
	console.log('That\'s ' + ++this.state.outs + ' outs.');

	if (this.state.outs === 3) {
		console.log('Changing teams.');
		this.state.balls = 0;
		this.state.strikes = 0;
		this.state.outs = 0;
		this.state.on_third = undefined;
		this.state.on_second = undefined;
		this.state.on_first = undefined;
		this.state.team_batting = (this.state.team_batting === this.state.home_team) ? this.state.away_team : this.state.home_team;
		console.log(this.state.team_batting.getTeamName() + ' is up to bat.');
	} else {
		this.state.balls = 0;
		this.state.strikes = 0;
		this.state.batting = this.state.team_batting.getPlayers()[next_batter];
		console.log(this.state.batting.getPlayerName() + ' is up to bat.');
	}
};

game.prototype._ball = function () {
	console.log('Ball ' + ++this.state.balls);

	if (this.state.balls === 4) {
		console.log(this.state.batting.getPlayerName() + ' was walked.');
		this._single(false);
	}
};

game.prototype._hitByBall = function () {
	console.log(this.state.batting.getPlayerName() + ' was crushed in the face by a pitch!');
	this._single(false);
};

game.prototype._strike = function (next_batter) {
	console.log('Strike ' + ++this.state.strikes);

	if (this.state.strikes === 3) {
		console.log(this.state.batting.getPlayerName() + ' you\'re out!');

		this.state.on_third = undefined;
		this.state.on_second = undefined;
		this.state.on_first = undefined;
		this.state.balls = 0;
		this.state.strikes = 0;
		
		if (++this.state.outs === 3) {
			console.log('That\'s 3 outs. Changing teams.');
			this.state.outs = 0;
			this.state.team_batting = (this.state.team_batting === this.state.home_team) ? this.state.away_team : this.state.home_team;
			console.log(this.state.team_batting.getTeamName() + ' is now batting.');
			this.state.batting = this.state.team_batting.getPlayers()[next_batter];
		} else {
			console.log('That\'s ' + this.state.outs + ' outs.');
			this.state.batting = this.state.team_batting.getPlayers()[next_batter];
			console.log(this.state.batting.getPlayerName() + ' is up to bat.');
		}
	}
};

game.prototype._single = function (fromHitting) {
	if (fromHitting) {
		console.log(this.state.batting.getPlayerName() + ' hit a single for the ' + this.state.team_batting.getTeamName());
	}

	var runs = 0;

	/* Is someone on third? */
	if (this.state.on_third) { 
		runs++;
	}
	
	this.state.on_third = this.state.on_second;
	this.state.on_second = this.state.on_first;
	this.state.on_first = this.state.batting;
	this.state.balls = 0;
	this.state.strikes = 0;

	this.state.team_batting.addRuns(runs);	
};

game.prototype._double = function () {
	console.log(this.state.batting.getPlayerName() + ' hit a double for the ' + this.state.team_batting.getTeamName());
	var runs = 0;

	/* Is someone on third? */
	if (this.state.on_third) {
		runs++;
	}

	/* Is someone on second? */
	if (this.state.on_second) {	
		runs++;
	}

	this.state.on_third = this.state.on_first;
	this.state.on_second = this.state.batting;
	this.state.on_first = undefined;
	this.state.balls = 0;
	this.state.strikes = 0;
	this.state.team_batting.addRuns(runs);	
};

game.prototype._triple = function () {
	console.log(this.state.batting.getPlayerName() + ' hit a triple for the ' + this.state.team_batting.getTeamName());
	var runs = 0;

	/* Is someone on third? */
	if (this.state.on_third) {
		runs++;
	}

	/* Is someone on second? */
	if (this.state.on_second) {
		runs++;
	}

	/* Is someone on first? */
	if (this.state.on_first) {	
		runs++;
	}
	
	this.state.on_third = this.state.batting;
	this.state.on_second = undefined;
	this.state.on_first = undefined;
	this.state.balls = 0;
	this.state.strikes = 0;
	this.state.team_batting.addRuns(runs);	
};

game.prototype._homerun = function () {
	console.log(this.state.batting.getPlayerName() + 
		' got a homerun for the ' + 
		this.state.team_batting.getTeamName());

	var runs = 0;

	/* Is someone on third? */
	if (this.state.on_third) {
		runs++;
	}

	/* Is someone on second? */
	if (this.state.on_second) {	
		runs++;
	}

	/* Is someone on first? */
	if (this.state.on_second) {	
		runs++;
	}

	/* Run for batter */
	runs++;

	if (runs === 4) {
		console.log('GRAND SLAM!');
	}

	this.state.on_third = undefined;
	this.state.on_second = undefined;
	this.state.on_first = undefined;
	this.state.balls = 0;
	this.state.strikes = 0;
	this.state.team_batting.addRuns(runs);	
};

game.prototype.toString = function () {
	console.log('/* AWAY TEAM */');
	console.log('Team: ' + this.state.away_team.getTeamName());
	console.log('Score: ' + this.state.away_team.getScore());
	//this.state.away_team.toString();

	console.log('\n');	
	console.log('/* HOME TEAM */');
	console.log('Team: ' + this.state.home_team.getTeamName());
	console.log('Score: ' + this.state.home_team.getScore());
	//this.state.home_team.toString();

	console.log('\n');
	console.log('Team Batting: ' + this.state.team_batting.getTeamName());
	console.log('Up to bat: ' + this.state.batting.getPlayerName());
	console.log('outs: ' + this.state.outs);
	console.log('strikes: ' + this.state.strikes + ' balls: ' + this.state.balls);

	console.log('\n');
	console.log('on 1st: ' + ((this.state.on_first) ? this.state.on_first.getPlayerName() : 'no one'));
	console.log('on 2nd: ' + ((this.state.on_second) ? this.state.on_second.getPlayerName() : 'no one'));
	console.log('on 3rd: ' + ((this.state.on_third) ? this.state.on_third.getPlayerName() : 'no one'));
	
	console.log('\n');
};