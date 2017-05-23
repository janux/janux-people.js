import {Party} from './Party';
import {PersonName} from "./PersonName";

/** represents a physical Person in a variety of contexts */
export interface Person extends Party {
	name:PersonName;
}