
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		sources.speaker.all({onSuccess:function(event) {unSignedState()}});	
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
			sources.speaker.all({onSuccess: function (event) {
				if (sources.speaker.role=='agent') {
					$$('errorDiv1').setValue("You are an agent");				
					return;
				}
			
			fixUI();
			}
			})
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//debugger;
		if (WAF.directory.currentUser() === null) {
			$$('componentCalendar').removeComponent();
		}
		else {
			fixUI()
		}		
		
	};// @lock

function unSignedState() {
			$$('errorDiv1').setValue("You've signed out")
			$$('componentCalendar').removeComponent()	
};

function signIn() {
			if (WAF.directory.loginByPassword(loginObj2.loginName, loginObj2.password)) {			
			sources.speaker.all({onSuccess: function (event) {
				if (sources.speaker.role=='agent') {
					$$('errorDiv1').setValue("You are an agent");				
					return;
				}

			fixUI();
			}
			})
			
			}
			else {
			$$('errorDiv1').setValue("Sign in failed")
			}
}

function fixUI() {
		$$('errorDiv1').setValue("You've signed in")
		sources.speaker.getWhereObj(WAF.directory.currentUser().ID,
		{onSuccess:function(event) {

			if (event.result == null) {
				$$('componentCalendar').removeComponent();
				$$('errorDiv1').setValue("You need an agent first.");
			}
			else {
				sources.objWhere=event.result;
				$('#componentCalendar').css({'height':'600px', 'width':'750x'})
				$$('componentCalendar').loadComponent('/Components/Calendar.waComponent');	
				//$$('componentCalendar').loadComponent({path:'/Components/Calendar.waComponent'}, 
				//	userData:);	
				sources.speaker.all()			
			}
		}}
		)
		//debugger;
		//var lName=WAF.directory.currentUser().userName
		/*sources.speaker.agency.load({onSuccess: function (event) {
			debugger;
			a=event.entity
			}
		}
		)*/
		
}
// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
