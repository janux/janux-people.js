/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../collections.ts" />

import {CityImpl} from "./City";
'use strict';

var tools = require('../tools');

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
export class PostalAddressImpl implements PostalAddress
{
	get field(): string {
		return  'addresses'; // tools.className(this);
	}

	public line1: string;
	public line2: string;
	public line3: string;
	public postalCode: string;
	public cityText: string;
	public stateText: string;
	public countryText: string;
	public city: City;
	public stateProvince: StateProvince;
	public country: Country;
	public type: string;
	public primary: boolean;

	getCity(): City {
		return this.city;
	}
	
	/**
	* Assigning a City to this PostalAdress causes the cityAsstring to be
	* nulled, and the StateProvince and Country fields of this Address to be set
	* to, respectively, city.getState() and city.getCountry()
	*/
	setCity(city: City): void {
		this.city = city;
		if (city instanceof CityImpl)
		{
			this.cityText    = null;
			this.setStateProvince(city.state);
			this.setCountry(city.getCountry());
		}
	}

	/**
	* returns getCity().getState() if a City is assigned to this
	* PostalAddress, or else the StateProvince field
	*/
	getStateProvince(): StateProvince
	{
		if (this.getCity() instanceof CityImpl) {
			return this.city.state;
		}
		else {
			return this.stateProvince;
		}
	}

	/**
	* Assigning a StateProvince to this PostalAdress causes the
	* stateProvinceAsstring field to be nulled, and the Country fields of this
	* Address to be set to stateProvince.getCountry()
	*/
	setStateProvince(aStateProvince: StateProvince): void {
		this.stateProvince = aStateProvince;
		if (aStateProvince instanceof StateProvinceImpl)
		{
			this.stateText = null;
			this.setCountry(aStateProvince.getCountry());
		}
	}
	
	/**
	* returns getCity().getCountry() if a City is assigned to this
	* PostalAddress, or else the Country field
	*/
	getCountry()
	{
		if (this.city instanceof CityImpl) {
			return this.city.getCountry();
		}
		else {
			return this.country;
		}
	}
	
	/**
	* Assigning a Country to this address will null the countryAsstring field;
	* also, if a City is associated to this PostalAddress, and the Country
	* assigned herewith is different from City.getCountry(), we understand that
	* to mean that the existing City will be changed, and thus the City filed is
	* nulled
	*/
	setCountry(aCountry: Country): void {
		this.country = aCountry;

		if (aCountry instanceof CountryImpl)
		{
			this.countryText = null;
		}

		if (this.city instanceof CityImpl && this.city.getCountry().toString() != aCountry.toString())
		{
			this.city = null;
			this.stateProvince = null;
		}
	}

	getCityAsstring(): string {
		return this.cityText;
	}
	
	getCountryAsstring(): string {
		return this.countryText;
	}
	
	getStateProvinceAsstring(): string {
		return this.stateText;
	}
	
	setCityAsstring(cityText: string): void {
		this.cityText = cityText;
	}
	
	setCountryAsstring(countryText: string): void {
		this.countryText = countryText;
	}
	
	setStateProvinceAsstring(stateName: string): void {
		this.stateText = stateName;
	}
	
	getCityName(): string {
		if (this.getCity() != null){
			return this.getCity().name;
		}
		else {
			return this.cityText;
		}
	}
	
	getCountryName(): string {
		if (this.getCountry() != null) {
			return this.getCountry().getName();
		}
		else {
			return this.countryText;
		}
	}

	getCountryCode(): string {
		if (this.getCountry() != null) {
			return this.getCountry().getCode();
		}
		else {
			return this.countryText;
		}
	}

	getStateProvinceName(): string {
		if (this.getStateProvince() != null) {
			return this.getStateProvince().getName();
		}
		else {
			return this.stateText;
		}
	}

	 getStateProvinceCode(): string {
		if (this.getStateProvince() != null) {
			return this.getStateProvince().getCode();
		}
		else {
			return this.stateText;
		}
	}

	setCityName(cityText: string): void {
		this.cityText = cityText;
	}
	
	setCountryName(countryText: string): void {
		this.countryText = countryText;
	}

	setStateName(stateText: string): void {
		this.stateText = stateText;
	}
	
	toString(): string {
		// Short hand. Adds each own property
		return collections.makeString(this);
	}

	//@SuppressWarnings("unchecked")
	//Object clone()
	//{
	//	try
	//	{
	//		PostalAddressImpl result = (PostalAddressImpl) super.clone();
	//	
	//		result.setId(-1);
	//	
	//		result.line1         = this.line1;
	//		result.line2         = this.line2;
	//		result.line3         = this.line3;
	//		result.postalCode    = this.postalCode;
	//	
	//		result.country       = this.country;
	//		result.stateProvince = this.stateProvince;
	//		result.city          = this.city;
	//	
	//		result.countryText   = this.countryText;
	//		result.stateText     = this.stateText;
	//		result.cityText      = this.cityText;
	//	
	//		return result;
	//	}
	//	catch (CloneNotSupportedException e)
	//	{
	//		return null;
	//	}
	//}
	
} // end class PostalAddressImpl