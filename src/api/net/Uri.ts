import {ContactMethod} from '../ContactMethod';

/**
 * sub-interface of ContactMethod that generically represents an electronic
 * address or Uniform Resource Identifier; this interface provides a
 * string 'address' that can be used to persist a string representation of the
 * URI, and a getUri method that parses the string and returns a java.net.URI
 * instance
 */
export interface Uri extends ContactMethod
{
	/** the string representation of this Uniform Resource Identifier */
	getAddress(): string;
	setAddress(s: string): void;

	getUri(): string;
}