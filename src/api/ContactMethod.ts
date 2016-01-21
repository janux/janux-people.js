export interface ContactMethod // extends Persistent, Serializable, Cloneable
{
	typeName: string;
	toString(): string;
}