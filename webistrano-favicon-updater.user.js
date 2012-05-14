// ==UserScript==
// @name          webistrano favicon updater
// @description   
// @namespace     http://
// @include       http://*
// @version       0.1
// @license       MIT License
// @work          Google Chrome
// ==/UserScript==

(function() {
    function favicon_updater() {
        $.get(location.pathname+'.xml', function(data, status, xhr){
            var status = xhr.responseXML.getElementsByTagName('status')[0].childNodes[0].nodeValue;
            replace_favicon(document, document.getElementsByTagName('head')[0], status)
        });
    };

    // http://userscripts.org/scripts/show/42247
    function replace_favicon(d, h, s) {
	// Create this favicon
	var ss = d.createElement('link');
	ss.rel = 'shortcut icon';
	ss.type = 'image/x-icon';

        switch(s){
        case 'running':
	    ss.href = '/images/peritor_theme/status_running.gif';
            break;
        case 'success':
            ss.href = '/images/peritor_theme/status_success.gif';
            break;
        case 'failed':
            ss.href = '/images/peritor_theme/status_failed.gif';
            break;
        default:
            ss.href = '/favicon.ico';
            break;
        }

	// Remove any existing favicons
	var links = h.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
	    if (links[i].href == ss.href) return;
	    if (links[i].rel == "shortcut icon" || links[i].rel=="icon")
		h.removeChild(links[i]);
	}
	// Add this favicon to the head
	h.appendChild(ss);
	// Force browser to acknowledge
	var shim = document.createElement('iframe');
	shim.width = shim.height = 0;
	document.body.appendChild(shim);
	shim.src = "icon";
	document.body.removeChild(shim);
    };

    setInterval(favicon_updater, 1000);
})();
