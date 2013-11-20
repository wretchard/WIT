
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'NewAgent';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		if(!waf.directory.currentUserBelongsTo("Manager"))
		{
		$$('componentAgent').removeComponent();
		$$('errorDiv1').setValue("You are not authorized to use this feature")
		}

	// @region namespaceDeclaration// @startlock
	var buttonCancel = {};	// @button
	var buttonOK = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
	};// @lock

	buttonOK.click = function buttonOK_click (event)// @startlock
	{// @endlock
		//debugger;
		try {
			fieldChecker.checkFields(componentAgent_registerObject);
			$$('componentAgent_errorDiv2').setValue("good data")
		} catch (e) {
			$$('componentAgent_errorDiv2').setValue(e.data.message)
			return;
			}
		// register
		ds.Speaker.newUser(componentAgent_registerObject, {onSuccess: function(event) {
			componentAgent_registerObject.userID=event.result;
			registerAgent(componentAgent_registerObject)
			},
				
			onError: function(error) {
				$$('componentAgent_errorDiv2').setValue(error['error'][0].message)
			}
	}
		)
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonCancel", "click", buttonCancel.click, "WAF");
	WAF.addListener(this.id + "_buttonOK", "click", buttonOK.click, "WAF");
	// @endregion// @endlock

	};// @lock
	
	function registerAgent(componentAgent_registerObject) {
		ds.AgencyPublic.newAgent(componentAgent_registerObject, {onSuccess: function(event) {
			$$('errorDiv1').setValue('You have successfully registered. Now you may sign in.');
			$$('componentAgent').removeComponent()
			},
				
			onError: function(error) {
				$$('componentAgent_errorDiv2').setValue(error['error'][0].message)
			}
	}
		)		
	}


}// @startlock
return constructor;
})();// @endlock
