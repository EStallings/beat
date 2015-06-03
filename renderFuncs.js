renderFuncs = {};
renderFuncs['background'] = function() {
	var surface = displayManager.surfaces['background'];

}

renderFuncs['tiles'] = function() {
	var surface = displayManager.surfaces['tiles'];
	// var data = gfx.getImageData(0,0,width,height);
	// displayManager.adjustCanvas('tiles');
	
	// if(!level){
	// 	displayManager.resetCanvas('tiles');
	// 	return;
	// }

	// gfx.putImageData(data, displayManager.dx, displayManager.dy);
	// if(level.changedTiles.length >  1) {
	// 	for(var el in level.changedTiles){
	// 		var i = level.changedTiles[el].x;
	// 		var j = level.changedTiles[el].y;
	// 		var cell = level.cells[i][j];
	// 		displayManager.drawTile(gfx, cell, i*CELL_SIZE, j*CELL_SIZE);
	// 	}
	// 	level.changedTiles = [];
	// }

}

renderFuncs['walls'] = function() {
	// displayManager.adjustCanvas('walls');
	// if(!level) {
	// 	displayManager.resetCanvas('walls');
	// 	return;
	// }
	// if(level.changedWalls.length < 1) return;
	// displayManager.resetCanvas('walls');
	// var surface = displayManager.surfaces['walls'];
	// for(var el in level.changedWalls) {
	// 	var i = level.changedWalls[el].x;
	// 	var j = level.changedWalls[el].y;
	// 	var cell = level.cells[i][j];
	// 	if(!cell || !cell.walls) continue;
	// 	displayManager.drawHorizWalls(gfx, cell.walls, i*CELL_SIZE, j*CELL_SIZE);
	// }
	// gfx.rotate(Math.PI/2);
	// for(var el in level.changedWalls) {
	// 	var i = level.changedWalls[el].x;
	// 	var j = level.changedWalls[el].y;
	// 	var cell = level.cells[i][j];
	// 	if(!cell || !cell.walls) continue;
	// 	displayManager.drawVertWalls(gfx, cell.walls, i*CELL_SIZE, j*CELL_SIZE);
	// }
	// gfx.rotate(-Math.PI/2);

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
	var surface = displayManager.surfaces['player'];
	surface.reset();
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
	var surface = displayManager.surfaces['debug3'];
	surface.reset();
}
renderFuncs['debug2'] = function() {
	var surface = displayManager.surfaces['debug2'];
	surface.reset();
}
renderFuncs['debug1'] = function() {
	var surface = displayManager.surfaces['debug1'];
	surface.reset();
}
renderFuncs['input'] = function() {
	var surface = displayManager.surfaces['input'];
	surface.reset();
}
