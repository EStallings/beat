ASSET_LIST_LOCATION = 'assets/data/assets.json';
ASSET_LOCATION = 'assets/';

PREFAB_LIST_LOCATION = 'assets/data/prefabs.json';

WALL_WIDTH = 4;
WALL_LENGTH = 32;
CELL_SIZE = 32;
CORNER_SIZE = 4;

assets = {};
displayManager = null;
assetManager = null;
state = null;
level = null;

window.onload = function(){
	switchState(STATES.INITIALIZING);
	requestAnimationFrame(frame);
};

