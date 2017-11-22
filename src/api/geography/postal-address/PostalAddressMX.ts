/**
 * Project janux-people.js
 * Created by ernesto on 11/22/17.
 */

import {BasePostalAddress} from "./BasePostalAddress";

/**
 * This is the interface that extends the postal address.
 */
export interface PostalAddressMX extends BasePostalAddress {
	//Street name
	streetName: string;
	//Street number.
	streetNumber: string;
	//Also reference as "colonia" in Mexico.
	locality: string;
	//Also references ad "delegación" o "municipio"
	municipality: string;
}
