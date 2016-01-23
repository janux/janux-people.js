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
		person = new Person();
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

		person.name.setHonorificPrefix('Mr');
		person.name.setFirst('Jonh');
		person.name.setMiddle('Peter');
		person.name.setLast('Sanders');

		expect(person.name.getHonorificPrefix()).to.equal('Mr');
		expect(person.name.getFirst()).to.equal('Jonh');
		expect(person.name.getMiddle()).to.equal('Peter');
		expect(person.name.getLast()).to.equal('Sanders');

		// The honorific Prefix, first, middle and last names
		expect(person.name.getLong()).to.equal('Mr Jonh Peter Sanders');
	});

	it('should be able to add/retrieve the phone number of a person', function(){
		// Phone Number
		var aPhone = new PhoneNumber();
		aPhone.setNumber('5555060593');
		person.setContactMethod('PhoneNumber', aPhone);

		var phone = person.getPhoneNumber('PhoneNumber');

		expect(phone.getNumber()).to.equal('5555060593');
	});

	it('should be able to add/retrieve the postal address of a person', function(){
		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.setLine1('1415 L Street');
		aPostalAddr.setLine2('Suite 200');
		aPostalAddr.setCityAsstring('Sacramento');
		aPostalAddr.setStateProvinceAsstring('CA');
		aPostalAddr.setPostalCode('95814');
		person.setContactMethod('Home', aPostalAddr);

		var postalAddr = person.getPostalAddress('Home');

		expect(postalAddr.getLine1()).to.equal('1415 L Street');
		expect(postalAddr.getLine2()).to.equal('Suite 200');
		expect(postalAddr.getCityAsstring()).to.equal('Sacramento');
		expect(postalAddr.getStateProvinceAsstring()).to.equal('CA');
		expect(postalAddr.getPostalCode()).to.equal('95814');
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
