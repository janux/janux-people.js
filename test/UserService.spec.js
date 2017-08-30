'use strict';

var userDAO = require('../generator/index').UserDAO.object(); // createInstance();
var userService = require('../generator/index').UserService.singleton(userDAO);
var UsersGenerator = require('../generator/index').UsersGenerator;

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

/* global describe, it, beforeEach, fail */
var log4js = require('log4js'), util = require('util');
var log = log4js.getLogger('UserService_test');


describe('UserService', function () {
	var usersGen = new UsersGenerator();

	// Generate fake users
	var fakeUsers = usersGen.generateUsers(3);

	// Take one fake user for test
	var aUser = userService.hydrateUsersContacts(fakeUsers[0]);

	// Add users
	userService.save(fakeUsers);

	// run before every test in the suite
	// beforeEach(function () {
	//
	// });

	it('should be able to get a user by id from service', function (done) {

		// Get user from service
		userService.findById(aUser.userId).then(function (user) {

			// The user obtained from the service must have at least the specified fields
			expect(user).to.have.any.keys(
				'userId', 'username', 'password', 'roles', 'contact', 'cdate', 'mdate'
			);

			// User data obtained from the service must match the data used to create it
			expect(user.userId).to.equal(aUser.userId);
			expect(user.username).to.equal(aUser.username);
			expect(user.password).to.equal(aUser.password);

			// Contact data obtained from the service must match the data used to create it
			expect(user.contact.name.honorificPrefix).to.equal(aUser.contact.name.honorificPrefix);
			expect(user.contact.name.first).to.equal(aUser.contact.name.first);
			expect(user.contact.name.middle).to.equal(aUser.contact.name.middle);
			expect(user.contact.name.last).to.equal(aUser.contact.name.last);
			expect(user.contact.name.honorificSuffix).to.equal(aUser.contact.name.honorificSuffix);

			// Person vs Person2 Phone Number
			expect(user.contact.phoneNumber('work').number).to.equal(aUser.contact.phoneNumber('work').number);
			expect(user.contact.phoneNumber('work').type).to.equal(aUser.contact.phoneNumber('work').type);

			// Person vs Person2 Email
			expect(user.contact.emailAddress('work').address).to.equal(aUser.contact.emailAddress('work').address);
			expect(user.contact.emailAddress('work').type).to.equal(aUser.contact.emailAddress('work').type);

			// Person vs Person2 Address
			expect(user.contact.postalAddress('Home').line1).to.equal(aUser.contact.postalAddress('Home').line1);
			expect(user.contact.postalAddress('Home').line2).to.equal(aUser.contact.postalAddress('Home').line2);
			expect(user.contact.postalAddress('Home').cityText).to.equal(aUser.contact.postalAddress('Home').cityText);
			expect(user.contact.postalAddress('Home').stateText).to.equal(aUser.contact.postalAddress('Home').stateText);
			expect(user.contact.postalAddress('Home').postalCode).to.equal(aUser.contact.postalAddress('Home').postalCode);

			// log.info('user get by id from the service', user);
			done();
		});
	});

	it('should be able to get a user by username from service', function (done) {

		// Get user by username from services
		userService.findByUsername(aUser.username).then(function (user) {

			// The user obtained from the service must have at least the specified fields
			expect(user).to.have.any.keys(
				'userId', 'username', 'password', 'roles', 'contact', 'cdate', 'mdate'
			);

			// User data obtained from the service must match the data used to create it
			expect(user.userId).to.equal(aUser.userId);
			expect(user.username).to.equal(aUser.username);
			expect(user.password).to.equal(aUser.password);

			// Contact data obtained from the service must match the data used to create it
			expect(user.contact.name.honorificPrefix).to.equal(aUser.contact.name.honorificPrefix);
			expect(user.contact.name.first).to.equal(aUser.contact.name.first);
			expect(user.contact.name.middle).to.equal(aUser.contact.name.middle);
			expect(user.contact.name.last).to.equal(aUser.contact.name.last);
			expect(user.contact.name.honorificSuffix).to.equal(aUser.contact.name.honorificSuffix);

			// Person vs Person2 Phone Number
			expect(user.contact.phoneNumber('work').number).to.equal(aUser.contact.phoneNumber('work').number);
			expect(user.contact.phoneNumber('work').type).to.equal(aUser.contact.phoneNumber('work').type);

			// Person vs Person2 Address
			expect(user.contact.postalAddress('Home').line1).to.equal(aUser.contact.postalAddress('Home').line1);
			expect(user.contact.postalAddress('Home').line2).to.equal(aUser.contact.postalAddress('Home').line2);
			expect(user.contact.postalAddress('Home').cityText).to.equal(aUser.contact.postalAddress('Home').cityText);
			expect(user.contact.postalAddress('Home').stateText).to.equal(aUser.contact.postalAddress('Home').stateText);
			expect(user.contact.postalAddress('Home').postalCode).to.equal(aUser.contact.postalAddress('Home').postalCode);

			// log.info('user get by username from the service', user);
			done();
		});
	});

	it('should find one or more users from a partial string', function (done) {

		// Get user by partial name from service
		var partialName = aUser.contact.name.first.substr(0, 5);

		userService.findByName(partialName).then(function (users) {

			// Expect at least one user
			expect(users).to.have.length.above(0);

			var user = users[0];

			expect(user.contact.name.honorificPrefix).to.equal(aUser.contact.name.honorificPrefix);
			expect(user.contact.name.first).to.equal(aUser.contact.name.first);
			expect(user.contact.name.middle).to.equal(aUser.contact.name.middle);
			expect(user.contact.name.last).to.equal(aUser.contact.name.last);
			expect(user.contact.name.honorificSuffix).to.equal(aUser.contact.name.honorificSuffix);

			done();
		});
	});

	it('should not get a user from service', function (done) {

		userService.findByName('000000').then(function (users) {

			expect(users).to.have.length.below(1);

			done();
		});
	});

	it('should get all users from service', function (done) {

		userService.findByName('').then(function (users) {

			userService.count().then(function (numberOfUsers) {

				expect(users.length).to.equal(numberOfUsers);
				expect(users.length).to.equal(fakeUsers.length);

				done();
			});
		});
	});

	it('should find one user by email address', function (done) {

		// log.info('email to search', aUser.contact.emailAddress('work').address);

		userService.findByEmail(aUser.contact.emailAddress('work').address).then(function (user) {

			// log.info('email found', user, aUser.contact.emailAddress('work').address);

			// Person vs Person2 Email
			expect(user.contact.emailAddress('work').address).to.equal(aUser.contact.emailAddress('work').address);
			expect(user.contact.emailAddress('work').type).to.equal(aUser.contact.emailAddress('work').type);

			done();
		});
	});

	it('should find users by phone number', function (done) {

		userService.findByPhone(aUser.contact.phoneNumber('work').number).then(function (users) {

			// Expect at least one user
			expect(users).to.have.length.above(0);

			var user = users[0];

			// Person vs Person2 Phone Number
			expect(user.contact.phoneNumber('work').number).to.equal(aUser.contact.phoneNumber('work').number);
			expect(user.contact.phoneNumber('work').type).to.equal(aUser.contact.phoneNumber('work').type);

			done();
		});
	});

	it('should be able to update a user', function (done) {

		// Modify user record
		userService.findByUsername(aUser.username).then(function (user) {

			user.username = 'JanuxPeople';
			userService.saveOrUpdate(user);
			aUser = user;

			// Get modified user from service
			userService.findById(aUser.userId).then(function (user) {

				expect(user.username).to.equal('JanuxPeople');

				done();
			});
		});

	});

	it('should be able to delete a user by id', function (done) {

		userService.findByUsername(aUser.username).then(function (user) {
			userService.deleteUser(user);

			// Get user by username from service
			userService.findByUsername(user.username).then(function (user) {

				expect(user).to.equal(null);

				done();
			});
		});
	});
});
