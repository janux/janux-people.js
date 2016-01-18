import {PartyName} from "../api/PartyName";
/**
 ***************************************************************************************************
 * Represents the name of an Party
 *
 * @author  <a href="mailto:philippe.paravicini@janux.org">Philippe Paravicini</a>
 * @version $Revision: 1.5 $ - $Date: 2006-11-14 01:27:50 $
 ***************************************************************************************************
 */
export class PartyNameImpl implements PartyName
{
	private string shortName;
	private string longName;
	
	public string getShort() {
		return this.shortName;
	}
	
	public void setShort(string s) {
		this.shortName = s;
	}
	
	public string getLong() {
		return this.longName;
	}
	
	public void setLong(string s) {
		this.longName = s;
	}
	
	public string tostring()
	{
		return new TostringBuilder(this)
			.append("short", getShort())
			.append("long",  getLong())
			.tostring();
	}
	
	public Object clone()
	{
		try
		{
			PartyNameImpl result = (PartyNameImpl) super.clone();
	
			return result;
		}
		catch (CloneNotSupportedException e)
		{
			return null;
		}
	}


} // end class PartyNameImpl