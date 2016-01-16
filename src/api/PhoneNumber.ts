import {ContactMethod} from './ContactMethod';

export interface PhoneNumber extends ContactMethod
{
	getCountryCode(): string;
	setCountryCode(i: string): void;

	getAreaCode(): string;
	setAreaCode(i: string): void;

	getNumber(): string;
	setNumber(s: string): void;

	getExtension(): string;
	setExtension(s: string): void;
}