'use strict';

var Person = require('../index').Person;
var PhoneNumber = require('../index').PhoneNumber;
var PostalAddress = require('../index').PostalAddress;

var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;

/* global describe, it, beforeEach, fail */
var log4js = require('log4js'), util = require('util');
var log = log4js.getLogger('Person_test');

describe('Person', function () {

	var TYPE_NAME = 'PersonImpl';
	var person;

	// run before every test in the suite
	beforeEach(function () {
		person = new Person('Mr', 'Jonh', 'Peter', 'Sanders', null, "Smith");
	});

	it('should instantiate with basic fields', function () {
		log.info('person after creation: %j', person);
		expect(person.typeName).to.equal(TYPE_NAME);
		expect(person).to.be.instanceof(Object);
	});

	it('typeName should be immutable', function () {
		expect(person.typeName).to.equal(TYPE_NAME);
		try {
			person.typeName = 'somethingElse';
			expect.fail('should not be able to assign to typeName');
		}
		catch (e) {
		}
		expect(person.typeName).to.equal(TYPE_NAME);
	});

	it('should be able to add/retrieve basic data of a person', function () {
		expect(_.isObject(person)).to.equal(true);

		expect(person.name.honorificPrefix).to.equal('Mr');
		expect(person.name.first).to.equal('Jonh');
		expect(person.name.middle).to.equal('Peter');
		expect(person.name.maternal).to.equal('Smith');
		expect(person.name.last).to.equal('Sanders');

		// The honorific Prefix, first, middle and last names
		expect(person.name.longName).to.equal('Mr Jonh Peter Smith Sanders');
	});

	it('should be able to add/retrieve the phone number of a person', function () {
		// Phone Number
		var aPhone = new PhoneNumber('5555060593');
		person.setContactMethod('work', aPhone);

		var phone = person.phoneNumber('work');

		expect(phone.number).to.equal('5555060593');
	});

	it('should be able to retrieve the phone numbers of a person as Array or Dictionary', function () {
		// Phone Number
		var aPhone = new PhoneNumber('5555060593');
		person.setContactMethod('work', aPhone);

		// Phone numbers array
		var phoneNumbers = person.phoneNumbers();

		expect(phoneNumbers[0].type).to.equal('work');
		expect(phoneNumbers[0].number).to.equal('5555060593');

		// Phone numbers dictionary
		var phoneNumbers = person.phoneNumbers(true);

		expect(phoneNumbers.getValue('work').type).to.equal('work');
		expect(phoneNumbers.getValue('work').number).to.equal('5555060593');
	});

	it('should be able to retrieve the primary phone number of a person', function () {

		person.setContactMethod('work', new PhoneNumber('5555060593'));
		person.setContactMethod('home', new PhoneNumber('1209191723'));

		// Primary Phone Number
		expect(person.phoneNumber().type).to.equal('work');
		expect(person.phoneNumber().number).to.equal('5555060593');

	});

	// it('should be able to update a contact method by type', function () {
	//
	// 	person.setContactMethod('work', new PhoneNumber('5555060593'));
	//
	// 	// Primary Phone Number
	// 	expect(person.phoneNumber().type).to.equal('work');
	// 	expect(person.phoneNumber().number).to.equal('5555060593');
	//
	// 	person.setContactMethod('work', new PhoneNumber('88888888888'));
	//
	// 	// Primary Phone Number
	// 	expect(person.phoneNumber('work').type).to.equal('work');
	// 	expect(person.phoneNumber('work').number).to.equal('88888888888');
	//
	// });

	it('should be able to add/retrieve the postal address of a person', function () {
		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.cityText = 'Sacramento';
		aPostalAddr.stateText = 'CA';
		aPostalAddr.postalCode = '95814';
		person.setContactMethod('Home', aPostalAddr);

		var postalAddr = person.postalAddress('Home');

		expect(postalAddr.line1).to.equal('1415 L Street');
		expect(postalAddr.line2).to.equal('Suite 200');
		expect(postalAddr.cityText).to.equal('Sacramento');
		expect(postalAddr.stateText).to.equal('CA');
		expect(postalAddr.postalCode).to.equal('95814');

		// Postal addresses array
		var postalAddresses = person.postalAddresses();

		expect(postalAddresses[0].type).to.equal('Home');
		expect(postalAddresses[0].line1).to.equal('1415 L Street');
		expect(postalAddresses[0].line2).to.equal('Suite 200');
		expect(postalAddresses[0].cityText).to.equal('Sacramento');
		expect(postalAddresses[0].stateText).to.equal('CA');
		expect(postalAddresses[0].postalCode).to.equal('95814');
	});

	it('should be deserialized via fromJSON', function () {

		var aPhone = new PhoneNumber('5555060593');
		person.setContactMethod('work', aPhone);

		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.cityText = 'Sacramento';
		aPostalAddr.stateText = 'CA';
		aPostalAddr.postalCode = '95814';
		person.setContactMethod('Home', aPostalAddr);

		var person2 = Person.fromJSON(person.toJSON());

		// Person vs Person2 Name
		expect(person.name.honorificPrefix).to.equal(person2.name.honorificPrefix);
		expect(person.name.first).to.equal(person2.name.first);
		expect(person.name.middle).to.equal(person2.name.middle);
		expect(person.name.last).to.equal(person2.name.last);
		expect(person.name.maternal).to.equal(person2.name.maternal);
		expect(person.name.honorificSuffix).to.equal(person2.name.honorificSuffix);

		// Person vs Person2 Phone Number
		expect(person.phoneNumber('work').number).to.equal(person2.phoneNumber('work').number);
		expect(person.phoneNumber('work').type).to.equal(person2.phoneNumber('work').type);

		// Person vs Person2 Address
		expect(person.postalAddress('Home').line1).to.equal(person2.postalAddress('Home').line1);
		expect(person.postalAddress('Home').line2).to.equal(person2.postalAddress('Home').line2);
		expect(person.postalAddress('Home').cityText).to.equal(person2.postalAddress('Home').cityText);
		expect(person.postalAddress('Home').stateText).to.equal(person2.postalAddress('Home').stateText);
		expect(person.postalAddress('Home').postalCode).to.equal(person2.postalAddress('Home').postalCode);
	});
});
