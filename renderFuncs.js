renderFuncs = {};
renderFuncs['background'] = function() {
	var gfx = displayManager.gfxs['background'];
	displayManager.resetCanvas('background');
}
renderFuncs['tiles'] = function() {
	var gfx = displayManager.gfxs['tiles'];
	displayManager.resetCanvas('tiles');
	displayManager.adjustCanvas('tiles');
	//TODO optimize!
	if(!level) return;
	for(var i = 0; i < level.width; i++) {
		for(var j = 0; j < level.height; j++) {
			var cell = level.cells[i][j];
			if(!cell) continue;
			if(!cell.tile) {
				gfx.fillStyle = gfx.strokeStyle = "#000";
				gfx.fillText("Blank", i*CELL_SIZE, j*CELL_SIZE + CELL_SIZE/2);
				gfx.strokeRect(i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
			}
			else{
				var img = assets.images.tiles[cell.tile.img];
				var sx = cell.tile.health*CELL_SIZE;
				var sy = cell.tile.state*CELL_SIZE;
				gfx.drawImage(img, sx, sy, CELL_SIZE, CELL_SIZE, i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
			}
		}
	}
}
renderFuncs['walls'] = function() {
	var gfx = displayManager.gfxs['walls'];
	displayManager.resetCanvas('walls');
	gfx.rotate(Math.PI/2)
	displayManager.resetCanvas('walls');
	displayManager.adjustCanvas('walls');

	if(!level) return;
	for(var i = 0; i < level.width; i++) {
		for(var j = 0; j < level.height; j++) {
			var cell = level.cells[i][j];
			if(!cell || !cell.walls) continue;
			else {
				if(cell.walls.top){
					var img1 = assets.images.walls[cell.walls.top.img];
					var sx1 = cell.walls.top.health*WALL_LENGTH;
					var sy1 = cell.walls.top.state*WALL_WIDTH;
					gfx.drawImage(img1, sx1, sy1, WALL_LENGTH, WALL_WIDTH, i*CELL_SIZE, j*CELL_SIZE, WALL_LENGTH, WALL_WIDTH);
				}
				if(cell.walls.bottom){
					var img2 = assets.images.walls[cell.walls.bottom.img];
					var sx2 = cell.walls.bottom.health*WALL_LENGTH;
					var sy2 = cell.walls.bottom.state*WALL_WIDTH;
					gfx.drawImage(img2, sx2, sy2, WALL_LENGTH, WALL_WIDTH, i*CELL_SIZE, j*CELL_SIZE+(CELL_SIZE-WALL_WIDTH), WALL_LENGTH, WALL_WIDTH);
				}
			}
		}
	}
	gfx.rotate(Math.PI/2);
	for(var i = 0; i < level.width; i++) {
		for(var j = 0; j < level.height; j++) {
			var cell = level.cells[i][j];
			if(!cell || !cell.walls) continue;
			else {
				if(cell.walls.left){
					var img1 = assets.images.walls[cell.walls.left.img];
					var sx1 = cell.walls.left.health*WALL_LENGTH;
					var sy1 = cell.walls.left.state*WALL_WIDTH;
					gfx.drawImage(img1, sx1, sy1, WALL_LENGTH, WALL_WIDTH, j*CELL_SIZE, -i*CELL_SIZE-WALL_WIDTH, WALL_LENGTH, WALL_WIDTH);
				}
				if(cell.walls.right){
					var img2 = assets.images.walls[cell.walls.right.img];
					var sx2 = cell.walls.right.health*WALL_LENGTH;
					var sy2 = cell.walls.right.state*WALL_WIDTH;
					gfx.drawImage(img2, sx2, sy2, WALL_LENGTH, WALL_WIDTH, j*CELL_SIZE, -i*CELL_SIZE-(CELL_SIZE-WALL_WIDTH)-WALL_WIDTH, WALL_LENGTH, WALL_WIDTH);
				}
			}
		}
	}
	gfx.rotate(-Math.PI/2);

}
renderFuncs['obstructions'] = function() {
	var gfx = displayManager.gfxs['obstructions'];
	displayManager.resetCanvas('obstructions');
	displayManager.adjustCanvas('obstructions');
	//TODO optimize!
	if(!level) return;
	for(var i = 0; i < level.width; i++) {
		for(var j = 0; j < level.height; j++) {
			var cell = level.cells[i][j];
			if(!cell || !cell.obstruction) continue;
			
			var img = assets.images.obstructions[cell.obstruction.img];
			var sx = cell.obstruction.health*CELL_SIZE;
			var sy = cell.obstruction.state*CELL_SIZE;
			gfx.drawImage(img, sx, sy, CELL_SIZE, CELL_SIZE, i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
		}
	}
}
renderFuncs['corners'] = function() {
	var gfx = displayManager.gfxs['corners'];
	displayManager.resetCanvas('corners');
	displayManager.adjustCanvas('corners');
	//TODO optimize!
	if(!level) return;
	for(var i = 0; i < level.width; i++) {
		for(var j = 0; j < level.height; j++) {
			var cell = level.cells[i][j];
			if(!cell || !cell.corners) continue;
			
			if(cell.corners.ul){
				var img = assets.images.corners[cell.corners.ul.img];
				var sx = cell.corners.ul.health*WALL_WIDTH;
				var sy = cell.corners.ul.state*WALL_WIDTH;
				gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, i*CELL_SIZE, j*CELL_SIZE, WALL_WIDTH, WALL_WIDTH);
			}
			if(cell.corners.ur){
				var img = assets.images.corners[cell.corners.ur.img];
				var sx = cell.corners.ur.health*WALL_WIDTH;
				var sy = cell.corners.ur.state*WALL_WIDTH;
				gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, i*CELL_SIZE+(CELL_SIZE-WALL_WIDTH), j*CELL_SIZE, WALL_WIDTH, WALL_WIDTH);
			}

			if(cell.corners.ll){
				var img = assets.images.corners[cell.corners.ll.img];
				var sx = cell.corners.ll.health*WALL_WIDTH;
				var sy = cell.corners.ll.state*WALL_WIDTH;
				gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, i*CELL_SIZE, j*CELL_SIZE+(CELL_SIZE-WALL_WIDTH), WALL_WIDTH, WALL_WIDTH);
			}
			if(cell.corners.lr){
				var img = assets.images.corners[cell.corners.lr.img];
				var sx = cell.corners.lr.health*WALL_WIDTH;
				var sy = cell.corners.lr.state*WALL_WIDTH;
				gfx.drawImage(img, sx, sy, WALL_WIDTH, WALL_WIDTH, i*CELL_SIZE+(CELL_SIZE-WALL_WIDTH), j*CELL_SIZE+(CELL_SIZE-WALL_WIDTH), WALL_WIDTH, WALL_WIDTH);
			}


		}
	}
}
renderFuncs['decor'] = function() {
	var gfx = displayManager.gfxs['decor'];
	displayManager.resetCanvas('decor');
}
renderFuncs['bg_entities'] = function() {
	var gfx = displayManager.gfxs['bg_entities'];
	displayManager.resetCanvas('bg_entities');
}
renderFuncs['entities'] = function() {
	var gfx = displayManager.gfxs['entities'];
	displayManager.resetCanvas('entities');
}
renderFuncs['player'] = function() {
	var gfx = displayManager.gfxs['player'];
	displayManager.resetCanvas('player');
}
renderFuncs['bullets'] = function() {
	var gfx = displayManager.gfxs['bullets'];
	displayManager.resetCanvas('bullets');
}
renderFuncs['pickups'] = function() {
	var gfx = displayManager.gfxs['pickups'];
	displayManager.resetCanvas('pickups');
}
renderFuncs['particles1'] = function() {
	var gfx = displayManager.gfxs['particles1'];
	displayManager.resetCanvas('particles1');
}
renderFuncs['particles2'] = function() {
	var gfx = displayManager.gfxs['particles2'];
	displayManager.resetCanvas('particles2');
}
renderFuncs['particles3'] = function() {
	var gfx = displayManager.gfxs['particles3'];
	displayManager.resetCanvas('particles3');
}
renderFuncs['effects'] = function() {
	var gfx = displayManager.gfxs['effects'];
	displayManager.resetCanvas('effects');
}

renderFuncs['debug3'] = function() {
	var gfx = displayManager.gfxs['debug3'];
	displayManager.resetCanvas('debug3');
}
renderFuncs['debug2'] = function() {
	var gfx = displayManager.gfxs['debug2'];
	displayManager.resetCanvas('debug2');
}
renderFuncs['debug1'] = function() {
	var gfx = displayManager.gfxs['debug1'];
	displayManager.resetCanvas('debug1');
}
renderFuncs['input'] = function() {
	var gfx = displayManager.gfxs['input'];
	displayManager.resetCanvas('input');
}
