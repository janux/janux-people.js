"use strict";

var faker = require('faker'),
	md5 = require('MD5');

var Person = require('../index').Person;
var PhoneNumber = require('../index').PhoneNumber;
var PostalAddress = require('../index').PostalAddress;

//
// Generate fake users powered by faker.js
//

var UsersGenerator = (function () {

	// Constructor
	function UsersGenerator(n) {
		this._n = (typeof n === 'number')?n:0;
	}

	// Proceed to generate n fake users
	UsersGenerator.prototype.generateUsers = function (n) {

		var out = [];

		this._n = (typeof n === 'number')?n:faker.random.number(50);

		for (var x = 0; x < this._n; x++) {
			out.push(this.generateUser());
		}
		return out;
	};

	// Generate a single user
	UsersGenerator.prototype.generateUser = function () {
		var aDate = faker.date.past();
		return {
			"userId": faker.random.uuid(),
			"username": faker.internet.userName(),
			"password": md5(faker.internet.password()),
			"role": "DESIGNER",
			"contact": this.generateContact(),
			"mdate": aDate,
			"cdate": aDate
		};
	};

	// Generate contact for a user
	UsersGenerator.prototype.generateContact = function (gender) {
		if (typeof gender !== 'number') {
			gender = faker.random.number(1);
		}

		// Create a new fake person
		var person = new Person(
			faker.name.prefix(gender),
			faker.name.firstName(gender),
			'',
			faker.name.lastName(gender),
			faker.name.suffix(gender)
		);
		
		// Create a new fake phone for this person
		var aPhone = new PhoneNumber( faker.phone.phoneNumber() );
		person.setContactMethod('work', aPhone);

		// Create a new fake postal address for this person
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = faker.address.streetName();
		aPostalAddr.line2 = faker.address.streetAddress();
		aPostalAddr.setCityAsstring( faker.address.city() );
		aPostalAddr.setStateProvinceAsstring( faker.address.state() );
		aPostalAddr.postalCode = faker.address.zipCode();
		person.setContactMethod('Home', aPostalAddr);

		return JSON.stringify(person.toJSON());
	};

	return UsersGenerator;
}());

exports.UsersGenerator = UsersGenerator;

