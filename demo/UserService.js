"use strict";

// User data access object
var _ = require('lodash');

// variable to hold the singleton instance, if used in that manner
var userServiceInstance = undefined;

//
// Example of users service
//
var createInstance = function(userDAO) {

	// Constructor
	function UserService() {
		userDAO.call(this);
	}

	UserService.prototype = Object.create(userDAO.prototype);
	UserService.prototype.constructor = UserService;

	return new UserService();
};

exports.createInstance = function(aDAO) {
	return createInstance(aDAO);
};

exports.singleton = function(aDAO) {
	// if the singleton has not yet been instantiated, do so
	if ( !_.isObject(userServiceInstance) ) {
		userServiceInstance = createInstance(aDAO);
	}

	return userServiceInstance;
};