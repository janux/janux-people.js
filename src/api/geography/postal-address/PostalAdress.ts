import {BasePostalAddress} from "./BasePostalAddress";

/**
 ***************************************************************************************************
 * Represents a postal address for most western countries.
 * The interface name is kept as "PostalAddress" in order to mantling naming conventions.
 * The any difference with BasePostalAddress are the extra lin1, line2 and line 3 attributes.
 * Supported countries: USA, Canada, Germany, France , UK, Spain. There is a high chance
 * the interface supports countries not listed.
 *
 ***************************************************************************************************
 */
export interface PostalAddress extends BasePostalAddress {
	line1: string;
	line2: string;
	line3: string;
}
