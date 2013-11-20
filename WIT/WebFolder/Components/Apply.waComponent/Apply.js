
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Apply';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	sources.componentRegister_representation.query("speakerReadOnly.ID=:1 and accepted=false", sources.speaker.ID)

	// @region namespaceDeclaration// @startlock
	var buttonClose = {};	// @button
	var buttonApply = {};	// @button
	var buttonDelete = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonClose.click = function buttonClose_click (event)// @startlock
	{// @endlock
		$$('componentRegister').removeComponent()
	};// @lock

	buttonApply.click = function buttonApply_click (event)// @startlock
	{// @endlock
		
		var talentAskingFee;
		//debugger;
		if ($$('componentRegister_textAsking').getValue()=="") {
			$$('componentRegister_errorDiv2').setValue("You must supply a value")
			return;
		}
		else {
			 talentAskingFee=$$('componentRegister_textAsking').getValue()
		}
		sources.componentRegister_speakerReadOnly.all({'onSuccess': function(event) {
		sources.componentRegister_speakerReadOnly.query("ID=:1", sources.speaker.ID, {'onSuccess': function(event)
	    {   //debugger;
	    	addItem(event.dataSource, talentAskingFee)}
	}
		
)}
	})
	
	};// @lock
	
	function addItem(src, taf) {
		//debugger;
		sources.componentRegister_representation.addNewElement()
		sources.componentRegister_representation.agencyReadOnly.set(sources.componentRegister_agencyReadOnly);
		sources.componentRegister_representation.speakerReadOnly.set(src);
		sources.componentRegister_representation.talentAskingFee=taf;
		sources.componentRegister_representation.advertisedFee=sources.componentRegister_talentCategories.advertisedFee;
		sources.componentRegister_representation.suggestedFee=sources.componentRegister_talentCategories.suggestedFee;
		sources.componentRegister_representation.unitMeasure=sources.componentRegister_talentCategories.unitMeasure;	
		sources.componentRegister_representation.category=sources.componentRegister_talentCategories.category;
		sources.componentRegister_representation.applicationDate=new Date();
		sources.componentRegister_representation.save({'onSuccess':function(event) {
		$$('componentRegister_errorDiv2').setValue("You have added an application.")
		},
		'onError':function(error) {
			debugger;
			$$('componentRegister_errorDiv2').setValue("Error");}
	}
		)		
	}


	buttonDelete.click = function buttonDelete_click (event)// @startlock
	{// @endlock
		sources.componentRegister_representation.removeCurrent()
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonClose", "click", buttonClose.click, "WAF");
	WAF.addListener(this.id + "_buttonApply", "click", buttonApply.click, "WAF");
	WAF.addListener(this.id + "_buttonDelete", "click", buttonDelete.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
