
renderFuncs = {};
renderFuncs['background'] = function() {
	var surface = displayManager.surfaces['background'];

}

renderFuncs['tiles'] = function() {
	var surface = displayManager.surfaces['tiles'];
	var gfx = surface.gfx;
	var masterGfx = surface.masterGfx;

	surface.adjust();
	
	if(!level){
		surface.reset();
		return;
	}

	if(level.changedTiles.length >  0) {
		for(var el in level.changedTiles){
			var i = level.changedTiles[el].x;
			var j = level.changedTiles[el].y;
			var tile = level.tiles[i][j];
			if(!tile) {
				masterGfx.clearRect(x,  y, CELL_SIZE, CELL_SIZE);
				// masterGfx.fillStyle = masterGfx.strokeStyle = "#000";
				// masterGfx.font = '12px Arial';
				// masterGfx.fillText("Blank", x, y + CELL_SIZE/2);
				// masterGfx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
			}
			else{
				var img = tile.img;
				var sx = tile.health*CELL_SIZE;
				var sy = tile.state*CELL_SIZE;
				masterGfx.drawImage(img, sx, sy, CELL_SIZE, CELL_SIZE, i*CELL_SIZE, j*CELL_SIZE, CELL_SIZE, CELL_SIZE);
			}
		}
		level.changedTiles = [];
	}
	else if(displayManager.dx == 0 && displayManager.dy == 0) return;
	// var data = masterGfx.getImageData(-displayManager.offsetX,-displayManager.offsetY,screenWidth,screenHeight);
	// gfx.putImageData(data, 0, 0);
	gfx.drawImage(surface.masterCanvas, -displayManager.offsetX, -displayManager.offsetY, screenWidth, screenHeight, 0, 0, screenWidth, screenHeight);

}

renderFuncs['walls'] = function() {
	var surface = displayManager.surfaces['walls'];
	var gfx = surface.gfx;
	var masterGfx = surface.masterGfx;

	surface.adjust();
	
	if(!level){
		surface.reset();
		return;
	}

	if(level.changedWallsh.length > 0) {
		for(var el in level.changedWallsh) {
			var i = level.changedWallsh[el].x;
			var j = level.changedWallsh[el].y;
			var wallh = level.wallsh[i][j];
			var img = wallh.img;
			var sx = wallh.health*WALL_LENGTH;
			var sy = wallh.state*WALL_WIDTH;
			masterGfx.drawImage(img, sx, sy, WALL_LENGTH, WALL_WIDTH, i*CELL_SIZE, j*CELL_SIZE, WALL_LENGTH, WALL_WIDTH);
		}
		level.changedWallsh = [];
	}
	if(level.changedWallsv.length > 0) {
		masterGfx.rotate(Math.PI/2);
		for(var el in level.changedWallsv) {
			var i = level.changedWallsv[el].x;
			var j = level.changedWallsv[el].y;
			var wallv = level.wallsv[i][j];
			var img = wallv.img;
			var sx = wallv.health*WALL_LENGTH;
			var sy = wallv.state*WALL_WIDTH;
			masterGfx.drawImage(img, sx, sy, WALL_LENGTH, WALL_WIDTH, j*CELL_SIZE, -(i*CELL_SIZE)-WALL_WIDTH, WALL_LENGTH, WALL_WIDTH);
		}
		level.changedWallsv = [];
		masterGfx.rotate(-Math.PI/2);
	}
	else if(displayManager.dx == 0 && displayManager.dy == 0) return;
	var data = masterGfx.getImageData(-displayManager.offsetX,-displayManager.offsetY,screenWidth,screenHeight);
	gfx.putImageData(data, 0, 0);
}


renderFuncs['obstructions'] = function() {
	// displayManager.adjustCanvas('obstructions');
	// if(!level) {
	// 	displayManager.resetCanvas('obstructions');
	// 	return;
	// }
	// if(level.changedObs.length < 1) return;
	// displayManager.resetCanvas('obstructions');
	// var surface = displayManager.surfaces['obstructions'];
	// for(var el in level.changedWalls) {
	// 	var i = level.changedWalls[el].x;
	// 	var j = level.changedWalls[el].y;
	// 	var cell = level.cells[i][j];
	// 	if(!cell || !cell.obstruction) continue;
	// 	displayManager.drawObs(gfx, cell.obstruction, i*CELL_SIZE, j*CELL_SIZE);
	// }
}

renderFuncs['corners'] = function() {
	// displayManager.adjustCanvas('corners');
	// if(!level) {
	// 	displayManager.resetCanvas('corners');
	// 	return;
	// }
	// if(level.changedCorners.length < 1) return;
	// displayManager.resetCanvas('corners');
	// var surface = displayManager.surfaces['corners'];
	// for(var el in level.changedWalls) {
	// 	var i = level.changedWalls[el].x;
	// 	var j = level.changedWalls[el].y;
	// 	var cell = level.cells[i][j];
	// 	if(!cell || !cell.corners) continue;
		
	// 	displayManager.drawCorners(gfx, cell.corners, i*CELL_SIZE, j*CELL_SIZE);
	// }
}
renderFuncs['decor'] = function() {
	// var surface = displayManager.surfaces['decor'];
	// surface.reset();
}
renderFuncs['bg_entities'] = function() {
	// var surface = displayManager.surfaces['bg_entities'];
	// surface.reset();
}
renderFuncs['entities'] = function() {
	// var surface = displayManager.surfaces['entities'];
	// surface.reset();
}
renderFuncs['player'] = function() {
	// var surface = displayManager.surfaces['player'];
	// surface.reset();
}
renderFuncs['bullets'] = function() {
	// var surface = displayManager.surfaces['bullets'];
	// surface.reset();
}
renderFuncs['pickups'] = function() {
	// var surface = displayManager.surfaces['pickups'];
	// surface.reset();
}
renderFuncs['particles1'] = function() {
	// var surface = displayManager.surfaces['particles1'];
	// surface.reset();
}
renderFuncs['particles2'] = function() {
	// var surface = displayManager.surfaces['particles2'];
	// surface.reset();
}
renderFuncs['particles3'] = function() {
	// var surface = displayManager.surfaces['particles3'];
	// surface.reset();
}
renderFuncs['effects'] = function() {
	// var surface = displayManager.surfaces['effects'];
	// surface.reset();
}

renderFuncs['debug3'] = function() {
	// var surface = displayManager.surfaces['debug3'];
	// surface.reset();
}
renderFuncs['debug2'] = function() {
	// var surface = displayManager.surfaces['debug2'];
	// surface.reset();
}
renderFuncs['debug1'] = function() {
	// var surface = displayManager.surfaces['debug1'];
	// surface.reset();
}

