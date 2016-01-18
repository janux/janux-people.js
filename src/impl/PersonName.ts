import {PersonName} from "../api/PersonName";

/**
 ***************************************************************************************************
 * A simple bean that represents a Person's Name
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.5 $ - $Date: 2006-11-14 01:30:39 $
 ***************************************************************************************************
 */
export class PersonNameImpl extends PartyNameImpl implements PersonName
{
	private String honorificPrefix;
	private String first;
	private String middle;
	private String last;
	private String honorificSuffix;

	public String getHonorificPrefix() {
		return this.honorificPrefix;
	}

	public void setHonorificPrefix(String honorificPrefix) {
		this.honorificPrefix = honorificPrefix;
	}


	public String getFirst() {
		return this.first;
	}

	public void setFirst(String first) {
		this.first = first;
	}


	public String getMiddle() {
		return this.middle;
	}

	public void setMiddle(String middle) {
		this.middle = middle;
	}


	public String getLast() {
		return this.last;
	}

	public void setLast(String last) {
		this.last = last;
	}


	public String getHonorificSuffix() {
		return this.honorificSuffix;
	}

	public void setHonorificSuffix(String honorificSuffix) {
		this.honorificSuffix = honorificSuffix;
	}


	/** contatenates and returns the first and last names */
	public String getShort() {
		return this.first + " " + this.last;
	}

	/** does nothing, here to satisfy the PartyName interface */
	public void setShort(String s) {
		// do nothing
	}


	/** contatenates and returns the honorific Prefix, first, middle and last names, and the honorificSuffix */
	public String getLong() {
		StringBuffer out = new StringBuffer();

		if (getHonorificPrefix() != null && !getHonorificPrefix().equals(""))
			out.append(getHonorificPrefix()).append(" ");

		if (getFirst() != null && !getFirst().equals(""))
			out.append(getFirst()).append(" ");

		if (getMiddle() != null && !getMiddle().equals(""))
			out.append(getMiddle()).append(" ");

		if (getLast() != null && !getLast().equals(""))
			out.append(getLast());

		if (getHonorificSuffix() != null && !getHonorificSuffix().equals(""))
			out.append(", ").append(getHonorificSuffix());

		return out.toString().trim();
	}

	/** does nothing, here to satisfy the PartyName interface */
	public void setLong(String s) {
		// do nothing
	}



	public String toString()
	{
		return new ToStringBuilder(this)
			.append("honorificPrefix", getHonorificPrefix())
			.append("first", getFirst())
			.append("middle", getMiddle())
			.append("last", getLast())
			.append("honorificSuffix", getHonorificSuffix())
			.toString();
	}

	public Object clone()
	{
		PersonNameImpl result = (PersonNameImpl) super.clone();
		return (result);
	}
} // end class PersonNameImpl