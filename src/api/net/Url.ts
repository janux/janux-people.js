import {Uri} from './Uri';

/**
 * sub-interface of ContactMethod and Uri that generically represents an electronic
 * address or Uniform Resource Locator; this interface provides a string
 * 'address' that can be used to persist a string representation of the URL, and
 * a getUrl method that parses the string and returns a java.net.URL instance
 */
export interface Url extends Uri
{
	getUrl(): string;
}