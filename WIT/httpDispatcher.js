
function dispatchHandler ( request, response ) {
	var responseTxt
	if (settings.project.hostName=='localhost') {
		 responseTxt='http://localhost:8081/index/'
	}
	else {
		responseTxt='http://' + settings.project.hostName + '/index/'
	}
	response.headers.location=responseTxt;
	return;
}


function processFile(request, response){
	//debugger;
	if(request.parts.length >1 ){
		var fileName = request.parts[0].asText;
		var userID = request.parts[1].asText;
		var TheResume = ds.User(userID);		
		var theBlob = request.parts[2].asBlob; 		
		TheResume.resume = theBlob;
		TheResume.resumeName= fileName
	}
	TheResume.save();
	return true;
}

function filedownload(request, response) {
	try {
		//debugger;
		var TheUser = ds.User(request.urlQuery);
		//var attachment = files.fileBlobsCollection.first();
		var attachment = TheUser.resume;
		response.contentType = 'application/octet-stream';
		response.headers['content-disposition'] = 'attachement; filename='+TheUser.resumeName;
		//response.body = attachment.attachment;
		response.body = attachment;
	} catch (e) {
		var vBuffer = new Buffer(e.message);
	    var vBlob = vBuffer.toBlob();
	    response.contentType = 'application/octet-stream';
	    response.headers['content-disposition'] = 'attachement; filename=error.txt';
	    response.body = vBlob; 
	}
}