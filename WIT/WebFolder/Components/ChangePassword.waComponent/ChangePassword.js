
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ChangePassword';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	
	// @region namespaceDeclaration// @startlock
	var buttonClose = {};	// @button
	var buttonChange = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonClose.click = function buttonClose_click (event)// @startlock
	{// @endlock
		closeSubform()
	};// @lock
	
	function closeSubform() {
		var str=getHtmlId()
		str=str.slice(0, str.indexOf("_"))
		$$(str).removeComponent()		
	}

	buttonChange.click = function buttonChange_click (event)// @startlock
	{// @endlock
		
		var str=getHtmlId()
		str=str.slice(0, str.indexOf("_"))		;
		objPasswordData={};
		objPasswordData.oldPassword=$$(str + "_textFieldOld").getValue()
		objPasswordData.newPasswordAgain=$$(str + "_textFieldNew").getValue()

		if (sources.agencyPublic !== undefined) {
		if (sources.agencyPublic.ID==null) {
			alert("you are not an agent")
			return
			}
		objPasswordData.agencyID=sources.agencyPublic.ID;			
		var msg=ds.AgencyPublic.changePassword(objPasswordData);
		}	
		if (msg=='You have successfully changed your password') {
			closeSubform()
		}
		$$('errorDiv1').setValue(msg);
		
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonClose", "click", buttonClose.click, "WAF");
	WAF.addListener(this.id + "_buttonChange", "click", buttonChange.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
