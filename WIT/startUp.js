directory.setLoginListener('ptoLogin');

application.addHttpRequestHandler('\\/$','httpDispatcher.js', 'dispatchHandler');

application.addHttpRequestHandler('/uploadFile', 'httpDispatcher.js', 'processFile');

application.addHttpRequestHandler('(?i)^/filedownload$', 'httpDispatcher.js', 'filedownload');
