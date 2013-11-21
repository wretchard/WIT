
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Splash';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonStart = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		$$('componentMain').removeComponent()
		$$('componentMain').loadComponent("/Components/Map.waComponent");
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonStart", "click", buttonStart.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
