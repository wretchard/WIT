
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Categories';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonSave = {};	// @button
	var textFieldCategory = {};	// @textField
	var buttonClose = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		if(checkRates()){
		sources.componentAgent_talentCategories1.save()
	}
	};// @lock

	textFieldCategory.focus = function textFieldCategory_focus (event)// @startlock
	{// @endlock
		if(sources.componentAgent_talentCategories1.getCurrentElement()== null) {
			this.setValue('create a record first')
		}
	};// @lock
	
	function checkRates() {
		var talent = Number($$('componentAgent_textFieldResource').getValue());
		var advert = Number($$('componentAgent_textFieldAdvertised').getValue());
		if (talent > advert)
		{$$('componentAgent_error2').setValue('Resource must be less than advertised')
		return false;
		}
		else {
		$$('componentAgent_error2').setValue('')
		return true;
		
		}
	}

	buttonClose.click = function buttonClose_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener(this.id + "_textFieldCategory", "focus", textFieldCategory.focus, "WAF");
	WAF.addListener(this.id + "_buttonClose", "click", buttonClose.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
