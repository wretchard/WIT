
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Calendar';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	sources.componentCalendar_where.query("speaker.ID =:1", sources.speaker.ID)

	// @region namespaceDeclaration// @startlock
	var containerWhereForm = {};	// @container
	var buttonSave = {};	// @button
	var textCountry = {};	// @textField
	var textCity = {};	// @textField
	var textStreet = {};	// @textField
	var buttonAdd = {};	// @button
	var buttonRemove = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	containerWhereForm.mouseover = function containerWhereForm_mouseover (event)// @startlock
	{// @endlock
		checkRecord()
	};// @lock
	
	function checkRecord() {
		if(sources.componentCalendar_where.getCurrentElement()== null) {
			$$('componentCalendar_errDiv').setValue('create a record first')
		}
		else {
			$$('componentCalendar_errDiv').setValue('')}	
	}

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		calcVarAddress()
		sources.componentCalendar_where.save()
	};// @lock

	textCountry.blur = function textCountry_blur (event)// @startlock
	{// @endlock
		calcVarAddress()
	};// @lock

	textCity.blur = function textCity_blur (event)// @startlock
	{// @endlock
		calcVarAddress()
	};// @lock

	textStreet.blur = function textStreet_blur (event)// @startlock
	{// @endlock
		calcVarAddress()
		
	};// @lock
	
	function calcVarAddress() {
		sources.componentCalendar_varAddress=$$('componentCalendar_textStreet').getValue() + " " + $$('componentCalendar_textCity').getValue()  
		+ " " + $$('componentCalendar_textCountry').getValue() 

		sources.componentCalendar_where.address=sources.componentCalendar_varAddress;

	}

	buttonAdd.click = function buttonAdd_click (event)// @startlock
	{// @endlock
		addBoilerplate(saveThis)
	}
	
	function saveThis() {
		sources.componentCalendar_where.save()
	};// @lock
	
	function addBoilerplate(callback) {
		sources.componentCalendar_where.addNewElement()
		sources.componentCalendar_where.save()
		//add the boilerplate stuff
		sources.componentCalendar_where.street=$$('componentCalendar_textStreet').getValue();
		sources.componentCalendar_where.city=$$('componentCalendar_textCity').getValue();
		sources.componentCalendar_where.country=$$('componentCalendar_textCountry').getValue();
		sources.componentCalendar_where.agentName=sources.objWhere.agentName;
		sources.componentCalendar_where.agentEmail=sources.objWhere.agentEmail;
		sources.componentCalendar_where.category=sources.objWhere.category;
		sources.componentCalendar_where.fee_per_unit=sources.objWhere.fee_per_unit;
		sources.componentCalendar_where.descripton=sources.objWhere.description;
		sources.componentCalendar_where.speakerURL=sources.objWhere.speakerURL;
		sources.componentCalendar_where.agencyURL=sources.objWhere.agencyURl;
		sources.componentCalendar_where.speakerName=sources.objWhere.speakerName;
		sources.componentCalendar_where.speaker.set(sources.speaker);
		sources.componentCalendar_where.speakerDescription=sources.objWhere.speakerDescription
		callback()
		//sources.componentCalendar_where.autodispatch();
		//sources.componentCalendar_where.save();				
	}

	buttonRemove.click = function buttonRemove_click (event)// @startlock
	{// @endlock
		//calcVarAddress()
		sources.componentCalendar_where.removeCurrent()
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_containerWhereForm", "mouseover", containerWhereForm.mouseover, "WAF");
	WAF.addListener(this.id + "_buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener(this.id + "_textCountry", "blur", textCountry.blur, "WAF");
	WAF.addListener(this.id + "_textCity", "blur", textCity.blur, "WAF");
	WAF.addListener(this.id + "_textStreet", "blur", textStreet.blur, "WAF");
	WAF.addListener(this.id + "_buttonAdd", "click", buttonAdd.click, "WAF");
	WAF.addListener(this.id + "_buttonRemove", "click", buttonRemove.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
