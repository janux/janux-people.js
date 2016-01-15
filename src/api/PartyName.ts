/**
 * Simple bean to store a short and long name for a Person or Organization
 */
export interface PartyName
{
	/** a short name to refer to a Person or Organization */
	getShort(): string;
	setShort(strings): void;

	/** a long (or legal) name to refer to a Person or Organization */
	getLong(): string;
	setLong(strings): void;

	clone(): Object;
}