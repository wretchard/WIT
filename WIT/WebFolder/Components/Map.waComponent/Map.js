
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Map';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		//get only the arrivals coming within a week;
		var thisDay=new Date()
		thisDay.setDate(thisDay.getDate())
		var strToday=thisDay.toJSON();
		thisDay.setDate(thisDay.getDate() + 8)
		var strToWhen= thisDay.toJSON();
		var s=strToday.slice(0,strToday.indexOf("T"))
		var f=strToWhen.slice(0,strToWhen.indexOf("T"))
		sources.componentMain_where.query("toWhen > :1", s, {
		onSuccess: function(event){}
		}
		) 
		//$$('richTextVersion').setValue(sources.objcustom.versionNumber.toFixed(1))
		/*$$('richTextfeatures').setValue(sources.objcustom.versionDescription)
		
		$('#dataGridWhere').hover(
		function() {
			$('#errorDiv1').html('Select a city');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);
		//map
		$('#googleMaps1').hover(
		function() {
			$('#errorDiv1').html('Click the icons for detail');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);	
		//radio
		$('#containerRadio').hover(
		function() {
			$('#errorDiv1').html('See arrivals in the future');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);
		//citysearchfield
		$('#textFieldSearch').hover(
		function() {
			$('#errorDiv1').html('Enter a city to search');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);
		//combobox
		$('#comboCategory').hover(
		function() {
			$('#errorDiv1').html('Choose a category to search');
		},
		
		function() {
			$('#errorDiv1').html('');
		}
		);
		//load up the combo box*/
		distinctValues()							
		

	// @region namespaceDeclaration// @startlock
	var checkbox1 = {};	// @checkbox
	var dataGrid5 = {};	// @dataGrid
	var dataGrid4 = {};	// @dataGrid
	var buttonReset = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	checkbox1.click = function checkbox1_click (event)// @startlock
	{// @endlock
		if (componentMain_boolShow) {
			$('#componentMain_queryForm1').show();
		}
		else {
			$('#componentMain_queryForm1').hide();
		}
	};// @lock

	dataGrid5.onCellClick = function dataGrid5_onCellClick (event)// @startlock
	{// @endlock
		var vcat = event.data.cell.value
		sources.componentMain_where.query('category=:1', vcat);
	};// @lock

	dataGrid4.onCellClick = function dataGrid4_onCellClick (event)// @startlock
	{// @endlock
		var vcity = event.data.cell.value;
		sources.componentMain_where.query('city=:1', vcity);
	};// @lock
	
	function distinctValues() {
		componentMain_arrCategory=[];
		sources.componentMain_where.distinctValues('category',
		{onSuccess: function(event) {
			dv=event.distinctValues;
			for (var i=0; i<dv.length; i++) {
				//$$('componentMain_comboCategory').addOption(dv[i],dv[i])
				componentMain_arrCategory.push({Category:dv[i]})
			}
			sources.componentMain_arrCategory.sync();
			}
		}
		);
		
		componentMain_arrCities=[];
		
		sources.componentMain_where.distinctValues('city',
		{onSuccess: function(event) {
			dv=event.distinctValues;
			for (var i=0; i<dv.length; i++) {
				componentMain_arrCities.push({Cities:dv[i]})
			}
			sources.componentMain_arrCities.sync();			
			}
		}
		)
		

}

	var destHost=fieldChecker.giveHost();
	



	buttonReset.click = function buttonReset_click (event)// @startlock
	{// @endlock
		sources.componentMain_where.all();
	};// @lock


	// @region eventManager// @startlock
	WAF.addListener(this.id + "_checkbox1", "click", checkbox1.click, "WAF");
	WAF.addListener(this.id + "_dataGrid5", "onCellClick", dataGrid5.onCellClick, "WAF");
	WAF.addListener(this.id + "_dataGrid4", "onCellClick", dataGrid4.onCellClick, "WAF");
	WAF.addListener(this.id + "_buttonReset", "click", buttonReset.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
