import {ContactMethod} from './ContactMethod';

export interface PhoneNumber extends ContactMethod
{
	number: string;
	extension: string;

	getCountryCode(): string;
	setCountryCode(i: string): void;

	getAreaCode(): string;
	setAreaCode(i: string): void;
}