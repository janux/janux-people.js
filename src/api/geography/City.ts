import {Country} from './Country';
import {StateProvince} from './StateProvince';

export interface City // extends Serializable, Persistent
{
	getCode(): string;
	setCode(code: string): void;

	getName(): string;
	setName(name: string): void;

	getState(): StateProvince;
	setState(o: StateProvince): void;

	/** alias for getState **/
	getProvince(): StateProvince;
	setProvince(o: StateProvince): void;

	/** shortcut for getState().getCountry() */
	getCountry(): Country;
	setCountry(o: Country): void;
}