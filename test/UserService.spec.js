'use strict';

var userService = require('../index').UserService.singleton();
var UsersGenerator = require('../index').UsersGenerator;
var Person = require('../index').Person;

var chai = require('chai');
var expect = chai.expect;

/* global describe, it, beforeEach, fail */
var log4js = require('log4js'), util = require('util');
var log = log4js.getLogger('UserService_test');

var hydrateUserContact = function (userObj) {
	userObj.contact = Person.fromJSON(JSON.parse(userObj.contact));
	return userObj;
};

describe('UserService', function () {
	var usersGen = new UsersGenerator();

	// Generate fake users
	var fakeUsers = usersGen.generateUsers(3);

	// Take one fake user for test
	var aUser = hydrateUserContact(fakeUsers[0]);

	// Add users
	userService.save(fakeUsers);

	// run before every test in the suite
	// beforeEach(function () {
	//
	// });

	it('should be able to get a user by id from service', function(done){

		// Get user from service
		userService.findById(aUser.userId).then(function (user) {
			// The user obtained from the service must have at least the specified fields
			expect(user).to.have.any.keys(
				'userId', 'username', 'password', 'role', 'contact', 'cdate', 'mdate'
			);

			// User data obtained from the service must match the data used to create it
			expect(fakeUsers[0].userId).to.equal(aUser.userId);
			expect(fakeUsers[0].username).to.equal(aUser.username);
			expect(fakeUsers[0].password).to.equal(aUser.password);

			// Contact data obtained from the service must match the data used to create it
			expect(fakeUsers[0].contact.name.honorificPrefix).to.equal(aUser.contact.name.honorificPrefix);
			expect(fakeUsers[0].contact.name.first).to.equal(aUser.contact.name.first);
			expect(fakeUsers[0].contact.name.middle).to.equal(aUser.contact.name.middle);
			expect(fakeUsers[0].contact.name.last).to.equal(aUser.contact.name.last);
			expect(fakeUsers[0].contact.name.honorificSuffix).to.equal(aUser.contact.name.honorificSuffix);

			// Person vs Person2 Phone Number
			expect(fakeUsers[0].contact.getPhoneNumber('work').number).to.equal(aUser.contact.getPhoneNumber('work').number);
			expect(fakeUsers[0].contact.getPhoneNumber('work').type).to.equal(aUser.contact.getPhoneNumber('work').type);

			// Person vs Person2 Email
			expect(fakeUsers[0].contact.getEmailAddress('work').address).to.equal(aUser.contact.getEmailAddress('work').address);
			expect(fakeUsers[0].contact.getEmailAddress('work').type).to.equal(aUser.contact.getEmailAddress('work').type);

			// Person vs Person2 Address
			expect(fakeUsers[0].contact.getPostalAddress('Home').line1).to.equal(aUser.contact.getPostalAddress('Home').line1);
			expect(fakeUsers[0].contact.getPostalAddress('Home').line2).to.equal(aUser.contact.getPostalAddress('Home').line2);
			expect(fakeUsers[0].contact.getPostalAddress('Home').getCityAsstring()).to.equal(aUser.contact.getPostalAddress('Home').getCityAsstring());
			expect(fakeUsers[0].contact.getPostalAddress('Home').getStateProvinceAsstring()).to.equal(aUser.contact.getPostalAddress('Home').getStateProvinceAsstring());
			expect(fakeUsers[0].contact.getPostalAddress('Home').postalCode).to.equal(aUser.contact.getPostalAddress('Home').postalCode);

			// log.info('user get by id from the service', user);
			done();
		});
	});

	it('should be able to get a user by username from service', function(done){

		// Get user by username from service
		userService.findByUsername(aUser.username).then(function (user) {

			// The user obtained from the service must have at least the specified fields
			expect(user).to.have.any.keys(
				'userId', 'username', 'password', 'role', 'contact', 'cdate', 'mdate'
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
			expect(user.contact.getPhoneNumber('work').number).to.equal(aUser.contact.getPhoneNumber('work').number);
			expect(user.contact.getPhoneNumber('work').type).to.equal(aUser.contact.getPhoneNumber('work').type);

			// Person vs Person2 Address
			expect(user.contact.getPostalAddress('Home').line1).to.equal(aUser.contact.getPostalAddress('Home').line1);
			expect(user.contact.getPostalAddress('Home').line2).to.equal(aUser.contact.getPostalAddress('Home').line2);
			expect(user.contact.getPostalAddress('Home').getCityAsstring()).to.equal(aUser.contact.getPostalAddress('Home').getCityAsstring());
			expect(user.contact.getPostalAddress('Home').getStateProvinceAsstring()).to.equal(aUser.contact.getPostalAddress('Home').getStateProvinceAsstring());
			expect(user.contact.getPostalAddress('Home').postalCode).to.equal(aUser.contact.getPostalAddress('Home').postalCode);

			// log.info('user get by username from the service', user);
			done();
		});
	});

	it('should find one or more users from a partial string', function(done){

		// Get user by partial name from service
		var partialName = aUser.contact.name.first.substr(0,5);

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

	it('should not get a user from service', function(done) {

		userService.findByName('000000').then(function (users) {

			expect(users).to.have.length.below(1);

			done();
		});
	});

	it('should get all users from service', function(done) {

		userService.findByName('').then(function (users) {

			userService.count().then(function (numberOfUsers) {

				expect(users.length).to.be.equal(numberOfUsers);
				expect(users.length).to.be.equal(fakeUsers.length);
			});

			done();
		});
	});

	it('should find one user by email address', function(done){

		userService.findByEmail(aUser.contact.getEmailAddress('work').address).then(function (user) {

			// // Person vs Person2 Email
			expect(user.contact.getEmailAddress('work').address).to.equal(aUser.contact.getEmailAddress('work').address);
			expect(user.contact.getEmailAddress('work').type).to.equal(aUser.contact.getEmailAddress('work').type);

			done();
		});
	});
});
