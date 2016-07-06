"use strict";

var faker = require('faker');

var UsersGenerator = (function () {
	
	function UsersGenerator() {}
	
	UsersGenerator.prototype.generateUsers = function (n) {
		var out = [];
		if (typeof n !== 'number') {
			n = faker.random.number(50);
		}
		for (var x = 0; x < n; x++) {
			out.push(this.generateUser());
		}
		return out;
	};
	
	UsersGenerator.prototype.generateUser = function () {
		var aDate = faker.date.past();
		return {
			"user_id": faker.random.uuid(),
			"username": faker.internet.userName(),
			"password": faker.internet.password(),
			"role": "DESIGNER",
			"contact": this.generateContact(),
			"mdate": aDate,
			"cdate": aDate
		};
	};
	
	UsersGenerator.prototype.generateContact = function (gender) {
		if (typeof gender !== 'number') {
			gender = faker.random.number(1);
		}
		var first = faker.name.firstName(gender);
		var last = faker.name.lastName(gender);
		return {
			"displayName": first + ' ' + last,
			"name": {
				"honorificPrefix": faker.name.prefix(gender),
				"first": first,
				"last": last,
				"honorificSuffix": faker.name.suffix(gender)
			},
			"emails": [
				{
					"address": faker.internet.email(first),
					"type": "work",
					"primary": "true"
				}
			],
			"phoneNumbers": [
				{
					"number": faker.phone.phoneNumber(),
					"type": "work1"
				}
			],
			"addresses": [
				{
					"type": "billing",
					"line1": faker.address.streetName(),
					"line2": faker.address.streetAddress(),
					"city": faker.address.city(),
					"state": faker.address.state(),
					"country": faker.address.country(),
					"postalCode": faker.address.zipCode()
				}
			]
		};
	};

	return UsersGenerator;
}());

exports.UsersGenerator = UsersGenerator;

