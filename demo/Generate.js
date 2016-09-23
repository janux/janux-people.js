'use strict';

var userDAO = require('../index').UserDAO.object(); // createInstance();
var userService = require('../index').UserService.singleton(userDAO);
var UsersGenerator = require('../index').UsersGenerator;
var md5 = require('MD5');

var usersGen = new UsersGenerator();

// Generate some fake users
var fakeUsers = usersGen.generateUsers(3);

// Generate known users
var users = [
	{
		username: 'widget',
		password: md5('test1'),
		roles: ["WIDGET_DESIGNER"]
	},
	{
		username: 'manager',
		password: md5('test2'),
		roles: ["MANAGER"]
	},
	{
		username: 'admin',
		password: md5('1234567'),
		roles: ["ADMIN"]
	}
];

users.forEach(function (user, iUser) {
	users[iUser] = usersGen.generateUser(user);
});

// Put together
users = users.concat(fakeUsers);

// Save users (This creates the file with the collection of users)
userService.save( users );