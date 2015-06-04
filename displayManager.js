function RenderSurface(id, needsMaster) {
	this.canvas = document.createElement('canvas');
	this.gfx = this.canvas.getContext('2d');

	document.body.appendChild(this.canvas);
	this.canvas.width = screenWidth;
	this.canvas.height = screenHeight;

	if(needsMaster){
		this.masterCanvas = document.createElement('canvas');
		this.masterGfx = this.masterCanvas.getContext('2d');
		this.masterCanvas.width = 16384; //32 * 512
		this.masterCanvas.height = 16384;
	}
	
	this.visible = true;
	this.id = id;

	this.reset = function() {
		this.gfx.clearRect(0,0,screenWidth,screenHeight);
	}

	this.adjust = function(scale, offsetX, offsetY) {
		this.gfx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
	}

	this.show = function() {
		this.visible = true;
		this.canvas.style.opacity = "1";
	}

	this.hide = function() {
		this.visible = false;
		this.canvas.style.opacity = "0";
	}
}

function DisplayManager() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	
	this.offsetX = 0;
	this.offsetY = 0;
	this.lastX = 0;
	this.lastY = 0;
	this.dx = 0;
	this.dy = 0;
	this.scale = 1;
	this.rotation = 0;

	this.surfaces = {};

	this.redraw = function(){
		this.dx = this.offsetX - this.lastX;
		this.dy = this.offsetY - this.lastY;
		for(var i in this.surfaces){
			if(this.surfaces[i].visible){
				renderFuncs[i]();
			}
		}
		this.lastX = this.offsetX;
		this.lastY = this.offsetY;
		this.dx = 0;
		this.dy = 0
	}

	this.screenToGridCoords = function(x, y){
		var gx = Math.floor((x - this.offsetX)/(CELL_SIZE*this.scale));
		var gy = Math.floor((y - this.offsetY)/(CELL_SIZE*this.scale));
		return {x:gx, y:gy};
	}

	this.screenToGridCoordsWithDiff = function(x, y){
		var cs = CELL_SIZE*this.scale;
		var gx = Math.floor((x - this.offsetX)/cs);
		var gy = Math.floor((y - this.offsetY)/cs);
		var cx = (gx*cs)+cs/2+this.offsetX;
		var cy = (gy*cs)+cs/2+this.offsetY;
		return {x:gx, y:gy, dx:cx-x, dy:cy-y};
	}

	this.drawObs = function(gfx, obs, x, y) {
		var img = assets.images.obstructions[obs.img];
		var sx = obs.health*CELL_SIZE;
		var sy = obs.state*CELL_SIZE;
		gfx.drawImage(img, sx, sy, CELL_SIZE, CELL_SIZE, x, y, CELL_SIZE, CELL_SIZE);
	}

	this.drawCorners = function(gfx, corners, x, y) {
		if(corners.ul){
			var img = assets.images.corners[corners.ul.img];
			var sx = corners.ul.health*WALL_WIDTH;
			var sy = corners.ul.state*WALL_WIDTH;
			gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, x, y, WALL_WIDTH, WALL_WIDTH);
		}
		if(corners.ur){
			var img = assets.images.corners[corners.ur.img];
			var sx = corners.ur.health*WALL_WIDTH;
			var sy = corners.ur.state*WALL_WIDTH;
			gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, x+(CELL_SIZE-WALL_WIDTH), y, WALL_WIDTH, WALL_WIDTH);
		}

		if(corners.ll){
			var img = assets.images.corners[corners.ll.img];
			var sx = corners.ll.health*WALL_WIDTH;
			var sy = corners.ll.state*WALL_WIDTH;
			gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, x, y+(CELL_SIZE-WALL_WIDTH), WALL_WIDTH, WALL_WIDTH);
		}
		if(corners.lr){
			var img = assets.images.corners[corners.lr.img];
			var sx = corners.lr.health*WALL_WIDTH;
			var sy = corners.lr.state*WALL_WIDTH;
			gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, x+(CELL_SIZE-WALL_WIDTH), y+(CELL_SIZE-WALL_WIDTH), WALL_WIDTH, WALL_WIDTH);
		}
	}

	this.surfaces['background'] = new RenderSurface('background');
	this.surfaces['tiles'] = new RenderSurface('tiles', true);
	this.surfaces['walls'] = new RenderSurface('walls', true);

	this.surfaces['corners'] = new RenderSurface('corners');
	this.surfaces['decor'] = new RenderSurface('decor');

	this.surfaces['bg_entities'] = new RenderSurface('bg_entities');
	this.surfaces['entities'] = new RenderSurface('entities');
	this.surfaces['player'] = new RenderSurface('player');
	this.surfaces['bullets'] = new RenderSurface('bullets');
	this.surfaces['pickups'] = new RenderSurface('pickups');
	this.surfaces['particles1'] = new RenderSurface('particles1');
	this.surfaces['particles2'] = new RenderSurface('particles2');
	this.surfaces['particles3'] = new RenderSurface('particles3');
	this.surfaces['effects'] = new RenderSurface('effects');
	this.surfaces['bg_ui'] = new RenderSurface('bg_ui');
	this.surfaces['m_ui'] = new RenderSurface('m_ui');
	this.surfaces['p_ui'] = new RenderSurface('p_ui');
	this.surfaces['top_ui'] = new RenderSurface('top_ui');
	this.surfaces['debug3'] = new RenderSurface('debug3');
	this.surfaces['debug2'] = new RenderSurface('debug2');
	this.surfaces['debug1'] = new RenderSurface('debug1');
}

