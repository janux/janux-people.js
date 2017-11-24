'use strict';

// exposing modules
exports.Person    		= require('./dist/impl/Person').PersonImpl;
exports.Organization 	= require('./dist/impl/Organization').OrganizationImpl;
exports.PhoneNumber 	= require('./dist/impl/PhoneNumber').PhoneNumberImpl;
exports.PostalAddress 	= require('./dist/impl/geography/postal-address/PostalAddress.js').PostalAddressImpl;
exports.PostalAddressMX = require('./dist/impl/geography/postal-address/PostalAddressMX').PostalAddressMXImpl;
exports.PostalAddressBR = require('./dist/impl/geography/postal-address/PostalAddressBR').PostalAddressBRImpl;
exports.EmailAddress 	= require('./dist/impl/EmailAddress').EmailAddressImpl;
