
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'NewUser';
	// @endregion// @endlock

	this.load = function (data) {// @lock


	// @region namespaceDeclaration// @startlock
	var buttonCancel = {};	// @button
	var buttonOK = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		clearStuff()
		$$('componentRegister').removeComponent()
	};// @lock
	
function clearStuff() {
		$$('componentRegister_textUser').setValue('')
		$$('componentRegister_textPassword').setValue('')
		$$('componentRegister_textFirst').setValue('')
		$$('componentRegister_textLast').setValue('')
		$$('componentRegister_textEmail').setValue('')		
}

	buttonOK.click = function buttonOK_click (event)// @startlock
	{// @endlock
		try {
			fieldChecker.checkFields(componentRegister_registerObject);
		} catch (e) {
			$$('componentRegister_errorDiv2').setValue(e.data.message)
			return;
		}
		
		// register
		ds.Speaker.newUser(componentRegister_registerObject, {onSuccess: function(event) {
			$$('errorDiv1').setValue('You have successfully registered and may sign in');
			clearStuff()
			$$('componentRegister').removeComponent();
			},
				
			onError: function(error) {
				//$$('componentRegister_errorDiv2').setValue(error['error'][0].message)
				$$('errorDiv1').setValue(error['error'][0].message)
			}
	}
		)
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonCancel", "click", buttonCancel.click, "WAF");
	WAF.addListener(this.id + "_buttonOK", "click", buttonOK.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
