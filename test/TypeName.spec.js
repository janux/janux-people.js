'use strict';

var Person = require('../index').Person;
var Organization = require('../index').Organization;
var declareTypeName = require('../index').declareTypeName;
var tools = require('../dist/tools');

var chai = require('chai');
var expect = chai.expect;

/* global describe, it */

describe('typeName', function () {

	it('reports the declared name of Person and Organization, also in toJSON', function () {
		var person = new Person('Mr', 'Jonh', 'Peter', 'Sanders');
		var org = new Organization('Coca-Cola');
		expect(person.typeName).to.equal('PersonImpl');
		expect(person.toJSON().typeName).to.equal('PersonImpl');
		expect(org.typeName).to.equal('OrganizationImpl');
		expect(org.toJSON().typeName).to.equal('OrganizationImpl');
	});

	it('does not depend on the constructor name, which minifiers rename', function () {
		// a minifier renames the constructor function, e.g. to 't'
		var t = function t() {};
		tools.declareTypeName(t, 'PersonImpl');
		expect(tools.className(new t())).to.equal('PersonImpl');
	});

	it('lets a subclass that declares no name report its own class name', function () {
		class StaffImplTest extends Person {}
		expect(new StaffImplTest().typeName).to.equal('StaffImplTest');
	});

	it('lets a subclass declare its own name', function () {
		class t extends Person {}
		declareTypeName(t, 'StaffImpl');
		expect(new t().typeName).to.equal('StaffImpl');
		expect(new Person().typeName).to.equal('PersonImpl');
	});

	it('exports declareTypeName from the package index', function () {
		expect(declareTypeName).to.be.a('function');
	});

	it('is not inherited through an __extends that copies statics', function () {
		// the fallback branch of TypeScript's ES5 __extends helper
		function StaffImplTest() { Person.apply(this, arguments); }
		for (var p in Person) { if (Person.hasOwnProperty(p)) { StaffImplTest[p] = Person[p]; } }
		StaffImplTest.prototype = Object.create(Person.prototype);
		StaffImplTest.prototype.constructor = StaffImplTest;
		expect(new StaffImplTest().typeName).to.equal('StaffImplTest');
	});

	it('reads the function name from source where Function.name is unavailable', function () {
		var Foo = function Foo(a, b) { return String(a(b)); };
		Object.defineProperty(Foo, 'name', {value: ''});
		expect(tools.className(new Foo(function (x) { return x; }, 1))).to.equal('Foo');
	});
});
