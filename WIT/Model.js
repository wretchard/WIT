	
guidedModel =// @startlock
{
	AppVersion :
	{
		methods :
		{// @endlock
			customObj:function()
			{// @lock
				custObj={};
				custObj.versionNumber=ds.AppVersion.max("versionNumber");
				theDescription=ds.AppVersion.find("versionNumber =:1", custObj.versionNumber)
				custObj.versionDescription=theDescription.keyFeatures;;
				custObj.url=ds.Custom.first().url;
				return custObj;
			}// @startlock
		}
	},
	Agency :
	{
		fullName :
		{
			onGet:function()
			{// @endlock
				var firstN;
				var lastN;
				if (this.firstName == null) {firstN=''} else {firstN=this.firstName};
				if (this.lastName == null) {lastN=''} else {lastN=this.lastName};
				varFullName= firstN + ' ' + lastN;
				return varFullName;
			}// @startlock
		},
		password :
		{
			onSet:function(value)
			{// @endlock
				this.HA1Key = directory.computeHA1(this.ID, value); 
			},// @startlock
			onGet:function()
			{// @endlock
				return '******'
			}// @startlock
		}
	},
	AgencyPublic :
	{
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				var result = ds.Agency.createEntityCollection();
				result = ds.Agency.query("owner=:1", currentUser().ID);
				return result;
			}// @startlock
		},
		methods :
		{// @endlock
			changePassword:function(passwordData)
			{// @lock
				//debugger;
				if (currentUser() == null) {
					return
					}
				//define variables
				var theUser = ds.User(currentUser().ID); 
				var theAgency=ds.Agency(passwordData.agencyID);
				var theOldPassword=passwordData.oldPassword;
				var theNewPassword=passwordData.newPasswordAgain;
				//verify old password
				var ha1 = directory.computeHA1(theUser.ID, theOldPassword);
				if (ha1 === theUser.HA1Key) 
				{
					if (theUser !== null) 
					{
						theUser.password=theNewPassword;
						try {
							theUser.save()
						} catch (e) {
						return "User save failure"
						}					
					}
					
				}
				else {
					return "The wrong old password"
				}	
				
				return "You have successfully changed your password"																		
			},// @lock
			newAgent:function(regObject)
			{// @lock
				//look for existing record
				TheAgency=ds.Agency.find('login= :1', regObject.login)
				if (TheAgency == null) 
				{
					TheAgency= ds.Agency.createEntity();
					TheAgency.login = regObject.login;
					TheAgency.password=regObject.password;
					TheAgency.firstName=regObject.firstName;
					TheAgency.lastName=regObject.lastName;
					TheAgency.agencyEmail=regObject.eMail;
					TheAgency.agencyName=regObject.agencyName;
					TheAgency.owner=regObject.userID;
					//set the User.grp to agent
					TheUser=ds.User(regObject.userID);
					TheUser.grp='Agent';
					try {
						TheUser.save();
						TheAgency.save();
						return true;
						} 
					catch (e) {
					e= new Error("Something is wrong with the login")
					throw e;
					}	
				}
				else {
				e= new Error("This login name already exists")
				throw e;
				}	
			}// @startlock
		}
	},
	User :
	{
		grp :
		{
			events :
			{
				onInit:function(attributeName)
				{// @endlock
					this.grp="Resource";
				}// @startlock
			}
		},
		entityMethods :
		{// @endlock
			validatePassword:function(password)
			{// @lock
				var ha1 = directory.computeHA1(this.ID, password);
				return (ha1 === this.HA1Key);
			}// @startlock
		},
		fullName :
		{
			onGet:function()
			{// @endlock
				var firstN;
				var lastN;
				if (this.firstName == null) {firstN=''} else {firstN=this.firstName};
				if (this.lastName == null) {lastN=''} else {lastN=this.lastName};
				varFullName= firstN + ' ' + lastN;
				return varFullName;
			}// @startlock
		},
		methods :
		{// @endlock
			changePassword:function()
			{// @lock
				// Add your code here
			}// @startlock
		},
		password :
		{
			onSet:function(value)
			{// @endlock
				//debugger;
				if (currentUser().ID=="00000000000000000000000000000000")
				{
				this.HA1Key = directory.computeHA1(this.ID, value);
				}
				else {
				var theUser = ds.User(currentUser().ID);
				theAgent=ds.Agency.find("login =:1", theUser.login)
				if (theAgent !==null) {
				theAgent.password=value;
				theAgent.save();
					}
				this.HA1Key = directory.computeHA1(this.ID, value);
			} 
			},// @startlock
			onGet:function()
			{// @endlock
				return '******'
			}// @startlock
		}
	},
	Speaker :
	{
		entityMethods :
		{// @endlock
			addAgency:function(repID, addMode)
			{// @lock
				//check if an agent already exists
				//debugger;
				if (this.agency !== undefined && addMode==true) {
					err = { error : 10001, errorMessage: "Terminate an agent before getting a new one"};
					return err;
				}	
				TheRep=ds.Representation.find("ID=:1", repID);
				TheAgency=ds.Agency.find("ID=:1", TheRep.agencyReadOnly.ID);
				if(addMode == undefined || addMode == true)
				{
					this.agency=TheAgency;
					TheRep.confirmed=true;
				}
				else
				{
					this.agency=null;
					TheRep.accepted=false;
					TheRep.confirmed=false;
				}
				try {
				this.save();
				TheRep.save();
				} 
				catch (e) {
					debugger;
				}
					err = { error : 0, errorMessage: "You have added an agent"};
					return err;												
			}// @startlock
		},
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				result = ds.User.query("ID=:1", currentUser().ID);				
				return result;
			}// @startlock
		},
		methods :
		{// @endlock
			getWhereObj:function(speakerID)
			{// @lock
				wObj={}
				TheSpeaker=ds.Speaker.find("ID=:1", speakerID)
				if (TheSpeaker.agency == null) {
					return null // no acceptance
				}
				TheRepresentation=ds.Representation.find("speakerID=:1 and agencyID=:2 and accepted==true", speakerID, TheSpeaker.agency.ID)
				wObj.speakerName=TheSpeaker.fullName;
				wObj.agentName=TheRepresentation.agencyName;
				wObj.agentEmail=TheSpeaker.agency.agencyEmail;
				wObj.category=TheRepresentation.category;
				wObj.fee_per_unit = TheRepresentation.advertisedFee + " per " + TheRepresentation.unitMeasure;
				//get the Description
				descr =ds.TalentCategory.find("agency.ID=:1 and category=:2", TheSpeaker.agency.ID, wObj.category)
				wObj.description=descr.fullDescription;
				wObj.speakerURL=TheSpeaker.url;
				wObj.agencyURl=TheSpeaker.agency.url;
				wObj.speakerDescription=TheSpeaker.selfDescription;
				return wObj;
			},// @lock
			newUser:function(regObject)
			{// @lock
 			
				//look for existing record
                var UserException={message:"LoginName exists"}
				TheUser=ds.User.find('login= :1', regObject.login)
				if (TheUser == null) {
					TheUser= ds.User.createEntity();
					TheUser.login = regObject.login.toLowerCase();
					TheUser.password=regObject.password;
					TheUser.firstName=regObject.firstName;
					TheUser.lastName=regObject.lastName;
					TheUser.eMail=regObject.eMail;
					
					if (regObject.agencyName !== undefined) {
						TheUser.role='agent';
						}
					try {
					TheUser.save();
					return TheUser.ID;
					} catch (e) {
					return {error: 102, errorMessage: "Cannot save this new user	"};
					}
					
				}
				else {
				throw UserException;
				//return {error: 101, errorMessage: "This login name already exists"};
				}
			}// @startlock
		}
	}
};// @endlock



