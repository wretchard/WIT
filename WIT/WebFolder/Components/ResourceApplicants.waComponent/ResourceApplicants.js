
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ResourceApplicants';
	// @endregion// @endlock

	this.load = function (data) {// @lock

		sources.componentAgent_representation.query("agencyID=:1", sources.agencyPublic.ID)

	// @region namespaceDeclaration// @startlock
	var buttonDownLoadResume = {};	// @button
	var buttonAll = {};	// @button
	var buttonShowNot = {};	// @button
	var buttonShow = {};	// @button
	var buttonReject = {};	// @button
	var buttonAccept = {};	// @button
	var buttonClose = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonDownLoadResume.click = function buttonDownLoadResume_click (event)// @startlock
	{// @endlock

		var entity = sources.componentAgent_speakerReadOnly0.getCurrentElement();
		//my myDataReq uri, need that to work with collection server side...
		var myDataUri = document.location.origin+"/filedownload?"+entity.ID.value;
		//debugger;
		// saw they used iframe in the databrowers, so I just copied som code from there
		//iframe = $("#iframeexport");
		iframe = $("#iframeexport");
		if(iframe.length===1){
			iframe.attr("src", "");
			iframe.remove();
			
		}
		$('body').append('<iframe id="iframeexport"></iframe>');
		$('#componentAgent_containerForm').append('<iframe id="iframeexport"></iframe>');
		iframe = $("#iframeexport");
		//iframe = $("#componentAgent_containerForm_iframeexport");
		iframe.hide();
		iframe.attr("src", myDataUri);	
	};// @lock

	buttonAll.click = function buttonAll_click (event)// @startlock
	{// @endlock
		sources.componentAgent_representation.query("agencyID=:1", sources.agencyPublic.ID)
	};// @lock

	buttonShowNot.click = function buttonShowNot_click (event)// @startlock
	{// @endlock
		sources.componentAgent_representation.query("accepted !=true")
	};// @lock

	buttonShow.click = function buttonShow_click (event)// @startlock
	{// @endlock
		sources.componentAgent_representation.query("accepted =true")
	};// @lock

	buttonReject.click = function buttonReject_click (event)// @startlock
	{// @endlock
		sources.componentAgent_representation.accepted=false;
		sources.componentAgent_representation.save();
	};// @lock

	buttonAccept.click = function buttonAccept_click (event)// @startlock
	{// @endlock
		sources.componentAgent_representation.accepted=true;
		sources.componentAgent_representation.save();
	};// @lock

	buttonClose.click = function buttonClose_click (event)// @startlock
	{// @endlock
		$$('componentAgent').removeComponent()
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonDownLoadResume", "click", buttonDownLoadResume.click, "WAF");
	WAF.addListener(this.id + "_buttonAll", "click", buttonAll.click, "WAF");
	WAF.addListener(this.id + "_buttonShowNot", "click", buttonShowNot.click, "WAF");
	WAF.addListener(this.id + "_buttonShow", "click", buttonShow.click, "WAF");
	WAF.addListener(this.id + "_buttonReject", "click", buttonReject.click, "WAF");
	WAF.addListener(this.id + "_buttonAccept", "click", buttonAccept.click, "WAF");
	WAF.addListener(this.id + "_buttonClose", "click", buttonClose.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
