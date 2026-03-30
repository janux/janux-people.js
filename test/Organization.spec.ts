import { describe, it, beforeEach } from 'vitest';
import { expect } from 'chai';
import log4js from 'log4js';
import _ from 'lodash';
import { OrganizationImpl as Organization, PhoneNumberImpl as PhoneNumber, PostalAddressImpl as PostalAddress } from '../src';

const log = log4js.getLogger('Organization_test');

describe('Organization', function () {

	const TYPE_NAME = 'OrganizationImpl';
	let org: any;

	// run before every test in the suite
	beforeEach(function () {
		org = new Organization('Coca-Cola');
		org.code = 'COCA';
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

		// Org name
		expect(org.name).to.equal('Coca-Cola');
		// Org code
		expect(org.code).to.equal('COCA');
	});

	it('should be able to add/retrieve the phone number of a organization', function () {
		// Phone Number
		const aPhone = new PhoneNumber('689655555');
		org.setContactMethod('work', aPhone);

		expect(org.phoneNumber('work').number).to.equal('689655555');
	});

	it('should be able to add/retrieve the postal address of a organization', function () {
		// Postal Address
		const aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.cityText = 'Sacramento';
		aPostalAddr.stateText = 'CA';
		aPostalAddr.postalCode = '95814';
		org.setContactMethod('Home', aPostalAddr);

		const postalAddr = org.postalAddress('Home');

		expect(postalAddr.line1).to.equal('1415 L Street');
		expect(postalAddr.line2).to.equal('Suite 200');
		expect(postalAddr.cityText).to.equal('Sacramento');
		expect(postalAddr.stateText).to.equal('CA');
		expect(postalAddr.postalCode).to.equal('95814');
	});

	it('should be deserialized via fromJSON', function () {

		const aPhone = new PhoneNumber('5555060593');
		org.setContactMethod('headquarters', aPhone);

		// Postal Address
		const aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.cityText = 'Sacramento';
		aPostalAddr.stateText = 'CA';
		aPostalAddr.postalCode = '95814';
		org.setContactMethod('headquarters', aPostalAddr);

		const org2 = Organization.fromJSON(org.toJSON());

		// org vs org2 Name
		expect(org.name).to.equal(org2.name);

		// org vs org2 code
		expect(org.code).to.equal(org2.code);

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
