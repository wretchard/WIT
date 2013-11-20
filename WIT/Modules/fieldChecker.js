/*	The helloWorld() function can be executed from any of your project's server-side JavaScript file using the require() method as follows:
	var result = require('fieldChecker').helloWorld();

	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.Beta/help/Title/en/page3355.html
*/
exports.checkFields = function checkFields (regObject) {
	
	//checkallfields
					

	try {
	//debugger;
	var loginChecker=new RegExp("^[A-Za-z0-9_-]{3,16}$");
	var passwordChecker=new RegExp("^[A-Za-z0-9_-]{6,18}$");
	var emailChecker = new RegExp("^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
	var nameChecker=new RegExp("^[A-Za-z ]{1,35}$");
	var lastName=regObject.lastName.trim()
	var firstName=regObject.firstName.trim()
			
	if (!nameChecker.test(firstName)) {throw new UserException("Not a valid first name")}
	if (!nameChecker.test(lastName)) {throw new UserException("Not a valid last name")}	
	if (!loginChecker.test(regObject.login)) {throw new UserException("Username should be 3-16 characters or numbers no spaces")}
	if (!passwordChecker.test(regObject.password)) {throw new UserException("Password should be 6-18 characters or numbers no spaces")}
	if (!emailChecker.test(regObject.eMail)) {throw new UserException("Not a valid email")}	
	} catch (e) {
		throw new UserException("Check your fields")
	}



	
	return true;
};

exports.giveHost= function giveHost() {
	return settings.project.hostName;
};


function UserException(message) {
   this.message = message;
   this.name = "UserException";
}

exports.checkImgPath = function checkImgPath(strPath) {
	debugger;
	var fileChecker = new RegExp("^(?:[a-zA-Z]\:|\\\\[\w\.]+\\[\w.$]+)\\(?:[\w]+\\)*\w([\w.])+$");
	
	if (!fileChecker.test(strPath)) {throw new UserException("Not a valid filePath")}
	
	return true;
}