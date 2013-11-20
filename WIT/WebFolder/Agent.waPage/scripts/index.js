
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonSave = {};	// @button
	var fileUpload2 = {};	// @fileUpload
	var buttonChangePassword = {};	// @button
	var login2 = {};	// @login
	var comboboxPlan = {};	// @combobox
	var buttonApplicants = {};	// @button
	var documentEvent = {};	// @document
	var buttonRegister = {};	// @button
	var buttonCategories = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		var priceID = $$('comboboxPlan').getValue();
		sources.pricing.query("ID=:1", priceID, {onSuccess: function (event)
		{
		sources.agencyPublic.plan.set(event.dataSource);
		sources.agencyPublic.save()
		}
		}
		)

	};// @lock

	fileUpload2.filesUploaded = function fileUpload2_filesUploaded (event)// @startlock
	{// @endlock
		sources.agencyPublic.save();
		sources.agencyPublic.collectionRefresh()
	};// @lock

	buttonChangePassword.click = function buttonChangePassword_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
		$('#componentAgent').css({'height':'600px', 'top':'50px', 'left':'0px','width':'750px'})
		$$('componentAgent').loadComponent('/Components/ChangePassword.waComponent');
	};// @lock

	login2.logout = function login2_logout (event)// @startlock
	{// @endlock
		unDisplayItems()
	};// @lock

	login2.login = function login2_login (event)// @startlock
	{// @endlock

		sources.agencyPublic.all({onSuccess: function(event) {displayItems()}});
	};// @lock

	comboboxPlan.change = function comboboxPlan_change (event)// @startlock
	{// @endlock
		//$$('errorDiv1').setValue('Not yet implemented')
	};// @lock

	buttonApplicants.click = function buttonApplicants_click (event)// @startlock
	{// @endlock

		$$('componentAgent').removeComponent()
		$('#componentAgent').css({'height':'600px', 'top':'50px', 'left':'5px', 'width':'820px'})
		$$('componentAgent').loadComponent('/Components/ResourceApplicants.waComponent');
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

		
		if (WAF.directory.currentUser() === null) {
			$$('containerSetup').hide();
			$$('errorDiv1').setValue('');
			sources.agencyPublic.all();		
		}
		else {
				sources.agencyPublic.all(
				{onSuccess:function event(){
					displayItems()}}
				)
		}

	};// @lock
	
	function showAgent() {
		
		if (sources.agencyPublic.length==0) {
			$$('errorDiv1').setValue("You are not an agent");
			$$('containerSetup').hide();
		}
		else {
			$$('containerSetup').show();
			$$('errorDiv1').setValue('')
		};		
			
				
	};

	buttonRegister.click = function buttonRegister_click (event)// @startlock
	{// @endlock
		$('#componentAgent').css({'height':'540px', 'top':'66px','width':'350x'})
		$$('componentAgent').loadComponent('/Components/NewAgent.waComponent');
	};// @lock

	buttonCategories.click = function buttonCategories_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
		$('#componentAgent').css({'height':'600px', 'top':'50px', 'left':'0px','width':'750px'})
		$$('componentAgent').loadComponent('/Components/Categories.waComponent');
	};// @lock
	
function unDisplayItems() {
		if (WAF.directory.logout()){
			sources.agencyPublic.all()
			$$('containerSetup').hide();
			$$('buttonRegister').show();
			$$('componentAgent').removeComponent();
			$$('errorDiv1').setValue('');

		}	
}
	
	function signIn() {

		if (WAF.directory.loginByPassword(loginObj.loginName, loginObj.password)) {
			sources.agencyPublic.all({onSuccess: function(event) {displayItems()}
			}
			)
			
		}
		else {
			$$('errorDiv1').setValue("Sign in failed");
			$$('richTextFullName').setValue('');
		}
	}
	
	function displayItems() {
		//debugger;
		
		if (sources.agencyPublic.length==0) {
			$$('errorDiv1').setValue("You are not an agent");
			$$('containerSetup').hide();
			if (waf.directory.currentUserBelongsTo("Manager"))
			{$$('errorDiv1').setValue("You are a manager");}
			return;
		}
		
			$$('containerSetup').show();		
			$$('buttonRegister').hide();		
	}

// @region eventManager// @startlock
	WAF.addListener("buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener("fileUpload2", "filesUploaded", fileUpload2.filesUploaded, "WAF");
	WAF.addListener("buttonChangePassword", "click", buttonChangePassword.click, "WAF");
	WAF.addListener("login2", "logout", login2.logout, "WAF");
	WAF.addListener("login2", "login", login2.login, "WAF");
	WAF.addListener("comboboxPlan", "change", comboboxPlan.change, "WAF");
	WAF.addListener("buttonApplicants", "click", buttonApplicants.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("buttonRegister", "click", buttonRegister.click, "WAF");
	WAF.addListener("buttonCategories", "click", buttonCategories.click, "WAF");
// @endregion
};// @endlock
