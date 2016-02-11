import {ContactMethod} from '../ContactMethod';

/**
 ***************************************************************************************************
 * bean that represents an Email Address Uniform Resource Identifier
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.9 $ - $Date: 2007-12-06 01:20:41 $
 ***************************************************************************************************
 */

export interface EmailAddress extends ContactMethod
{
	/** the string representation of this Email Address */
	address: string;
}