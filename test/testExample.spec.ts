/// <reference path="../typings/tsd.d.ts" />

'use strict';

import {Calculator} from '../src/classExample';

import chai = require('chai');
var expect = chai.expect;

var
	log4js = require('log4js'),
	util   = require('util')
	;

var log = log4js.getLogger('textExample');

describe('Calculator', () => {
	var subject : Calculator;

	beforeEach(function () {
		subject = new Calculator();
	});

	describe('#add', () => {
		it('should add two numbers together', () => {
			var result : number = subject.add(2, 3);
			if (result !== 5) {
				throw new Error('Expected 2 + 3 = 5 but was ' + result);
			}
		});
	});
});