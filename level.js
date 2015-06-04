function Level(method, args) {
	this.width = 10;
	this.height = 10;
	this.changedWallsh = [];
	this.changedWallsv = [];
	this.changedTiles = [];
	this.changedCorners = [];
	this.changedObs = [];

	this.wallsh = []; //horizontal walls
	this.wallsv = []; //vertical walls
	this.tiles = [];
	this.obs = [];
	this.corners = [];


	if(method == 'blank') {
		this.width = args.width;
		this.height = args.height;
		for(var i = 0; i <= this.width; i++) {
			if(i < this.width) this.tiles[i] = [];
			if(i < this.width) this.wallsh[i] = [];
			if(i < this.width) this.obs[i] = [];
			this.corners[i] = [];
			this.wallsv[i] = [];

			for(var j = 0; j <= this.height; j++) {
				if(i < this.width && j < this.height) this.tiles[i][j] = null;
				if(i < this.width && j < this.height) this.obs[i][j] = null;
				if(i < this.width)this.wallsh[i][j] = null;
				this.corners[i][j] = null;
				if(j < this.height) this.wallsv[i][j] = null;
			}
		}
	}
	if(method == 'json_file') {

	}

	this.writeTile = function(x, y, tile){

		if(this.tiles[x][y] && tile.name == this.tiles[x][y].name) return;
		this.tiles[x][y] = Object.create(tile);
		this.changedTiles.push({x:x,y:y});
		if(this.wallsh[x][y])
			this.changedWallsh.push({x:x,y:y});
		if(this.wallsh[x][y+1])
			this.changedWallsh.push({x:x,y:y+1});
		if(this.wallsv[x][y])
			this.changedWallsv.push({x:x,y:y});
		if(this.wallsv[x+1][y])
			this.changedWallsv.push({x:x+1,y:y});
	}
	this.writeWallH = function(x, y, wall){
		if(this.wallsh[x][y] && wall.name == this.wallsh[x][y].name) return;
		this.wallsh[x][y] = wall;
		this.changedWallsh.push({x:x,y:y});
	}
	this.writeWallV = function(x, y, wall){
		if(this.wallsv[x][y] && wall.name == this.wallsv[x][y].name) return;
		this.wallsv[x][y] = wall;
		this.changedWallsv.push({x:x,y:y});
	}
	this.writeObs = function(x, y, obs){
		this.obs[x][y] = obs;
		this.changedObs.push({x:x,y:y});
	}
	this.writeCorner = function(x, y, corner){
		this.corners[x][y] = corner;
		this.changedCorners.push({x:x,y:y});
	}

}
