/**
 * Project janux-people.js
 * Created by ernesto on 11/24/17.
 */
'use strict';

var Organization = require('../index').Organization;
var PhoneNumber = require('../index').PhoneNumber;
var PostalAddress = require('../index').PostalAddress;
var PostalAddressMX = require('../index').PostalAddressMX;
var PostalAddressBR = require('../index').PostalAddressBR;

var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;

/* global describe, it, beforeEach, fail */
var log4js = require('log4js'), util = require('util');
var log = log4js.getLogger('Organization_test');

describe('Postal address', function () {

	var organization;

	// run before every test in the suite
	beforeEach(function () {
		organization = new Organization('Coca-Cola');
	});

	it('should be able to add/retrieve the postal address of a organization', function () {

		var anotherPostalAddrMX = new PostalAddressMX();
		var streetNumberMX = "10 int 2";
		var streetNameMX = "Alvarado Rodriguez";
		var localityMX = "Lomas de Sotelo";
		var municipalityMX = "Azcapotzalco";
		var cityTextMX = "CDMX";
		var stateTextMX = "EDOMX";
		var postalCodeMX = "11111";
		var countryTextMX = "MX";
		const typeWork = 'Work';

		// Postal Address
		var aPostalAddr = new PostalAddress();
		aPostalAddr.line1 = '1415 L Street';
		aPostalAddr.line2 = 'Suite 200';
		aPostalAddr.cityText = 'Sacramento';
		aPostalAddr.stateText = 'CA';
		aPostalAddr.postalCode = '95814';

		anotherPostalAddrMX.streetNumber = streetNumberMX;
		anotherPostalAddrMX.streetName = streetNameMX;
		anotherPostalAddrMX.locality = localityMX;
		anotherPostalAddrMX.municipality = municipalityMX;
		anotherPostalAddrMX.cityText = cityTextMX;
		anotherPostalAddrMX.stateText = stateTextMX;
		anotherPostalAddrMX.postalCode = postalCodeMX;
		anotherPostalAddrMX.countryText = countryTextMX;

		organization.setContactMethod('Home', aPostalAddr);


		organization.setContactMethod(typeWork, anotherPostalAddrMX);

		var postalAddr = organization.postalAddress('Home');


		expect(postalAddr.line1).to.equal('1415 L Street');
		expect(postalAddr.line2).to.equal('Suite 200');
		expect(postalAddr.cityText).to.equal('Sacramento');
		expect(postalAddr.stateText).to.equal('CA');
		expect(postalAddr.postalCode).to.equal('95814');

		var postalAddrMX = organization.postalAddress(typeWork);


		expect(postalAddrMX.streetNumber).to.equal(streetNumberMX);
		expect(postalAddrMX.streetName).to.equal(streetNameMX);
		expect(postalAddrMX.locality).to.equal(localityMX);
		expect(postalAddrMX.municipality).to.equal(municipalityMX);
		expect(postalAddrMX.cityText).to.equal(cityTextMX);
		expect(postalAddrMX.stateText).to.equal(stateTextMX);
		expect(postalAddrMX.postalCode).to.equal(postalCodeMX);
	});

	it('should be deserialized via fromJSON', function () {

		const headquarterType = 'headquarters';

		// Postal Address
		var aPostalAddr = new PostalAddressMX();
		aPostalAddr.streetName = 'Alvarado Rodriguez';
		aPostalAddr.streetNumber = '10 int 2';
		aPostalAddr.locality = 'Lomas de Sotelo';
		aPostalAddr.municipality = 'Azcapotzalco';
		aPostalAddr.cityText = 'CDMX';
		aPostalAddr.stateText = 'EDMX';
		aPostalAddr.postalCode = '95814';
		organization.setContactMethod(headquarterType, aPostalAddr);

		var org2 = Organization.fromJSON(organization.toJSON());

		// org vs org2 Name
		expect(organization.name).to.equal(org2.name);

		// org vs org2 Address
		expect(organization.postalAddress(headquarterType).streetName).to.equal(org2.postalAddress(headquarterType).streetName);
		expect(organization.postalAddress(headquarterType).streetNumber).to.equal(org2.postalAddress(headquarterType).streetNumber);
		expect(organization.postalAddress(headquarterType).locality).to.equal(org2.postalAddress(headquarterType).locality);
		expect(organization.postalAddress(headquarterType).municipality).to.equal(org2.postalAddress(headquarterType).municipality);
		expect(organization.postalAddress(headquarterType).cityText).to.equal(org2.postalAddress(headquarterType).cityText);
		expect(organization.postalAddress(headquarterType).stateText).to.equal(org2.postalAddress(headquarterType).stateText);
		expect(organization.postalAddress(headquarterType).postalCode).to.equal(org2.postalAddress(headquarterType).postalCode);
	});
});
