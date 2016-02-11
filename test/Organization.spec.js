'use strict';

var Organization = require('../index').Organization;
var PhoneNumber = require('../index').PhoneNumber;
var PostalAddress = require('../index').PostalAddress;

var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;

/* global describe, it, beforeEach, fail */
var log4js = require('log4js'), util = require('util');
var log = log4js.getLogger('Organization_test');

describe('Organization', function () {

	var TYPE_NAME = 'OrganizationImpl';
	var org;

	// run before every test in the suite
	beforeEach(function () {
		org = new Organization('Coca-Cola');
	});

	it('should instantiate with basic fields', function () {
		log.info('org after creation: %j', org);
		expect(org.typeName).to.equal(TYPE_NAME);
		expect(org).to.be.instanceof(Object);
	});

	it('typeName should be immutable', function () {
		expect(org.typeName).to.equal(TYPE_NAME);
		try {
			org.typeName = 'somethingElse';
			expect.fail('should not be able to assign to typeName');
		}
		catch (e) {
		}
		expect(org.typeName).to.equal(TYPE_NAME);
	});

	it('should be able to add/retrieve basic data of a organization', function(){
		expect(_.isObject(org)).to.equal(true);

		expect(org.name).to.equal('Coca-Cola');
	});

	it('should be able to add/retrieve the phone number of a organization', function(){
		// Phone Number
		var aPhone = new PhoneNumber('689655555');
		org.setContactMethod('work', aPhone);

		expect(org.getPhoneNumber('work').number).to.equal('689655555');
	});

	it('should be able to add/retrieve the postal address of a organization', function(){
		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.setCityAsstring('Sacramento');
		aPostalAddr.setStateProvinceAsstring('CA');
		aPostalAddr.postalCode = '95814';
		org.setContactMethod('Home', aPostalAddr);

		var postalAddr = org.getPostalAddress('Home');

		expect(postalAddr.line1).to.equal('1415 L Street');
		expect(postalAddr.line2).to.equal('Suite 200');
		expect(postalAddr.getCityAsstring()).to.equal('Sacramento');
		expect(postalAddr.getStateProvinceAsstring()).to.equal('CA');
		expect(postalAddr.postalCode).to.equal('95814');
	});

	it('should be deserialized via fromJSON', function () {

		var aPhone = new PhoneNumber('5555060593');
		org.setContactMethod('headquarters', aPhone);

		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.setCityAsstring('Sacramento');
		aPostalAddr.setStateProvinceAsstring('CA');
		aPostalAddr.postalCode = '95814';
		org.setContactMethod('headquarters', aPostalAddr);

		var org2 = Organization.fromJSON(org.toJSON());

		// org vs org2 Name
		expect(org.name).to.equal(org2.name);

		// org vs org2 Phone Number
		expect(org.getPhoneNumber('headquarters').number).to.equal(org2.getPhoneNumber('headquarters').number);
		expect(org.getPhoneNumber('headquarters').type).to.equal(org2.getPhoneNumber('headquarters').type);

		// org vs org2 Address
		expect(org.getPostalAddress('headquarters').line1).to.equal(org2.getPostalAddress('headquarters').line1);
		expect(org.getPostalAddress('headquarters').line2).to.equal(org2.getPostalAddress('headquarters').line2);
		expect(org.getPostalAddress('headquarters').getCityAsstring()).to.equal(org2.getPostalAddress('headquarters').getCityAsstring());
		expect(org.getPostalAddress('headquarters').getStateProvinceAsstring()).to.equal(org2.getPostalAddress('headquarters').getStateProvinceAsstring());
		expect(org.getPostalAddress('headquarters').postalCode).to.equal(org2.getPostalAddress('headquarters').postalCode);
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
