	
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var buttonUploadResume = {};	// @button
	var buttonAcceptances = {};	// @button
	var buttonApply = {};	// @button
	var buttonRegister = {};	// @button
	var buttonSave = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		if (WAF.directory.logout()){
			sources.speaker.all()
			$$('errorDiv1').setValue("You've signed out")
			$$('containerSpeaker').hide()
			$$('buttonRegister').show();
		}
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
			//debugger;
			sources.speaker.all()
			$$('containerSpeaker').show()
			$$('errorDiv1').setValue('')
			$$('buttonRegister').hide();
	};// @lock

	buttonUploadResume.click = function buttonUploadResume_click (event)// @startlock
	{// @endlock
		waf.sources.speaker.save(
		{'onSuccess':function(event) {
			upLoadResume();
			}})
	};// @lock
	
function upLoadResume() {
		var fileSelector = document.getElementById("fileSelector");
		var uploadForm = new FormData();
		
		if(fileSelector.files.length > 0){
			var nameArr=fileSelector.files[0].name.split(".");
			var fileExt=nameArr[1];
			var fileNamed=waf.directory.currentUser().fullName.replace(' ', '_');
			var finalName = fileNamed + '.' + fileExt;
			uploadForm.append('name', finalName);
			uploadForm.append('id', waf.directory.currentUser().ID);
			uploadForm.append("blob", fileSelector.files[0]);
		}
		else {
			$$('errorDiv1').setValue("You have not chosen a file");
			return;
		}

		
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			//clear file selector
			sources.speaker.collectionRefresh();
			$$('errorDiv1').setValue('You have successfully uploaded your resume')
			fileSelector = $("#fileSelector");
			fileSelector.replaceWith(fileSelector = fileSelector.clone( true ));

		}
		xhr.open("POST", "/uploadFile", true);
		//debugger;
		xhr.send(uploadForm);	
	
}

	buttonAcceptances.click = function buttonAcceptances_click (event)// @startlock
	{// @endlock
		if (sources.speaker.role !==null || sources.speaker.role =='agent') {
			$$('errorDiv1').setValue('An agent cannot get offers');
			return;
		}		
		$('#componentRegister').css({'height':'600px', 'width':'750px', 'left':'15px', 'top':'30px'})
		$$('componentRegister').loadComponent('/Components/TakeOffer.waComponent');
	};// @lock

	buttonApply.click = function buttonApply_click (event)// @startlock
	{// @endlock
		if (sources.speaker.role !==null || sources.speaker.role =='agent') {
			$$('errorDiv1').setValue('An agent cannot get an agent');
			return;
		}
		
		$('#componentRegister').css({'height':'600px', 'width':'750px', 'left':'5px', 'top':'30px'})
		$$('componentRegister').loadComponent('/Components/Apply.waComponent');
	};// @lock

	buttonRegister.click = function buttonRegister_click (event)// @startlock
	{// @endlock
		$('#componentRegister').css({'height':'240px', 'width':'350x', 'left':'50px', 'top':'80px'})
		$$('componentRegister').loadComponent('/Components/NewUser.waComponent');
	};// @lock
	

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		//debugger;
		
		$('#textFirst').css('background', 'rgb(255, 255, 255)');
		$('#textLast').css('background', 'rgb(255, 255, 255)');
		$('#textEmail').css('background', 'rgb(255, 255, 255)');
		$('#comboCategory').css('background', 'rgb(255, 255, 255)');
		$('#textSession').css('background', 'rgb(255, 255, 255)');
		$('#comboApply').css('background', 'rgb(255, 255, 255)');
		//waf.sources.speaker.refresh();
		waf.sources.speaker.save(
		{'onSuccess':function(event) {
			$('#errorDiv1').html("Saved!");

		
			},
		
		'onError':function(error) {

			$('#errorDiv1').html(error['error'][0].message);
			
			switch(error['error'][0].errCode) {
			
			case 1:
			$('#textFirst').css('background', 'wheat');
			break;
			
			case 2:
			$('#textLast').css('background', 'wheat');
			break;
			
			case 3:
			$('#textEmail').css('background', 'wheat');
			break;
			
			case 4:
			$('#comboCategory').css('background', 'wheat');
			break;
			
			case 5:
			$('#textSession').css('background', 'wheat');
			break;

			case 6:
			$('#comboApply').css('background', 'wheat');
			break;			
			}

			}
		}	
		)
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser() === null) {
			$$('containerSpeaker').hide()
		}
		else {
			sources.speaker.all()
			$$('containerSpeaker').show()

			
			
		}
		

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("buttonUploadResume", "click", buttonUploadResume.click, "WAF");
	WAF.addListener("buttonAcceptances", "click", buttonAcceptances.click, "WAF");
	WAF.addListener("buttonApply", "click", buttonApply.click, "WAF");
	WAF.addListener("buttonRegister", "click", buttonRegister.click, "WAF");
	WAF.addListener("buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
var arrControls =['#textFirst', '#textLast', '#textEmail', '#textURL',  '#textSession', '#textSelfDescription']
var arrCombos=['comboCategory', 'comboApply']

