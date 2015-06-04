//Globally required state:
EDITOR = {}
EDITOR.id = 5;
EDITOR.lastmx = NaN;
EDITOR.lastmy = NaN;
EDITOR.level = null;


//Editor-specific:
EDITOR.switchTool = function(tool){
	EDITOR.tool = tool;
}

EDITOR.ui = {};
EDITOR.ui.panels = [];
EDITOR.ui.innerPanels = [];

EDITOR.ui.mouseStart = false;
EDITOR.ui.mouseStartX = null;
EDITOR.ui.mouseStartY = null;
EDITOR.ui.mouseEndX = null;
EDITOR.ui.mouseEndY = null;

EDITOR.ui.dragging = null;

EDITOR.ui.bg_changed = false;
EDITOR.ui.m_changed = false;
EDITOR.ui.p_changed = false;
EDITOR.ui.top_changed = false;
EDITOR.ui.render_bg = function(gfx) {
	for(var p in this.panels) {
		this.panels[p].draw(gfx);
	}
	this.bg_changed = false;
}
EDITOR.ui.render_m = function(gfx) {
	for(var p in this.panels) {
		this.panels[p].drawContents(gfx);
	}
}
EDITOR.ui.render_p = function(gfx) {

	this.p_changed = false;
}
EDITOR.ui.detection = {};
EDITOR.ui.render_top = function(gfx) {
	if(this.mouseStart){
		gfx.strokeStyle = "#000";
		gfx.beginPath();
		gfx.moveTo(this.mouseStartX, this.mouseStartY);
		gfx.lineTo(this.mouseEndX, this.mouseEndY);
		gfx.stroke();
	}
	gridCoords = displayManager.screenToGridCoordsWithDiff(INPUT.mouse.X, INPUT.mouse.Y);
	this.detection = gridCoords;
	switch(this.levelAssetBrowser.contents.view){
		case 'tiles':
			gfx.fillStyle = 'rgba(0,0,0,0.5)';
			gfx.fillRect(gridCoords.x * CELL_SIZE, gridCoords.y * CELL_SIZE, 32, 32);
			gfx.fillStyle = "#000";
			gfx.fillText(gridCoords.x + ", " + gridCoords.y, INPUT.mouse.X, INPUT.mouse.Y);
			gfx.fillStyle = "#f00";
			gfx.fillText(gridCoords.dx + ", " + gridCoords.dy, INPUT.mouse.X, INPUT.mouse.Y+CELL_SIZE);

		break;
		case 'walls':
			gfx.fillStyle = 'rgba(0,0,0,0.5)';
			gfx.fillRect(gridCoords.x * CELL_SIZE, gridCoords.y * CELL_SIZE, 32, 32);
			gfx.fillStyle = 'rgba(0,0,255,0.5)';
			var a = Math.atan2(gridCoords.dy, gridCoords.dx);
			// console.log(a);
			if(Math.sin(a) > 0.5){
				this.detection.top = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE-2, gridCoords.y * CELL_SIZE-2, 36, 4);
			}
			if(Math.sin(a) < -0.5){
				this.detection.bottom = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE-2, gridCoords.y * CELL_SIZE + CELL_SIZE-2, 36, 4);
			}
			if(Math.cos(a) > 0.5){
				this.detection.left = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE-2, gridCoords.y * CELL_SIZE-2, 4, 36);
			}
			if(Math.cos(a) < -0.5){
				this.detection.right = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE + CELL_SIZE-2, gridCoords.y * CELL_SIZE-2, 4, 36);
			}

			gfx.fillStyle = "#000";
			gfx.fillText(gridCoords.x + ", " + gridCoords.y, INPUT.mouse.X, INPUT.mouse.Y);
			gfx.fillStyle = "#f00";
			gfx.fillText(gridCoords.dx + ", " + gridCoords.dy, INPUT.mouse.X, INPUT.mouse.Y+CELL_SIZE);
		break;
		case 'obstructions':
			gfx.fillStyle = 'rgba(0,0,0,0.5)';
			gfx.fillRect(gridCoords.x * CELL_SIZE, gridCoords.y * CELL_SIZE, 32, 32);
			gfx.fillStyle = "#000";
			gfx.fillText(gridCoords.x + ", " + gridCoords.y, INPUT.mouse.X, INPUT.mouse.Y);
			gfx.fillStyle = "#f00";
			gfx.fillText(gridCoords.dx + ", " + gridCoords.dy, INPUT.mouse.X, INPUT.mouse.Y+CELL_SIZE);
		break;
		case 'corners':
			// gfx.fillStyle = 'rgba(0,0,0,0.5)';
			// gfx.fillRect(gridCoords.x * CELL_SIZE, gridCoords.y * CELL_SIZE, 32, 32);
			gfx.fillStyle = 'rgba(0,0,255,0.5)';
			var a = Math.atan2(gridCoords.dy, gridCoords.dx);
			console.log(a);
			if(Math.sin(a) > 0.1 && Math.cos(a) < -0.1){
				this.detection.ur = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE + CELL_SIZE-2, gridCoords.y * CELL_SIZE-2, 4, 4);
			}
			if(Math.sin(a) < -0.1 && Math.cos(a) < -0.1){
				this.detection.lr = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE + CELL_SIZE-2, gridCoords.y * CELL_SIZE + CELL_SIZE-2, 4, 4);
			}
			if(Math.sin(a) > 0.1 && Math.cos(a) > 0.1){
				this.detection.ul = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE-2, gridCoords.y * CELL_SIZE-2, 4, 4);
			}
			if(Math.sin(a) < -0.1 && Math.cos(a) > 0.1){
				this.detection.ll = true;
				gfx.fillRect(gridCoords.x * CELL_SIZE-2, gridCoords.y * CELL_SIZE + CELL_SIZE-2, 4, 4);
			}

			gfx.fillStyle = "#000";
			gfx.fillText(gridCoords.x + ", " + gridCoords.y, INPUT.mouse.X, INPUT.mouse.Y);
			gfx.fillStyle = "#f00";
			gfx.fillText(gridCoords.dx + ", " + gridCoords.dy, INPUT.mouse.X, INPUT.mouse.Y+CELL_SIZE);
		break;
	}
	this.top_changed = false;
}
EDITOR.ui.update = function() {
	var mx = INPUT.mouse.X;
	var my = INPUT.mouse.Y;
	this.top_changed = true;
	this.m_changed = true;
	this.hitUI = false;
	if(INPUT.mouse.LMB){
		if(!this.mouseStart){
			this.mouseStartX = mx;
			this.mouseStartY = my;
			this.mouseStart = true;
			for(var i in this.panels) {
				var c = this.panels[i].checkSelect(mx, my);
				if(c) {
					this.activeElement = c;
				}
			} 
		}
		this.mouseEndX = mx;
		this.mouseEndY = my;
		if(this.activeElement){
			this.hitUI = true;
			this.activeElement.update(this.mouseEndX-this.mouseStartX, this.mouseEndY-this.mouseStartY);
			this.bg_changed = true;
		}
	}
	else{
		this.mouseStart = false;
		if(this.activeElement){
			this.hitUI = true;
			this.activeElement.released();
		}
		this.activeElement = null;
	}

	//Asset Browser
	if(INPUT.keys.PGUP) {
		EDITOR.ui.levelAssetBrowser.contents.fromTop -= 3;
	}
	if(INPUT.keys.PGDOWN) {
		EDITOR.ui.levelAssetBrowser.contents.fromTop += 3;
	}
	if(INPUT.keys['1']) {
		EDITOR.ui.levelAssetBrowser.contents.view = 'tiles';
	}
	if(INPUT.keys['2']) {
		EDITOR.ui.levelAssetBrowser.contents.view = 'walls';
	}
	if(INPUT.keys['3']) {
		EDITOR.ui.levelAssetBrowser.contents.view = 'obstructions';
	}
	if(INPUT.keys['4']) {
		EDITOR.ui.levelAssetBrowser.contents.view = 'corners';
	}

	//Tools
	if(INPUT.keys.Q) {
		EDITOR.tool = EDITOR.tools[0];
	}
	if(INPUT.keys.W) {
		EDITOR.tool = EDITOR.tools[1];
	}
	if(INPUT.keys.E) {
		EDITOR.tool = EDITOR.tools[2];
	}
	if(INPUT.keys.R) {
		EDITOR.tool = EDITOR.tools[3];
	}
	if(INPUT.keys.T) {
		EDITOR.tool = EDITOR.tools[4];
	}
}


EDITOR.ui.init = false;
EDITOR.setupUI = function(){
	EDITOR.ui.bg_changed = true;
	EDITOR.ui.m_changed = true;
	EDITOR.ui.p_changed = true;
	EDITOR.ui.top_changed = true;
	if(EDITOR.ui.init) return;

	function Panel(x, y, w, h, title, movable){
		this.x = x; this.y = y; this.w = w; this.h = h; this.title = title;
		this.startx = x; this.starty = y; this.startw = w; this.starth = h;
		this.movable = movable;
		this.contents = null
		EDITOR.ui.panels.push(this);
		this.checkSelect = function(x, y){
			if(this.contents){
				var c;
				if(this.title){
					c = this.contents.checkSelect(x, y, this.x+5, this.y+30, this.w-10, this.h-35);
				}
				else {
					c = this.contents.checkSelect(x, y, this.x+5, this.y+5, this.w-10, this.h-10);
				}
				
				if(c) return c;
			}
			if(!this.movable) return null;
			if(hpora(x, y, this.x+5, this.y+5, this.w-10, 20)){
				this.dragMode = 'drag';
				return this;
			}
			else{
				this.dragMode = [];
				var flag = false;
				if(hpora(x,y,this.x,this.y,5,this.h)){
					this.dragMode.push('resize_l');
					flag = true;
				}
				if(hpora(x,y,this.x+this.w-5,this.y,5,this.h)){
					this.dragMode.push('resize_r');
					flag = true;
				}
				if(hpora(x,y,this.x,this.y,this.w,5)){
					this.dragMode.push('resize_t');
					flag = true;
				}
				if(hpora(x,y,this.x,this.y+this.h-5,this.w,5)){
					this.dragMode.push('resize_b');
					flag = true;
				}
			}
			return flag ? this : null;
		}
		this.update = function(dx, dy){
			if(!this.movable) return;
			if(this.dragMode == 'drag'){
				this.x = this.startx + dx;
				this.y = this.starty + dy;
			}
			else if(contains(this.dragMode, 'resize_l')){
				this.x = this.startx + dx;
				this.w = this.startw - dx;
			}
			else if(contains(this.dragMode, 'resize_r')){
				this.w = this.startw + dx;
			}
			else if(contains(this.dragMode, 'resize_t')){
				this.y = this.starty + dy;
				this.h = this.starth - dy;
			}
			else if(contains(this.dragMode, 'resize_b')){
				this.h = this.starth + dy;
			}
		}
		this.released = function() {
			if(!this.movable) return;
			this.startx = this.x;
			this.starty = this.y;
			this.startw = this.w;
			this.starth = this.h;
		}
		this.draw = function(gfx) {
			gfx.fillStyle = '#ccc';
			gfx.fillRect(this.x, this.y, this.w, this.h);
			if(this.title){
				gfx.fillStyle = "#eef";
				gfx.fillRect(this.x+5, this.y+5, this.w-10, 20);
				gfx.fillStyle = "#000";
				gfx.font = "14px Arial";
				var tw = gfx.measureText(this.title).width;
				gfx.fillText(this.title, this.x + this.w/2 - tw/2, this.y + 20);
				gfx.fillStyle = "#eee";
				gfx.fillRect(this.x+5, this.y+30, this.w-10, this.h-35);
			}
			else {
				gfx.fillStyle = "#eee";
				gfx.fillRect(this.x+5, this.y+5, this.w-10, this.h-10);
			}
			
		}

		this.drawContents = function(gfx) {
			if(this.contents){
				if(this.title){
					this.contents.draw(gfx, this.x+5, this.y+30, this.w-10, this.h-35);
				}
				else {
					this.contents.draw(gfx, this.x+5, this.y+5, this.w-10, this.h-10);
				}
			}
		}
	}

	EDITOR.ui.menu = new Panel(0, 0, screenWidth, 50, null, false);
	EDITOR.ui.toolbox = new Panel(0, 60, 150, 200, 'Toolbox', true);
	EDITOR.ui.levelAssetBrowser = new Panel(screenWidth-200, 60, 200, 500, 'Asset Browser', true);
	EDITOR.ui.status = new Panel(0, 570, screenWidth, 100, 'Status', true);

	EDITOR.ui.status.contents = {
		checkSelect: function(a, b, x, y, w, h) {
			return null;
		},
		draw: function(gfx, x, y, w, h) {
			gfx.fillStyle = "#000";
			gfx.textAlign = 'left';
			gfx.textBaseline = 'middle';
			gfx.font = '12px Arial';

			var p = displayManager.screenToGridCoords(INPUT.mouse.X, INPUT.mouse.Y);

			gfx.fillText("Mouse:", x, y+5);
			gfx.fillText("Grid:", x, y+15);

			gfx.fillText("Wall:", x, y+30);
			gfx.fillText("Tile:", x, y+40);

			gfx.textAlign = 'right';

			gfx.fillText(INPUT.mouse.X + ", " + INPUT.mouse.Y, x + 100, y+5);
			gfx.fillText(p.x + ", " + p.y, x + 100, y+15);
		}
	}

	EDITOR.ui.levelAssetBrowser.contents = {
		fromTop:0,
		selected:0,
		view: 'tiles',
		checkSelect:function(a, b, x, y, w, h) {
			var k = 0;
			var top = y - this.fromTop;
			for(var i in assets.world[this.view]) {
				if(hpora(a, b, x, top+k*50, w, 50)){
					this.selected = k;
					EDITOR.selectedLevelAsset[this.view] = assets.world[this.view][i];
					return this;
				}
				k++;
			}
			return null;
		},
		draw: function(gfx, x, y, w, h) {
			var top = y - this.fromTop;
			gfx.textAlign = 'left';
			gfx.textBaseline = 'top';
			var k = 0;
			for(var i in assets.world[this.view]) {
				var p = assets.world[this.view][i].img;
				gfx.font = "bold 20px Arial";
				if(assets.world[this.view][i] == EDITOR.selectedLevelAsset[this.view]){
					gfx.fillStyle = "#666";
					gfx.fillRect(x, top+k*50, w, 50);
				}
				gfx.fillStyle = "#000";
				gfx.fillText(i, x, top+k*50);
				gfx.drawImage(p, 0, 0, CELL_SIZE, CELL_SIZE, x+w-32, top+k*50, CELL_SIZE, CELL_SIZE);
				k++;
			}

			gfx.clearRect(x, 0, w, y);
		},
		update: function(dx, dy) {
		},
		released: function() {
		}
	}
}


//Core functions
EDITOR.onEnter = function(oldstate) { 
	console.log("Begin EDITOR");
	EDITOR.setupUI();

	//TODO don't do this
	level = new Level('blank', {width:512, height:512});

}

EDITOR.onExit = function(newstate) {
	console.log("End EDITOR");
}

EDITOR.dragging = false;
EDITOR.dragX = null;
EDITOR.dragY = null;
EDITOR.offsetX = null;
EDITOR.offsetY = null;
EDITOR.update = function(dt) { 
	this.ui.update();
	if(!this.ui.hitUI) {
		var changed = false;
		if(INPUT.mouse.SCROLL > 0) {
			displayManager.scale -= 0.1;
			changed = true;
		}
		else if(INPUT.mouse.SCROLL < 0) {
			displayManager.scale += 0.1;
			changed = true;
		}
		if(INPUT.mouse.RMB) {
			if(!this.dragging) {
				this.dragging = true;
				this.dragX = INPUT.mouse.X;
				this.dragY = INPUT.mouse.Y;
				this.offsetX = displayManager.offsetX;
				this.offsetY = displayManager.offsetY;
			}
			else {
				displayManager.offsetX = this.offsetX + (INPUT.mouse.X - this.dragX);
				displayManager.offsetY = this.offsetY + (INPUT.mouse.Y - this.dragY);
			}
			changed = true;
		}
		else if(this.dragging) {
			this.dragging = false;
			this.dragX = null;
			this.dragY = null;
			this.offsetX = null;
			this.offsetY = null;
			changed = true;
		}
		if(!changed && this.tool) {
			this.tool.update();
		}
	}
}

EDITOR.selectedLevelAsset = {tiles:null, walls:null, obstructions:null, corners:null};

EDITOR.tools = [];
EDITOR.tools.push({
	name:'Pencil',
	update:function(){
		var view = EDITOR.ui.levelAssetBrowser.contents.view;
		if(INPUT.mouse.LMB && EDITOR.selectedLevelAsset[view]){
			var p = EDITOR.ui.detection;
			if(p.x < 0 || p.x >= level.width || p.y < 0 || p.y >= level.height) return;
			switch(view){
				case 'tiles':
					level.writeTile(p.x, p.y, EDITOR.selectedLevelAsset.tiles);
				break;
				case 'walls':
					if(p.top) {
						level.writeWallH(p.x, p.y, EDITOR.selectedLevelAsset.walls);
					}
					if(p.bottom) {
						level.writeWallH(p.x, p.y+1, EDITOR.selectedLevelAsset.walls);
					}
					if(p.left) {
						level.writeWallV(p.x, p.y, EDITOR.selectedLevelAsset.walls);
					}
					if(p.right) {
						level.writeWallV(p.x+1, p.y, EDITOR.selectedLevelAsset.walls);
					}
				break;
				case 'obstructions':
				break;
				case 'corners':
				break;
			} 
		}
	}
})
// EDITOR.tools.push({
// 	name:'Prefab Painter',
// 	update:function(){
// 		if(INPUT.mouse.LMB && EDITOR.prefab){
// 			var p = displayManager.screenToGridCoords(INPUT.mouse.X, INPUT.mouse.Y);
// 			if(p.x < 0 || p.x >= level.width || p.y < 0 || p.y >= level.height) return;
// 			level.copyToCell(p.x, p.y, EDITOR.prefab);
// 		}
// 	}
// });
// EDITOR.tools.push({
// 	name:'Prefab Floodfill',
// 	update:function(){
// 		if(INPUT.mouse.LMB && EDITOR.prefab){
// 			var p = displayManager.screenToGridCoords(INPUT.mouse.X, INPUT.mouse.Y);
// 			if(p.x < 0 || p.x >= level.width || p.y < 0 || p.y >= level.height) return;
// 			var cell = level.cells[p.x][p.y];
// 			var name;
// 			if(!cell || !cell.prefab) name = '';
// 			else if(cell.prefab.name == EDITOR.prefab.name) return;
// 			else name = cell.prefab.name;

// 			var stack = [p];
// 			var explored = [];
// 			var n = 0;
// 			while(stack.length > 0 && n < 102) {
// 				var pt = stack.shift();
// 				var x = pt.x;
// 				var y = pt.y;
// 				n++;
// 				level.copyToCell(x, y, EDITOR.prefab);

// 				var test = [];
// 				if(x > 0) test.push({x:x-1, y:y});
// 				if(x < level.width-1) test.push({x:x+1, y:y});
// 				if(y > 0) test.push({x:x, y:y-1});
// 				if(y < level.height-1) test.push({x:x, y:y+1});

// 				for(var i in test) {
// 					var nx = test[i].x;
// 					var ny = test[i].y;
// 					if(!explored[nx] || !explored[nx][ny]){
// 						if(name == ''){
// 							if(!level.cells[nx][ny] || !level.cells[nx][ny].prefab)
// 								stack.push(test[i]);
// 						}
// 						else if(level.cells[nx][ny].prefab.name == name)
// 							stack.push(test[i]);
// 					}
// 				}
// 			}
// 			console.log("Done");
// 		}

// 	}
// });
// EDITOR.tools.push({
// 	name:'Prefab Eyedropper',
// 	update:function(){
// 		if(INPUT.mouse.LMB){
// 			var p = displayManager.screenToGridCoords(INPUT.mouse.X, INPUT.mouse.Y);
// 			var cell = level.cells[p.x][p.y]
// 			if(!cell || !cell.prefab) return;
// 			EDITOR.prefab = cell.prefab;
// 		}
// 	}
// });

EDITOR.tool = EDITOR.tools[0];