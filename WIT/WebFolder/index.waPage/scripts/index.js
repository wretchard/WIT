
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonApply = {};	// @button
	var buttonHire = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	buttonApply.click = function buttonApply_click (event)// @startlock
	{// @endlock
		$$('componentMain').removeComponent()
		$$('componentMain').loadComponent("/Components/AppWizard.waComponent");
	};// @lock

	buttonHire.click = function buttonHire_click (event)// @startlock
	{// @endlock
		
		$$('componentMain').removeComponent()
		$$('componentMain').loadComponent("/Components/Map.waComponent");

	};// @lock

function distinctValues() {
		sources.where.distinctValues('category',
		{onSuccess: function(event) {
			dv=event.distinctValues;
			for (var i=0; i<dv.length; i++) {
				$$('comboCategory').addOption(dv[i],dv[i])
			}
			}
		}
		)


}

	var destHost=fieldChecker.giveHost();
	

function searchCity(vCity) {
	
	//sources.where.filterQuery
	//debugger;
	sources.where.query("city=:1", vCity, {
			onSuccess:function (event) {
				distinctValues();
				$$('errorDiv1').setValue('')
			}
			}
		
		)
};

var vPlace;

// @region eventManager// @startlock
	WAF.addListener("buttonApply", "click", buttonApply.click, "WAF");
	WAF.addListener("buttonHire", "click", buttonHire.click, "WAF");
// @endregion
};// @endlock
