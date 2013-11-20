
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Map';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonReset = {};	// @button
	var comboCategory = {};	// @combobox
	var radioGroupTime = {};	// @radioGroup
	var textFieldSearch = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonReset.click = function buttonReset_click (event)// @startlock
	{// @endlock
		sources.where.all();
	};// @lock

	comboCategory.change = function comboCategory_change (event)// @startlock
	{// @endlock
			vCity =this.getValue();
			sources.where.filterQuery("category=:1", vCity, {
			onSuccess:function (event) {
				//$$('googleMaps1').setCenter(event.dataSource.city)
				$$('errorDiv1').setValue('')
			}
			}
		
		)
	};// @lock

	radioGroupTime.change = function radioGroupTime_change (event)// @startlock
	{// @endlock

		var tarDay=new Date();
		
		if ($$('textFieldSearch').getValue() !=="")
		{
			vPlace=$$('textFieldSearch').getValue()
		}
		else if (sources.where.city !== null)
		{
			vPlace=sources.where.city
		}
		else if (vPlace == '') {
			$$('errorDiv1').setValue('There is no chosen city')
			return;
		}
		//calculate future
		vOffset=parseInt(this.getValue())
		tarDay.setDate(tarDay.getDate() + vOffset)
		var strDate= tarDay.toJSON()
		strDate=strDate.slice(0,strDate.indexOf("T"))
		sources.where.query("city =:1 and fromWhen > :2", vPlace, strDate, {
			onSuccess:function (event) {
				distinctValues()
			}
			});
	};// @lock

	textFieldSearch.keydown = function textFieldSearch_keydown (event)// @startlock
	{// @endlock
		//debugger;
		if(event.keyCode == 13)
		{
    		searchCity(this.getValue());
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonReset", "click", buttonReset.click, "WAF");
	WAF.addListener(this.id + "_comboCategory", "change", comboCategory.change, "WAF");
	WAF.addListener(this.id + "_radioGroupTime", "change", radioGroupTime.change, "WAF");
	WAF.addListener(this.id + "_textFieldSearch", "keydown", textFieldSearch.keydown, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
