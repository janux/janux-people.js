/**
 * Project janux-people.js
 * Created by ernesto on 11/22/17.
 */

import {BasePostalAddress} from "./BasePostalAddress";

/**
 * Interface for a postal address in brazil.
 */
export interface PostalAddressBR extends BasePostalAddress {
	municipality: string;
}
