/// <reference path="../collections.ts" />

'use strict';
import basarat = require('../collections');
import collections = basarat.collections;

import {PersonName} from "../api/PersonName";

import {PartyNameImpl} from "./PartyName";

/**
 ***************************************************************************************************
 * A simple bean that represents a Person's Name
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.5 $ - $Date: 2006-11-14 01:30:39 $
 ***************************************************************************************************
 */
export class PersonNameImpl extends PartyNameImpl implements PersonName {
    public honorificPrefix: string;
    public first: string;
    public middle: string;
    public last: string;
    public maternal: string;

    public honorificSuffix: string;

    constructor(hP?: string, first?: string, middle?: string, last?: string, hS?: string, maternal?: string) {
        super();

        this.honorificPrefix = hP;
        this.first = first;
        this.middle = middle;
        this.last = last;
        this.honorificSuffix = hS;
        this.maternal = maternal;
    }

    /** contatenates and returns the first and last names */
    get shortName(): string {
        return this.first + " " + this.last;
    }

    /** contatenates and returns the honorific Prefix, first, middle and last names, and the honorificSuffix */
    get longName(): string {
        var out: string = "";

        if (this.honorificPrefix != null && this.honorificPrefix != '') {
            out += this.honorificPrefix + ' ';
        }
        if (this.first != null && this.first != '') {
            out += this.first + ' ';
        }
        if (this.middle != null && this.middle != '') {
            out += this.middle + ' ';
        }
        if (this.maternal != null && this.maternal != '') {
            out += this.maternal + ' ';
        }
        if (this.last != null && this.last != '') {
            out += this.last + ' ';
        }
        if (this.honorificSuffix != null && this.honorificSuffix != '') {
            out += ', ' + this.honorificSuffix;
        }
        return out.trim();
    }

    public toString(): string {
        // Short hand. Adds each own property
        return collections.makeString(this);
    }

    public toJSON(): any {
        var out: any = {};
        var _hasOwnProperty = Object.prototype.hasOwnProperty;

        for (var prop in this) {
            if (_hasOwnProperty.call(this, prop)) {
                out[prop] = (<any>this)[prop];
            }
        }
        return out;
    }
} // end class PersonNameImpl
