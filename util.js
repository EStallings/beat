//General / Math

function rint(n) { return Math.floor(Math.random()*n); }
function contains(a, e){return a.indexOf(e) != -1; }

//Point -> Rect
function hpora(x1, y1, x2, y2, w, h) {
	return (x1 >= x2 && x1 <= x2+w && y1 >= y2 && y1 <= y2+h);
}

//Point -> Circle
function hpoca(x1, y1, x2, y2, r) {
	return ((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)) <= (r*r);
}

//Circle -> Circle
function hcoca(x1, y1, r1, x2, y2, r2) {
	return ((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)) <= (r1+r2)*(r1+r2);
}

//Circle -> Rect
function hcora(x1, y1, r, x2, y2, w, h) {
	return hpora(x1, y1, x2, y2, w, h) || 
	hpoca(x2, y2, x1, y1, r) || 
	hpoca(x2+w, y2, x1, y1, r) ||
	hpoca(x2, y2+h, x1, y1, r) ||
	hpoca(x2+w, y2+h, x1, y1, r);
}

//Graphics related
function HSVtoRGB(h, s, v) {
	var r, g, b, i, f, p, q, t;
	if (h && s === undefined && v === undefined) {
		s = h.s, v = h.v, h = h.h;
	}
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
	return "rgb(" + Math.floor(r * 255) + "," + Math.floor(g * 255) + "," + Math.floor(b * 255) + ")";
}


//Data management & networking
 function loadJSON(callback, src) { 
 	var rsp = {};
 	rsp.contents = null;
 	rsp.status = 'unknown';
 	function helper(callback) {
			var xobj = new XMLHttpRequest();
					xobj.overrideMimeType("application/json");
			xobj.open('GET', src, true);
			xobj.onreadystatechange = function () {
						if (xobj.readyState == 4 && xobj.status == "200") {
							// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
							callback(xobj.responseText);
						}
			};
			xobj.send(null);	
 	} 
 	helper(function (response) {
 		rsp.contents = JSON.parse(response);
 		rsp.status = 'done';
 		callback(rsp);
 	});
 }