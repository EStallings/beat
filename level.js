function Level(method, args) {
	this.width = 10;
	this.height = 10;

	if(method == 'blank') {
		this.width = args.width;
		this.height = args.height;
		this.cells = [];
		for(var i = 0; i < this.width; i++) {
			this.cells[i] = [];
			for(var j = 0; j < this.height; j++) {
				this.cells[i][j] = null;
			}
		}
	}
	if(method == 'json_file') {

	}

	this.copyToCell = function(x, y, prefab) {
		if(this.cells[x][y] && this.cells[x][y].prefab && this.cells[x][y].prefab.name == prefab.name) return;
		this.cells[x][y] = new Cell(prefab);
	}
}

function Cell(prefab) {
	this.tile = null;
	this.walls = {};
	this.corners = {};
	this.obstruction = null;
	this.prefab = null;

	if(prefab) {
		this.prefab = prefab;
		if(prefab.tile)
			this.tile = new CellProperty(prefab.tile);
		if(prefab.obstruction)
			this.obstruction = new CellProperty(prefab.obstruction);
		if(prefab.walls)
			for(var i in prefab.walls)
				this.walls[i] = new CellProperty(prefab.walls[i]);
		if(prefab.corners)
			for(var i in prefab.corners)
				this.corners[i] = new CellProperty(prefab.corners[i]);	
	}
}

function CellProperty(proto) {
	this.img = proto.img;
	this.health = proto.health;
	this.state = proto.state;
	this.walkable = proto.walkable;
	this.destroyable = proto.destroyable; //if health reaches 0, will be deleted.
	this.decals = [];
	for(var i in proto.decals){
		this.decals.push(proto.decals[i]); //a list of strings
	}
}