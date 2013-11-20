
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//get only the arrivals coming within a week;
		//debugger;
		var thisDay=new Date()
		thisDay.setDate(thisDay.getDate())
		var strToday=thisDay.toJSON();
		thisDay.setDate(thisDay.getDate() + 8)
		var strToWhen= thisDay.toJSON();
		var s=strToday.slice(0,strToday.indexOf("T"))
		var f=strToWhen.slice(0,strToWhen.indexOf("T"))
		sources.where.query("toWhen > :1", s, {
		onSuccess: function(event){}
		}
		) 
		//debugger;
		sources.objcustom=ds.AppVersion.customObj();
		$$('richTextVersion').setValue(sources.objcustom.versionNumber.toFixed(1))
		$$('richTextfeatures').setValue(sources.objcustom.versionDescription)
		
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
		//load up the combo box
		distinctValues()								
	};// @lock

function distinctValues() {
		sources.where.distinctValues('category',
		{onSuccess: function(event) {
			dv=event.distinctValues;
			for (var i=0; i<dv.length; i++) {
				$$('comboCategory').addOption(dv[i],dv[i])
			}
			}
		}
		)


}

	var destHost=fieldChecker.giveHost();
	

function searchCity(vCity) {
	
	//sources.where.filterQuery
	//debugger;
	sources.where.query("city=:1", vCity, {
			onSuccess:function (event) {
				distinctValues();
				$$('errorDiv1').setValue('')
			}
			}
		
		)
};

var vPlace;

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
