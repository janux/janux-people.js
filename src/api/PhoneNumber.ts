import {ContactMethod} from './ContactMethod';

export interface PhoneNumber extends ContactMethod
{
	number: string;
	extension: string;
}