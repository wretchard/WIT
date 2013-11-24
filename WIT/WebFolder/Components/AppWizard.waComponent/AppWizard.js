
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'AppWizard';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonCancel = {};	// @button
	var buttonOK = {};	// @button
	var button2 = {};	// @button
	var button1 = {};	// @button
	var buttonUploadResume = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		clearStuff()
		$$('componentRegister').removeComponent()
	};// @lock

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

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		sources.componentRegister_representation.removeCurrent()
	};// @lock

	button1.click = function button1_click (event)// @startlock
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

	buttonUploadResume.click = function buttonUploadResume_click (event)// @startlock
	{// @endlock
		waf.sources.speaker.save(
		{'onSuccess':function(event) {
			upLoadResume();
			}})
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonCancel", "click", buttonCancel.click, "WAF");
	WAF.addListener(this.id + "_buttonOK", "click", buttonOK.click, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_buttonUploadResume", "click", buttonUploadResume.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
