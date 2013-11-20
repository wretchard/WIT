
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'TakeOffer';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		sources.componentRegister_representation.query("speakerID=:1 and accepted=true", sources.speaker.ID,
		{onSuccess: function(event) {}
		}
		)

	// @region namespaceDeclaration// @startlock
	var representationEvent = {};	// @dataSource
	var buttonReject = {};	// @button
	var buttonAccept = {};	// @button
	var buttonCancel = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	representationEvent.onCurrentElementChange = function representationEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		sources.componentRegister_agencyReadOnly.query("ID=:1", this.agencyID)
	};// @lock

	buttonReject.click = function buttonReject_click (event)// @startlock
	{// @endlock
		
		sources.componentRegister_speaker.addAgency(sources.componentRegister_representation.ID, false,
		{onSuccess:function(event) {
			sources.componentRegister_representation.query("speakerID=:1 and accepted=true", sources.speaker.ID)
			},
			onError: function(event){
				debugger;
			}
			}
		
		)
		

	};// @lock

	buttonAccept.click = function buttonAccept_click (event)// @startlock
	{// @endlock
		
		sources.componentRegister_speaker.addAgency(sources.componentRegister_representation.ID, true,
		{onSuccess:function(event) {		
			//sources.componentRegister_speaker.all()
			//debugger;
			if(event.result.errorMessage == "Terminate an agent before getting a new one")
			{
				$$('componentRegister_errBox').setValue("Terminate an agent before getting a new one")
				return;
			}
			sources.componentRegister_representation.query("speakerID=:1 and accepted=true", sources.speaker.ID)
			$$('componentRegister_errBox').setValue(event.result.errorMessage)
			},
			onError:function(event) {
				debugger;
			}
			}
		
		)
	};// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		$$('componentRegister').removeComponent()
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_representation", "onCurrentElementChange", representationEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_buttonReject", "click", buttonReject.click, "WAF");
	WAF.addListener(this.id + "_buttonAccept", "click", buttonAccept.click, "WAF");
	WAF.addListener(this.id + "_buttonCancel", "click", buttonCancel.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
