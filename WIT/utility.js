/*deleteAllTables()
createManager();
ds.User.all();
addVersion("Versioning System")
ds.AppVersion.all().count()*/


function createManager() {
TheManager=ds.User.createEntity();
TheManager.login="wretchard";
TheManager.password="pusangligaw"
TheManager.firstName="wretchard"
TheManager.lastName="cat"
TheManager.grp="Manager";
TheManager.save();

}

function enumerateAllTables() {
try {
	
	//blank the variable
	var tableTally=[]
	for (var vName in ds.dataClasses)  // put each datastore class of ds
	{
		TheDataClass=ds.dataClasses[vName];
		vValue = TheDataClass.length;
		tableTally.push(vName + ' -- ' + vValue);
	};	
	return tableTally;
}
catch (e) {
	console.log(e);
}
};


function deleteAllTables() {
try {
	
	notInc=['AppVersion', 'Custom']
	for (var vName in ds.dataClasses)  // put each datastore class of ds
	{
		TheDataClass=ds.dataClasses[vName];
		try {
			if (notInc.indexOf(vName) < 0)
			{

			TheDataClass.all().remove()
			}
		} catch (e) {
			console.log(e);
		}


	};	
	return enumerateAllTables();
}
catch (e) {
	console.log(e);
}
};

function addVersion(description) {
	var versionNo =0;
	if (ds.AppVersion.all().count()==0) {
		versionNo=1.1;		
	}
	else {
		versionNo=ds.AppVersion.max("versionNumber")
	}
	versionNo=versionNo + 0.1;	
	newVersion=ds.AppVersion.createEntity();
	newVersion.versionNumber=versionNo;
	newVersion.keyFeatures=description;
	try {
		newVersion.save()
	} catch (e) {
		return e;
	}
}