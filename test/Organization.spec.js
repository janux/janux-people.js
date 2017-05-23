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

	it('should be able to add/retrieve basic data of a organization', function () {
		expect(_.isObject(org)).to.equal(true);

		expect(org.name).to.equal('Coca-Cola');
	});

	it('should be able to add/retrieve the phone number of a organization', function () {
		// Phone Number
		var aPhone = new PhoneNumber('689655555');
		org.setContactMethod('work', aPhone);

		expect(org.phoneNumber('work').number).to.equal('689655555');
	});

	it('should be able to add/retrieve the postal address of a organization', function () {
		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.cityText = 'Sacramento';
		aPostalAddr.stateText = 'CA';
		aPostalAddr.postalCode = '95814';
		org.setContactMethod('Home', aPostalAddr);

		var postalAddr = org.postalAddress('Home');

		expect(postalAddr.line1).to.equal('1415 L Street');
		expect(postalAddr.line2).to.equal('Suite 200');
		expect(postalAddr.cityText).to.equal('Sacramento');
		expect(postalAddr.stateText).to.equal('CA');
		expect(postalAddr.postalCode).to.equal('95814');
	});

	it('should be deserialized via fromJSON', function () {

		var aPhone = new PhoneNumber('5555060593');
		org.setContactMethod('headquarters', aPhone);

		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.cityText = 'Sacramento';
		aPostalAddr.stateText = 'CA';
		aPostalAddr.postalCode = '95814';
		org.setContactMethod('headquarters', aPostalAddr);

		var org2 = Organization.fromJSON(org.toJSON());

		// org vs org2 Name
		expect(org.name).to.equal(org2.name);

		// org vs org2 Phone Number
		expect(org.phoneNumber('headquarters').number).to.equal(org2.phoneNumber('headquarters').number);
		expect(org.phoneNumber('headquarters').type).to.equal(org2.phoneNumber('headquarters').type);

		// org vs org2 Address
		expect(org.postalAddress('headquarters').line1).to.equal(org2.postalAddress('headquarters').line1);
		expect(org.postalAddress('headquarters').line2).to.equal(org2.postalAddress('headquarters').line2);
		expect(org.postalAddress('headquarters').cityText).to.equal(org2.postalAddress('headquarters').cityText);
		expect(org.postalAddress('headquarters').stateText).to.equal(org2.postalAddress('headquarters').stateText);
		expect(org.postalAddress('headquarters').postalCode).to.equal(org2.postalAddress('headquarters').postalCode);
	});
});
