'use strict';
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as tools from '../tools';
import {Person} from '../api/Person';
import {PersonName} from "../api/PersonName";
import {PartyAbstract} from "./PartyAbstract";
import {PersonNameImpl} from "./PersonName";

/**
 ***************************************************************************************************
 * Represents a Person in a variety of contexts
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 ***************************************************************************************************
 */
export class PersonImpl extends PartyAbstract implements Person {
    public name: PersonName;

    constructor(honorificPrefix?: string, first?: string, middle?: string, last?: string, honorificSuffix?: string, maternal?: string) {
        super();
        this.name = new PersonNameImpl(honorificPrefix, first, middle, last, honorificSuffix, maternal);
    }

    get typeName(): string {
        return tools.className(this);
    }

    public toJSON(): any {
        const out: any = this.contactMethods;
        out.displayName = this.name.shortName;
        out.name = this.name.toJSON();
        out.typeName = this.typeName;
        out.code = this.code;
        return out;
    }

    /** deserializes a Person from its canonical toJSON representation */
    static fromJSON(obj: any): Person {
        let aPerson = new PersonImpl(
            obj.name.honorificPrefix,
            obj.name.first,
            obj.name.middle,
            obj.name.last,
            obj.name.honorificSuffix,
            obj.name.maternal);

        aPerson = PartyAbstract.fromJSON(obj, aPerson);

        return aPerson;
    }
} // end class PersonImpl
