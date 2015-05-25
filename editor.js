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
EDITOR.ui.render_top = function(gfx) {
	if(this.mouseStart){
		gfx.strokeStyle = "#000";
		gfx.beginPath();
		gfx.moveTo(this.mouseStartX, this.mouseStartY);
		gfx.lineTo(this.mouseEndX, this.mouseEndY);
		gfx.stroke();
	}
	this.top_changed = false;
}
EDITOR.ui.update = function() {
	var mx = INPUT.mouse.X;
	var my = INPUT.mouse.Y;
	this.top_changed = true;
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
				var c = this.contents.checkSelect(x, y);
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

	function Button(){

	}

	EDITOR.ui.menu = new Panel(0, 0, width, 50, null, false);
	EDITOR.ui.toolbox = new Panel(0, 60, 150, 200, 'Toolbox', true);
	EDITOR.ui.assetBrowser = new Panel(width-200, 60, 200, 500, 'Asset Browser', true);
	EDITOR.ui.status = new Panel(0, 570, width, 100, 'Status', true);

	EDITOR.ui.status.contents = {
		checkSelect: function(x, y) {
			return null;
		},
		draw: function(gfx, x, y, w, h) {
			gfx.fillStyle = "#000";
			gfx.textAlign = 'left';
			gfx.textBaseline = 'middle';

			var p = displayManager.screenToGridCoords(INPUT.mouse.X, INPUT.mouse.Y);

			gfx.fillText("Mouse:", x, y+5);
			gfx.fillText("Grid:", x, y+15);

			gfx.fillText("Prefab:", x, y+30);
			gfx.fillText("Grid:", x, y+40);

			gfx.textAlign = 'right';

			gfx.fillText(INPUT.mouse.X + ", " + INPUT.mouse.Y, x + 100, y+5);
			gfx.fillText(p.x + ", " + p.y, x + 100, y+15);

			var prefabName = EDITOR.prefab ? EDITOR.prefab.name : "None";
			var gridPrefabName = "None";
			if(level.cells[p.x][p.y] && level.cells[p.x][p.y].prefab)
				gridPrefabName = level.cells[p.x][p.y].prefab.name;
			gfx.fillText(prefabName, x + 100, y + 30);
			gfx.fillText(gridPrefabName, x + 100, y + 40);

		}
	}

	EDITOR.ui.assetBrowser.contents = {
		checkSelect:function(x, y) {
			return null;
		},
		draw: function(gfx, x, y, w, h) {
			
		}
	}
}

EDITOR._getPrefabListCallback = function(rsp) {
	EDITOR.prefabList = rsp.contents;
	EDITOR.prefabListLoaded = true;
}

//Core functions
EDITOR.onEnter = function(oldstate) { 
	console.log("Begin EDITOR");
	EDITOR.setupUI();
	loadJSON(EDITOR._getPrefabListCallback, PREFAB_LIST_LOCATION);
	//TODO don't do this
	level = new Level('blank', {width:50, height:40});

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

EDITOR.prefab = null;

EDITOR.tools = [];
EDITOR.tools.push({
	name:'Prefab Painter',
	update:function(){
		if(INPUT.mouse.LMB && EDITOR.prefab){
			var p = displayManager.screenToGridCoords(INPUT.mouse.X, INPUT.mouse.Y);
			level.copyToCell(p.x, p.y, EDITOR.prefab);
		}
	}
});