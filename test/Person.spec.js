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
		person = new Person('Mr', 'Jonh', 'Peter', 'Sanders');
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

	it('should be able to add/retrieve basic data of a person', function(){
		expect(_.isObject(person)).to.equal(true);

		expect(person.name.honorificPrefix).to.equal('Mr');
		expect(person.name.first).to.equal('Jonh');
		expect(person.name.middle).to.equal('Peter');
		expect(person.name.last).to.equal('Sanders');

		// The honorific Prefix, first, middle and last names
		expect(person.name.getLong()).to.equal('Mr Jonh Peter Sanders');
	});

	it('should be able to add/retrieve the phone number of a person', function(){
		// Phone Number
		var aPhone = new PhoneNumber('5555060593');
		person.setContactMethod('work', aPhone);

		var phone = person.getPhoneNumber('work');

		expect(phone.number).to.equal('5555060593');

		// Phone numbers array
		var phoneNumbers = person.phoneNumbers();

		expect(phoneNumbers[0].type).to.equal('work');
		expect(phoneNumbers[0].number).to.equal('5555060593');
	});

	it('should be able to add/retrieve the postal address of a person', function(){
		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.setCityAsstring('Sacramento');
		aPostalAddr.setStateProvinceAsstring('CA');
		aPostalAddr.postalCode = '95814';
		person.setContactMethod('Home', aPostalAddr);

		var postalAddr = person.getPostalAddress('Home');

		expect(postalAddr.line1).to.equal('1415 L Street');
		expect(postalAddr.line2).to.equal('Suite 200');
		expect(postalAddr.getCityAsstring()).to.equal('Sacramento');
		expect(postalAddr.getStateProvinceAsstring()).to.equal('CA');
		expect(postalAddr.postalCode).to.equal('95814');

		// Postal addresses array
		var postalAddresses = person.postalAddresses();

		expect(postalAddresses[0].type).to.equal('Home');
		expect(postalAddresses[0].line1).to.equal('1415 L Street');
		expect(postalAddresses[0].line2).to.equal('Suite 200');
		expect(postalAddresses[0].getCityAsstring()).to.equal('Sacramento');
		expect(postalAddresses[0].getStateProvinceAsstring()).to.equal('CA');
		expect(postalAddresses[0].postalCode).to.equal('95814');
	});

	it('should be deserialized via fromJSON', function () {

		var aPhone = new PhoneNumber('5555060593');
		person.setContactMethod('work', aPhone);

		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.setCityAsstring('Sacramento');
		aPostalAddr.setStateProvinceAsstring('CA');
		aPostalAddr.postalCode = '95814';
		person.setContactMethod('Home', aPostalAddr);

		var person2 = Person.fromJSON(person.toJSON());

		// Person vs Person2 Name
		expect(person.name.honorificPrefix).to.equal(person2.name.honorificPrefix);
		expect(person.name.first).to.equal(person2.name.first);
		expect(person.name.middle).to.equal(person2.name.middle);
		expect(person.name.last).to.equal(person2.name.last);
		expect(person.name.honorificSuffix).to.equal(person2.name.honorificSuffix);

		// Person vs Person2 Phone Number
		expect(person.getPhoneNumber('work').number).to.equal(person2.getPhoneNumber('work').number);
		expect(person.getPhoneNumber('work').type).to.equal(person2.getPhoneNumber('work').type);

		// Person vs Person2 Address
		expect(person.getPostalAddress('Home').line1).to.equal(person2.getPostalAddress('Home').line1);
		expect(person.getPostalAddress('Home').line2).to.equal(person2.getPostalAddress('Home').line2);
		expect(person.getPostalAddress('Home').getCityAsstring()).to.equal(person2.getPostalAddress('Home').getCityAsstring());
		expect(person.getPostalAddress('Home').getStateProvinceAsstring()).to.equal(person2.getPostalAddress('Home').getStateProvinceAsstring());
		expect(person.getPostalAddress('Home').postalCode).to.equal(person2.getPostalAddress('Home').postalCode);
	});

	// assertions
	// see http://chaijs.com/api/bdd
	// some_prop).to.equal('somevalue'); // fails if some_prop is null
	// some_prop.should.have.length(3);
	// some_prop.should.be.a('string');
	// some_prop.should.have.property;
	//
	// expect(something).to.be.empty|true|false|null|undefine;
	// expect(something).to.be.not.empty;
	// expect(something).to.equal(some_value);
	// expect(something).to.be.instanceof(Array|String|Number|Function|Object);
});
