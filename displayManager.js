function RenderSurface(id, _width, _height) {
	this.width = _width;
	this.height = _height;
	this.masterCopy = document.createElement('canvas');
	this.masterGfx = this.masterCopy.getContext('2d');

	this.renderCopy = document.createElement('canvas');
	this.renderGfx = this.renderCopy.getContext('2d');
	document.body.appendChild(this.renderCopy);
	this.renderCopy.width = screenWidth;
	this.renderCopy.height = screenHeight;
	
	this.visible = true;
	this.id = id;

	this.reset = function(){
		this.masterGfx.clearRect(0,0,this.width,this.height);
		this.renderGfx.clearRect(0,0,screenWidth,screenHeight);
	}

	this.adjustCanvas = function(offsetX, offsetY){
		this.renderGfx.clearRect(0,0,screenWidth, screenHeight);
		var data = this.masterGfx.getImageData(offsetX, offsetY, screenWidth, screenHeight);
		this.renderGfx.putImageData(data, 0, 0);
	}
}

function DisplayManager() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	masterWidth = 32*50;
	masterHeight = 32*50;
	
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
		gx = Math.floor((x - this.offsetX)/(CELL_SIZE*this.scale));
		gy = Math.floor((y - this.offsetY)/(CELL_SIZE*this.scale));
		return {x:gx, y:gy};
	}

	this.drawTile = function(gfx, cell, x, y) {
		if(!cell) {
			gfx.clearRect(x,  y, CELL_SIZE, CELL_SIZE);
			return;
		} 
		if(!cell.tile) {
			gfx.fillStyle = gfx.strokeStyle = "#000";
			gfx.font = '12px Arial';
			gfx.fillText("Blank", x, y + CELL_SIZE/2);
			gfx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
		}
		else{
			var img = assets.images.tiles[cell.tile.img];
			var sx = cell.tile.health*CELL_SIZE;
			var sy = cell.tile.state*CELL_SIZE;
			gfx.drawImage(img, sx, sy, CELL_SIZE, CELL_SIZE, x, y, CELL_SIZE, CELL_SIZE);
		}
	}

	this.drawHorizWalls = function(gfx, walls, x, y) {
		if(walls.top){
			var img1 = assets.images.walls[walls.top.img];
			var sx1 = walls.top.health*WALL_LENGTH;
			var sy1 = walls.top.state*WALL_WIDTH;
			gfx.drawImage(img1, sx1, sy1, WALL_LENGTH, WALL_WIDTH, x, y, WALL_LENGTH, WALL_WIDTH);
		}
		if(walls.bottom){
			var img2 = assets.images.walls[walls.bottom.img];
			var sx2 = walls.bottom.health*WALL_LENGTH;
			var sy2 = walls.bottom.state*WALL_WIDTH;
			gfx.drawImage(img2, sx2, sy2, WALL_LENGTH, WALL_WIDTH, x, y+(CELL_SIZE-WALL_WIDTH), WALL_LENGTH, WALL_WIDTH);
		}
	}

	this.drawVertWalls = function(gfx, walls, x, y) {
		if(walls.left){
			var img1 = assets.images.walls[walls.left.img];
			var sx1 = walls.left.health*WALL_LENGTH;
			var sy1 = walls.left.state*WALL_WIDTH;
			gfx.drawImage(img1, sx1, sy1, WALL_LENGTH, WALL_WIDTH, y, -x-WALL_WIDTH, WALL_LENGTH, WALL_WIDTH);
		}
		if(walls.right){
			var img2 = assets.images.walls[walls.right.img];
			var sx2 = walls.right.health*WALL_LENGTH;
			var sy2 = walls.right.state*WALL_WIDTH;
			gfx.drawImage(img2, sx2, sy2, WALL_LENGTH, WALL_WIDTH, y, -x-(CELL_SIZE-WALL_WIDTH)-WALL_WIDTH, WALL_LENGTH, WALL_WIDTH);
		}
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

	this.surfaces['background'] = new RenderSurface('background', masterWidth, masterHeight);
	this.surfaces['tiles'] = new RenderSurface('tiles', masterWidth, masterHeight);
	this.surfaces['walls'] = new RenderSurface('walls', masterWidth, masterHeight);
	this.surfaces['obstructions'] = new RenderSurface('obstructions', masterWidth, masterHeight);
	this.surfaces['corners'] = new RenderSurface('corners', masterWidth, masterHeight);
	this.surfaces['decor'] = new RenderSurface('decor', masterWidth, masterHeight);
	this.surfaces['bg_entities'] = new RenderSurface('bg_entities', masterWidth, masterHeight);
	this.surfaces['entities'] = new RenderSurface('entities', masterWidth, masterHeight);
	this.surfaces['player'] = new RenderSurface('player', masterWidth, masterHeight);
	this.surfaces['bullets'] = new RenderSurface('bullets', masterWidth, masterHeight);
	this.surfaces['pickups'] = new RenderSurface('pickups', masterWidth, masterHeight);
	this.surfaces['particles1'] = new RenderSurface('particles1', masterWidth, masterHeight);
	this.surfaces['particles2'] = new RenderSurface('particles2', masterWidth, masterHeight);
	this.surfaces['particles3'] = new RenderSurface('particles3', masterWidth, masterHeight);
	this.surfaces['effects'] = new RenderSurface('effects', masterWidth, masterHeight);
	this.surfaces['bg_ui'] = new RenderSurface('bg_ui', masterWidth, masterHeight);
	this.surfaces['m_ui'] = new RenderSurface('m_ui', masterWidth, masterHeight);
	this.surfaces['p_ui'] = new RenderSurface('p_ui', masterWidth, masterHeight);
	this.surfaces['top_ui'] = new RenderSurface('top_ui', masterWidth, masterHeight);
	this.surfaces['debug3'] = new RenderSurface('debug3', masterWidth, masterHeight);
	this.surfaces['debug2'] = new RenderSurface('debug2', masterWidth, masterHeight);
	this.surfaces['debug1'] = new RenderSurface('debug1', masterWidth, masterHeight);
	this.surfaces['input'] = new RenderSurface('input', masterWidth, masterHeight);
}

