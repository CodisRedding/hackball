var GitHubApi = require('github');

module.exports = github;
github.prototype = {};

function github () {
	this.user = undefined;
	this.gh = new GitHubApi({
		version: '3.0.0'
	});
}

github.prototype.auth = function (username, password) {
	this.user = username;
	this.gh.authenticate({
		type: 'basic',
		username: username,
		password: password
	});
};

github.prototype.getOpenIssues = function (repo, cb) {
	var self = this;
	this.gh.issues.repoIssues({
			user: this.user,
			repo: repo,
			state: 'open',
			sort: 'updated',
			direction: 'asc'
		},
		function (err, res) {
			if (err) {
				cb(true, err);
				console.log(err);
				return;
			}

			if (res) {
				for (var issue = 0; issue < res.length; issue++) {
					// make a play. due something with issue data? res[issue];
					cb(false, res[issue]);
					console.log('issue #' + res[issue].number);
					self._closeIssue(repo, res[issue].number);
				}
			}
		}
	);
};

github.prototype._closeIssue = function (repo, number) {
	this.gh.issues.edit({
			user: this.user,
			repo: repo,
			state: 'closed',
			number: number,
		},
		function (err, res) {
			if (err) {
				console.log(err);
			}
		}
	);
};