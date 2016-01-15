import {Party} from '../Party';
/**
 * This interface is used as a marker to identify a form of payment
 *
 */
export interface FormOfPayment // extends Serializable, Persistent, Cloneable
{
	/**
	 * @return Returns the position.
	 */
	getPosition(): number;

	/**
	 * @param position The position to set.
	 */
	setPosition(position: number): void;

	/**
	 * @return Returns the party.
	 */
	getParty(): Party;
	/**
	 * @param party The party to set.
	 */
	setParty(party: Party): void;

	clone(): Object;
}