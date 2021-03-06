'use strict';

// exposing modules
exports.Person    		= require('./dist/impl/Person').PersonImpl;
exports.Organization 	= require('./dist/impl/Organization').OrganizationImpl;
exports.PhoneNumber 	= require('./dist/impl/PhoneNumber').PhoneNumberImpl;
exports.PostalAddress 	= require('./dist/impl/PostalAddress').PostalAddressImpl;
exports.EmailAddress 	= require('./dist/impl/EmailAddress').EmailAddressImpl;

// Users Generator
exports.UsersGenerator 	= require('./generator/UsersGenerator').UsersGenerator;

// Demo
exports.UserService 	= require('./demo/UserService');