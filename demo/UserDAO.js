"use strict";

var loki = require('lokijs');
var _ = require('lodash');
var Promise  = require('bluebird');

//  variable to hold the singleton instance, if used in that manner
var userDAOInstance = undefined;

//
// User Data Access Object
//

// Constructor
function UserDAO(dbName) {
	// Define database name
	dbName = (dbName != '') ? dbName : 'janux.people.db';
	// Create db
	this._db = new loki(dbName);
	// Add users collection
	this._users = this._db.addCollection('users');
}

// Get User Object by id
UserDAO.prototype.findUserById = function (userId, callback) {

	var users = this._users.findOne( { userId:userId });
	return new Promise(function(resolve){
		resolve( users );
	}).asCallback(callback);
};

// Get User Object by username
UserDAO.prototype.findUserByName = function (userName, callback) {

	var users = this._users.findOne( { username:userName } );
	return new Promise(function(resolve){
		resolve( users );
	}).asCallback(callback);
};

// Add new User Object
UserDAO.prototype.addUser = function (aUserObj) {
	this._users.insert(aUserObj);
};

exports.createInstance = function() {
	return new UserDAO();
};

exports.singleton = function() {
	// if the singleton has not yet been instantiated, do so
	if ( !_.isObject(userDAOInstance) ) {
		userDAOInstance = new UserDAO();
	}

	return userDAOInstance;
};