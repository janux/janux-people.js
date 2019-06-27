/// <reference path="../collections.ts" />

'use strict';

import {CityImpl} from "./City";
import basarat = require('../collections');
import collections = basarat.collections;
import {PostalAddress} from '../api/geography/PostalAdress';
import {City} from "../api/geography/City";
import {StateProvince} from "../api/geography/StateProvince";
import {Country} from "../api/geography/Country";
import {CountryImpl} from "./Country";
import {StateProvinceImpl} from "./StateProvince";

/**
 ***************************************************************************************************
 * Simple bean representing a physical address
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @author  <a href="mailto:david.fairchild@janux.org">David Fairchild</a>
 * @since $Revision: 1.23 $ - $Date: 2008-03-27 00:51:37 $
 ***************************************************************************************************
 */
export class PostalAddressImpl implements PostalAddress {
	get field():string {
		return 'addresses';
	}

	public line1:string;
	public line2:string;
	public line3:string;
	public postalCode:string;
	public cityText:string;
	public stateText:string;
	public countryText:string;
	public _city:City;
	public _stateProvince:StateProvince;
	public _country:Country;
	public type:string;
	public primary:boolean;

	get city():City {
		return this._city;
	}

	/**
	 * Assigning a City to this PostalAdress causes the cityAsstring to be
	 * nulled, and the StateProvince and Country fields of this Address to be set
	 * to, respectively, city.getState() and city.getCountry()
	 */
	set city(city:City) {
		this._city = city;
		if (city instanceof CityImpl) {
			this.cityText = null;
			this.stateProvince = city.state;
			this.country = city.country;
		}
	}

	/**
	 * returns getCity().getState() if a City is assigned to this
	 * PostalAddress, or else the StateProvince field
	 */
	get stateProvince():StateProvince {
		if (this.city instanceof CityImpl) {
			return this.city.state;
		}
		else {
			return this._stateProvince;
		}
	}

	/**
	 * Assigning a StateProvince to this PostalAdress causes the
	 * stateProvinceAsstring field to be nulled, and the Country fields of this
	 * Address to be set to stateProvince.getCountry()
	 */
	set stateProvince(aStateProvince:StateProvince) {
		this._stateProvince = aStateProvince;
		if (aStateProvince instanceof StateProvinceImpl) {
			this.stateText = null;
			this.country = aStateProvince.country;
		}
	}

	/**
	 * returns getCity().getCountry() if a City is assigned to this
	 * PostalAddress, or else the Country field
	 */
	get country() {
		if (this.city instanceof CityImpl) {
			return this.city.country;
		}
		else {
			return this._country;
		}
	}

	/**
	 * Assigning a Country to this address will null the countryAsstring field;
	 * also, if a City is associated to this PostalAddress, and the Country
	 * assigned herewith is different from City.getCountry(), we understand that
	 * to mean that the existing City will be changed, and thus the City filed is
	 * nulled
	 */
	set country(aCountry:Country) {
		this._country = aCountry;

		if (aCountry instanceof CountryImpl) {
			this.countryText = null;
		}

		if (this.city instanceof CityImpl && this.city.country.toString() != aCountry.toString()) {
			this.city = null;
			this.stateProvince = null;
		}
	}

	get cityName():string {
		if (this.city != null) {
			return this.city.name;
		}
		else {
			return this.cityText;
		}
	}

	set cityName(cityText:string) {
		this.cityText = cityText;
	}

	get countryName():string {
		if (this.country != null) {
			return this.country.name;
		}
		else {
			return this.countryText;
		}
	}

	set countryName(countryText:string) {
		this.countryText = countryText;
	}

	get countryCode():string {
		if (this.country != null) {
			return this.country.code;
		}
		else {
			return this.countryText;
		}
	}

	get stateProvinceName():string {
		if (this.stateProvince != null) {
			return this.stateProvince.name;
		}
		else {
			return this.stateText;
		}
	}

	get stateProvinceCode():string {
		if (this.stateProvince != null) {
			return this.stateProvince.code;
		}
		else {
			return this.stateText;
		}
	}

	set stateName(stateText:string) {
		this.stateText = stateText;
	}

	toString():string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}
} // end class PostalAddressImpl
