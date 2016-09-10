'use strict';

var userDAO = require('../index').UserDAO.createInstance();
var userService = require('../index').UserService.singleton(userDAO);
var UsersGenerator = require('../index').UsersGenerator;

var usersGen = new UsersGenerator();

// Generate some fake users
var fakeUsers = usersGen.generateUsers(3);

// Generate known users
var users = [
	{
		username: 'widget',
		password: 'test1',
		role: "WIDGET_DESIGNER"
	},
	{
		username: 'manager',
		password: 'test2',
		role: "MANAGER"
	},
	{
		username: 'admin',
		password: '1234567',
		role: "ADMIN"
	}
];

users.forEach(function (user, iUser) {
	users[iUser] = usersGen.generateUser(user);
});

// Put together
users = users.concat(fakeUsers);

// Save users (This creates the file with the collection of users)
userService.save( users );