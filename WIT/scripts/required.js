function ptoLogin(userName, password) {
	//Need permission to read User class for new session.
	//debugger;
	var sessionRef = currentSession(); // Get session.
	var promoteToken = sessionRef.promoteWith("Admin"); //temporarily make this session Admin level.
	
	var myUser = ds.User({login:userName});
	//var myUser = ds.User.find("login=:1", userName);

	if (myUser === null) {
		return false;
	} else {
		//we will handle login
		if (myUser.validatePassword(password)) {
			var theGroups = [];

			switch (myUser.grp) {
				case "Manager":
				theGroups = ['Manager'];
				break;

				case "Resource":
				theGroups = ['Resource'];
				break;
				
				case "Agent":
				theGroups = ['Agent'];
				break;

				default:
				theGroups = ['Resource'];
				break;
			}

			var connectTime = new Date();
			return {
				ID: myUser.ID,
				name: myUser.login,
				fullName: myUser.fullName,
				belongsTo: theGroups,
				storage: { 	time: connectTime,
							role: myUser.role,
							agency: myUser.agency
				}
			}
			
		} else {
			
		return {error: 1024, errorMessage: "invalid login"};
		}
		
	}
	
	sessionRef.unPromote(promoteToken); //put the session back to normal.\
} //ptoLogin



function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


