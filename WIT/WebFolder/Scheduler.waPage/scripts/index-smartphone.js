﻿
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonClose = {};	// @button
	var buttonSave = {};	// @button
	var buttonDelete = {};	// @button
	var textCountry = {};	// @textField
	var textCity = {};	// @textField
	var textStreet = {};	// @textField
	var buttonAdd = {};	// @button
	var login1 = {};	// @login
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	buttonClose.click = function buttonClose_click (event)// @startlock
	{// @endlock
			waf.directory.logout()
			location.reload();
	};// @lock

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		calcVarAddress()
		sources.where.save()
	};// @lock

	buttonDelete.click = function buttonDelete_click (event)// @startlock
	{// @endlock
		sources.where.removeCurrent()
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
		sources.varAddress=$$('textStreet').getValue() + " " + $$('textCity').getValue()  
		+ " " + $$('textCountry').getValue() 

		sources.where.address=sources.varAddress;

	}

	buttonAdd.click = function buttonAdd_click (event)// @startlock
	{// @endlock
		addBoilerplate({onSuccess: function(event) {
		sources.where.save()}
		})
		
	};// @lock
	
	function addBoilerplate() {
		sources.where.addNewElement()
		sources.where.save()
		//add the boilerplate stuff
		sources.where.street=$$('textStreet').getValue();
		sources.where.city=$$('textCity').getValue();
		sources.where.country=$$('textCountry').getValue();
		sources.where.agentName=sources.objWhere.agentName;
		sources.where.agentEmail=sources.objWhere.agentEmail;
		sources.where.category=sources.objWhere.category;
		sources.where.fee_per_unit=sources.objWhere.fee_per_unit;
		sources.where.descripton=sources.objWhere.description;
		sources.where.speakerURL=sources.objWhere.speakerURL;
		sources.where.agencyURL=sources.objWhere.agencyURl;
		sources.where.speakerName=sources.objWhere.speakerName;
		sources.where.speaker.set(sources.speaker);
		sources.where.speakerDescription=sources.objWhere.speakerDescription
			
	}

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		sources.where.query("ID=:1", 0)
		location.reload();	
		
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		sources.where.query("speaker.ID= :1", waf.directory.currentUser().ID);
		restoreState();
		
	};// @lock
	
function restoreState() {
		if (WAF.directory.currentUser() == null) {return};
		sources.speaker.getWhereObj(WAF.directory.currentUser().ID,
		{onSuccess:function(event) {
			if (event.result == null) {
				$$('containerWarning').show();
			}
			else {
				sources.objWhere=event.result;
				$$('dataGridMobile').show()
				$$('containerForm').show()				
			}
		}}
		)	
}


	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		sources.where.query("speaker.ID =:1", sources.speaker.ID);
		restoreState();

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonClose", "click", buttonClose.click, "WAF");
	WAF.addListener("buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener("buttonDelete", "click", buttonDelete.click, "WAF");
	WAF.addListener("textCountry", "blur", textCountry.blur, "WAF");
	WAF.addListener("textCity", "blur", textCity.blur, "WAF");
	WAF.addListener("textStreet", "blur", textStreet.blur, "WAF");
	WAF.addListener("buttonAdd", "click", buttonAdd.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock