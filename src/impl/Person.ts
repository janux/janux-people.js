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

    public toJSON(): Record<string, unknown> {
        const out: Record<string, unknown> = { ...this.contactMethods };
        out.displayName = this.name.shortName;
        out.name = this.name.toJSON();
        out.typeName = this.typeName;
        out.code = this.code;
        return out;
    }

    /** deserializes a Person from its canonical toJSON representation */
    static fromJSON(obj: Record<string, unknown>): Person {
        const nameObj = obj.name as Record<string, string>;
        let aPerson = new PersonImpl(
            nameObj.honorificPrefix,
            nameObj.first,
            nameObj.middle,
            nameObj.last,
            nameObj.honorificSuffix,
            nameObj.maternal);

        aPerson = PartyAbstract.hydrateFromJSON(obj, aPerson);

        return aPerson;
    }
} // end class PersonImpl
