/// <reference path="../../../collections.ts" />

'use strict';

import {CityImpl} from "../city/City";
import basarat = require('../../../collections');
import collections = basarat.collections;
import {PostalAddress} from '../../../api/geography/postal-address/PostalAdress';
import {City} from "../../../api/geography/city/City";
import {StateProvince} from "../../../api/geography/state/StateProvince";
import {Country} from "../../../api/geography/country/Country";
import {CountryImpl} from "../country/Country";
import {StateProvinceImpl} from "../state/StateProvince";
import {BasePostalAddressImpl} from "./BasePostalAddress";

/**
 ***************************************************************************************************
 * Simple bean representing a physical address for western countries.
 * Tha name "PostalAddressImpl" is kept in oder to keep naming conventions.
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @author  <a href="mailto:david.fairchild@janux.org">David Fairchild</a>
 * @since $Revision: 1.23 $ - $Date: 2008-03-27 00:51:37 $
 ***************************************************************************************************
 */
export class PostalAddressImpl extends BasePostalAddressImpl implements PostalAddress{

	public line1: string;
	public line2: string;
	public line3: string;

	toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class PostalAddressImpl
