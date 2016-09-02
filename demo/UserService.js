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

// Returns the number of users
UserService.prototype.count = function () {
	return this.userDAO.count();
};

// Find a single user by Id
UserService.prototype.findById = function (userId) {
	return this.userDAO.findById(userId);
};

// Find a single user by username
UserService.prototype.findByUsername = function (userName) {
	return this.userDAO.findByUsername(userName);
};

// Find users by name
UserService.prototype.findByName = function (name) {
	return this.userDAO.findByName(name);
};

// Find a single user by email address
UserService.prototype.findByEmail = function (email) {
	return this.userDAO.findByEmail(email);
};

// Save one or more users
UserService.prototype.save = function (aUserObj) {
	this.userDAO.save(aUserObj);
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