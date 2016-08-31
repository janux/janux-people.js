"use strict";

// User data access object
var userDAO = require('./UserDAO').createInstance();
var _ = require('lodash');

//  variable to hold the singleton instance, if used in that manner
var userServiceInstance = undefined;

//
// Example of users service
//

// Constructor
function UserService() {
	this.userDAO = userDAO;
}

// Get a single user by Id
UserService.prototype.findUserById = function (userId, callback) {
	return this.userDAO.findUserById(userId);
};

// Get a single user by username
UserService.prototype.findUserByName = function (userName) {
	return this.userDAO.findUserByName(userName);
};

// Add one or more users
UserService.prototype.addUser = function (aUserObj) {
	this.userDAO.addUser(aUserObj);
};

exports.createInstance = function() {
	return new UserService();
};

exports.singleton = function() {
	// if the singleton has not yet been instantiated, do so
	if ( !_.isObject(userServiceInstance) ) {
		userServiceInstance = new UserService();
	}

	return userServiceInstance;
};