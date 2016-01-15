import {PartyName} from './PartyName';

/**
 * Simple bean to store the name of an Organization
 */
export interface OrganizationName extends PartyName
{
	/** the full legal name of an Organization */
	getLegal(): string;
	setLegal(s: string): void;
}