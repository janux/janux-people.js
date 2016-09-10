"use strict";

// User data access object
var _ = require('lodash');

// variable to hold the singleton instance, if used in that manner
var userServiceInstance = undefined;

//
// Example of users service
//

// Constructor
function UserService(aDAO) {
	this.userDAO = aDAO;
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

UserService.prototype.findByUsernameMatch = function (userName) {
	return this.userDAO.findByUsernameMatch(userName);
};

// Find users by name
UserService.prototype.findByName = function (name) {
	return this.userDAO.findByName(name);
};

// Find a single user by email address
UserService.prototype.findByEmail = function (email) {
	return this.userDAO.findByEmail(email);
};

// Find users by phone number
UserService.prototype.findByPhone = function (phone) {
	return this.userDAO.findByPhone(phone);
};

// Save one or more users
UserService.prototype.save = function (aUserObj) {
	this.userDAO.save(aUserObj);
};

// Save or update a single user object
UserService.prototype.saveOrUpdate = function (aUserObj) {
	this.userDAO.saveOrUpdate(aUserObj);
};

// Delete one user
UserService.prototype.delete = function (id) {
	this.userDAO.delete(id);
};

// var createInstance = function(userDAO) {
//
// 	// Constructor
// 	function UserService() {
// 		userDAO.call(this);
// 	}
//
// 	UserService.prototype = Object.create(userDAO.prototype);
// 	UserService.prototype.constructor = UserService;
//
// 	return new UserService();
// };

exports.createInstance = function(aDAO) {
	return new UserService(aDAO);
	// return createInstance(aDAO);
};

exports.singleton = function(aDAO) {
	// if the singleton has not yet been instantiated, do so
	if ( !_.isObject(userServiceInstance) ) {
		userServiceInstance = new UserService(aDAO);
		// userServiceInstance = createInstance(aDAO);
	}

	return userServiceInstance;
};