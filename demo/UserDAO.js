"use strict";

var loki = require('lokijs');
var _ = require('lodash');
var Promise  = require('bluebird');

//  variable to hold the singleton instance, if used in that manner
var userDAOInstance = undefined;

var log4js = require('log4js'),
 	log = log4js.getLogger('UserService');

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

// Returns the number of entities available.
UserDAO.prototype.count = function (callback) {

	var number = this._users.count();
	return new Promise(function(resolve){
		resolve( number );
	}).asCallback(callback);
};

// Find User Object by id
UserDAO.prototype.findById = function (userId, callback) {

	var users = this._users.findOne( { userId:userId });
	return new Promise(function(resolve){
		resolve( users );
	}).asCallback(callback);
};

// Find User Object by username
UserDAO.prototype.findByUsername = function (username, callback) {

	var users = this._users.findOne( { username:username } );
	return new Promise(function(resolve){
		resolve( users );
	}).asCallback(callback);
};

// Find Users by name
UserDAO.prototype.findByName = function (name, callback) {
	var users = [];
	if(name !== ''){
		users = this._users.find({
			'$or': [
				{ 'contact.name.first' : {'$contains': name} },
				{ 'contact.name.middle' : {'$contains': name} },
				{ 'contact.name.last' : {'$contains': name} }
			]});
	}else{
		users = this._users.find();
	}

	return new Promise(function(resolve){
		resolve( users );
	}).asCallback(callback);
};

// Find User Object by email address
UserDAO.prototype.findByEmail = function (email, callback) {
	var usersByEmail = [];
	if(email !== ''){
		// usersByEmail = this._users.chain().where(function(user) {
		// 	var found = false;
		// 	log.info('user inside where', user.contact.phoneNumbers);
		// 	user.contact.emails.forEach(function(uEmail) {
		// 		if(uEmail.address === email){
		// 			found = true;
		// 		}
		// 	});
		// }).limit(1).data()[0];
		// usersByEmail = this._users.findOne(
		// 	{ 'contact.emails' : { 'address': email } }
		// );

		var users = this._users.find();
		users.forEach(function (user, iUser) {
			if(typeof user.contact.contactMethods !== 'undefined'){
				user.contact.contactMethods.emails.forEach(function(anEmail){
					if(anEmail.address === email){
						usersByEmail.push(users[iUser]);
					}
				});
			}
		});

	}else{
		usersByEmail = this._users.find();
	}

	return new Promise(function(resolve){
		resolve( usersByEmail[0] );
	}).asCallback(callback);
};

// Save new User Object
UserDAO.prototype.save = function (aUserObj) {
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