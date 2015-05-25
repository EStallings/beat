function DisplayManager() {
	width = window.innerWidth;
	height = window.innerHeight;
	this.canvases = {};
	this.visibility = {};
	this.gfxs = {};
	this.offsetX = 0;
	this.offsetY = 0;
	this.scale = 1;
	this.rotation = 0;

	this.addCanvas = function(id, renderFunc) {
		var canvas = document.createElement('canvas');
		document.body.appendChild(canvas);
		canvas.id = id;
		canvas.width = width;
		canvas.height = height;
		this.canvases[id] = canvas;
		this.gfxs[id] = canvas.getContext('2d');
		this.visibility[id] = true;
	}

	this.cleanUp = function() {
		for(var i in this.canvases){
			document.body.removeChild(this.canvases[i]);
		}
	}

	this.resetCanvas = function(id) {
		this.gfxs[id].clearRect(0,0,width,height);
	}

	this.adjustCanvas = function(id) {
		this.gfxs[id].setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);
	}

	//todo: interpolate this?
	this.hideCanvas = function(id) {
		this.visibility[id] = false;
		this.canvases[id].style.opacity = "0";
	}

	this.showCanvas = function(id) {
		this.visibility[id] = true;
		this.canvases[id].style.opacity = "1";
	}

	this.redraw = function(){
		for(var i in this.canvases){
			if(this.visibility[i]){
				renderFuncs[i]();
			}
		}
	}
	this.screenToGridCoords = function(x, y){
		gx = Math.floor((x - this.offsetX)/(CELL_SIZE*this.scale));
		gy = Math.floor((y - this.offsetY)/(CELL_SIZE*this.scale));
		return {x:gx, y:gy};
	}

	this.addCanvas('background');
	this.addCanvas('tiles');
	this.addCanvas('walls');
	this.addCanvas('obstructions');
	this.addCanvas('corners');
	this.addCanvas('decor');
	this.addCanvas('bg_entities');
	this.addCanvas('entities');
	this.addCanvas('player');
	this.addCanvas('bullets');
	this.addCanvas('pickups');
	this.addCanvas('particles1');
	this.addCanvas('particles2');
	this.addCanvas('particles3');
	this.addCanvas('effects');
	this.addCanvas('bg_ui');
	this.addCanvas('m_ui');
	this.addCanvas('p_ui');
	this.addCanvas('top_ui');
	this.addCanvas('debug3');
	this.addCanvas('debug2');
	this.addCanvas('debug1');
	this.addCanvas('input');
	this.canvases.background.style.backgroundColor = 'blue';
}

