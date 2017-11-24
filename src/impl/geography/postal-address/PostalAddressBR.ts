/**
 * Project janux-people.js
 * Created by ernesto on 11/24/17.
 */
import {BasePostalAddressImpl} from "./BasePostalAddress";
import {PostalAddressBR} from "../../../api/geography/postal-address/PostalAddressBR";
import {collections} from "../../../collections";

export class  PostalAddressBRImpl extends  BasePostalAddressImpl implements  PostalAddressBR{

	municipality: string;

	toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
}
