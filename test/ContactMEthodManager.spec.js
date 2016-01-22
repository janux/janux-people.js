'use strict';

var ContactMethodManager = require('../index').ContactMethodManager;
var PhoneNumber = require('../index').PhoneNumber;
var PostalAddress = require('../index').PostalAddress;

var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
var basarat = require('../dist/collections');
var collections = basarat.collections;
var Dictionary = collections.Dictionary;

/* global describe, it, beforeEach, fail */
var log4js = require('log4js'), util = require('util');
var log = log4js.getLogger('ContactMethodManager_test');

function addContacts(cmm){
	expect(_.isObject(cmm)).to.equal(true);

	// Add Phone Number
	var phone = new PhoneNumber();
	phone.setNumber('66664444');

	// Postal Address
	var homeAddress = new PostalAddress();
	homeAddress.setLine1('1415 L Street');
	homeAddress.setLine2('Suite 200');
	homeAddress.setCityAsstring('Sacramento');
	homeAddress.setStateProvinceAsstring('CA');
	homeAddress.setPostalCode('95814');
	
	var contacts = new Dictionary();
	contacts.setValue('phoneNumber1', phone);
	contacts.setValue('homeAddress',  homeAddress);

	cmm.setContactMethods(contacts);
}

describe('ContactMethodManager', function () {

	var TYPE_NAME = 'ContactMethodManager';
	var cMethodManager;

	// run before every test in the suite
	beforeEach(function () {
		cMethodManager = new ContactMethodManager();
	});

	it('should instantiate with basic fields', function () {
		log.info('cMethodManager after creation: %j', cMethodManager);
		expect(cMethodManager.typeName).to.equal(TYPE_NAME);
		expect(cMethodManager).to.be.instanceof(Object);
	});

	it('typeName should be immutable', function () {
		expect(cMethodManager.typeName).to.equal(TYPE_NAME);
		try {
			cMethodManager.typeName = 'somethingElse';
			expect.fail('should not be able to assign to typeName');
		}
		catch (e) {
		}
		expect(cMethodManager.typeName).to.equal(TYPE_NAME);
	});

	it('should be able to retrieve the phone number and address of a cMethodManager individually', function(){
		
		// add both, phone number and address
		addContacts(cMethodManager);

		var phone = cMethodManager.getContactMethod('phoneNumber1');

		expect(phone.getNumber()).to.equal('66664444');
		
		var postalAddr = cMethodManager.getContactMethod('homeAddress');

		expect(postalAddr.getLine1()).to.equal('1415 L Street');
		expect(postalAddr.getLine2()).to.equal('Suite 200');
		expect(postalAddr.getCityAsstring()).to.equal('Sacramento');
		expect(postalAddr.getStateProvinceAsstring()).to.equal('CA');
		expect(postalAddr.getPostalCode()).to.equal('95814');
	});

	it('should get all contact methods of a cMethodManager', function(){

		// add contacts
		addContacts(cMethodManager);

		// get contacts
		var contacts = cMethodManager.getContactMethods();

		// get phone
		var phone = contacts.getValue('phoneNumber1');

		expect(phone.getNumber()).to.equal('66664444');

		// get address
		var postalAddr = contacts.getValue('homeAddress');

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