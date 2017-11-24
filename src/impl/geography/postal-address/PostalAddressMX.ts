/**
 * Project janux-people.js
 * Created by ernesto on 11/24/17.
 */
import {BasePostalAddressImpl} from "./BasePostalAddress";
import {PostalAddressMX} from "../../../api/geography/postal-address/PostalAddressMX";
import {collections} from "../../../collections";

/**
 * This class represents a
 */
export class PostalAddressMXImpl extends BasePostalAddressImpl implements PostalAddressMX {

	streetName: string;
	streetNumber: string;
	locality: string;
	municipality: string;

	toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
}
