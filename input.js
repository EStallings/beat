///INPUT///

var KEY_CODE = {
	'UP':     38, 'DOWN':   40,
	'LEFT':   37, 'RIGHT':  39,
	'BKSP':   8,  'ENTER':  13,
	'TAB':    9,  'ESC':    27,
	'PGUP':   33, 'PGDOWN': 34,
	'HOME':   36, 'END':    35,
	'INS':    45, 'DEL':    46,
	'SPACE':  32, 'TILDE':  192,
	'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,
	'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90
};

var CHAR_CODE = {
	38: 'UP',   40:  'DOWN',
	37: 'LEFT', 39:  'RIGHT',
	8:  'BKSP', 13:  'ENTER',
	9:  'TAB',  27:  'ESC',
	33: 'PGUP', 34:  'PGDOWN',
	36: 'HOME', 35:  'END',
	45: 'INS',  46:  'DEL',
	32: 'SPACE',192: 'TILDE',
	48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',
	65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z'
};

var INPUT = {};
INPUT.keys = {
	'ALT':   false, 'CTRL':   false, 'SHIFT': false,
	'UP':    false, 'DOWN':   false,
	'LEFT':  false, 'RIGHT':  false,
	'BKSP':  false, 'ENTER':  false,
	'TAB':   false, 'ESC':    false,
	'PGUP':  false, 'PGDOWN': false,
	'HOME':  false, 'END':    false,
	'INS':   false, 'DEL':    false,
	'SPACE': false, 'TILDE':  false,
	'0':false,'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false,'8':false,'9':false,
	'A':false,'B':false,'C':false,'D':false,'E':false,'F':false,'G':false,'H':false,'I':false,'J':false,'K':false,'L':false,'M':false,'N':false,'O':false,'P':false,'Q':false,'R':false,'S':false,'T':false,'U':false,'V':false,'W':false,'X':false,'Y':false,'Z':false
};
INPUT.mouse = {
	'X':0,
	'Y':0,
	'LMB':false,
	'MMB':false,
	'RMB':false,
	'SCROLL':0
};

//Should be called last in updates
INPUT.update = function(dt) {
	this.mouse.SCROLL = 0;
}
var fn_keys = function(e){
	INPUT.keys['ALT'] = e.altKey;
	INPUT.keys['CTRL'] = e.ctrlKey;
	INPUT.keys['SHIFT'] = e.shiftKey;
}

function killEvent(e){
	e.preventDefault();
	e.stopPropagation();
}

window.onkeydown = function(e) {
	if(CHAR_CODE[e.keyCode]) {
		INPUT.keys[CHAR_CODE[e.keyCode]] = true;
	}
	fn_keys(e);
	killEvent(e);
	return false;
};

window.onkeyup = function(e) {
	if(CHAR_CODE[e.keyCode]) {
		INPUT.keys[CHAR_CODE[e.keyCode]] = false;

	}
	fn_keys(e);
	killEvent(e);
	return false;
};

window.onmousedown = function(e) {
	switch(e.which){
		case 1: INPUT.mouse['LMB'] = true; break;
		case 2: INPUT.mouse['MMB'] = true; break;
		case 3: INPUT.mouse['RMB'] = true; break;
		default: break;
	}
	fn_keys(e);
	killEvent(e);
	return false;
};

window.onmouseup = function(e) {
	switch(e.which){
		case 1: INPUT.mouse['LMB'] = false; break;
		case 2: INPUT.mouse['MMB'] = false; break;
		case 3: INPUT.mouse['RMB'] = false; break;
		default: break;
	}
	fn_keys(e);
	killEvent(e);
	return false;
};

window.onmousemove = function(e) {
	INPUT.mouse['X'] = e.clientX;
	INPUT.mouse['Y'] = e.clientY;
	fn_keys(e);
	killEvent(e);
	return false;
};

window.onmousewheel = function(e) {
	INPUT.mouse['SCROLL'] = e.deltaY;
	killEvent(e);
	return false;
}