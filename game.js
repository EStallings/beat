STATES = {
	INITIALIZING: { //Reloads EVERYTHING.
		id:0, 
		onEnter:function(oldstate){ //Start all asset loading etc...
			if(oldstate) console.log("resetting");
			if(displayManager) displayManager.cleanUp();
			console.log("Begin INITIALIZING");
			displayManager = new DisplayManager();
			assetManager = new AssetManager();
			assetManager.loadAssets();
		},
		onExit:function(newstate){ //Probably don't need anything. Cosmetics?
			console.log("End INITIALIZING");
		},
		update:function(dt){ //Check for end of asset loading, cosmetic changes?
			console.log("INITIALIZING");
			if(assetManager.checkAssets()){
				// switchState(STATES.MENU);
				switchState(STATES.EDITOR); //Temporary
			}
		}
	},
	LOADING: { //Loading between levels, or for database ops. Any loading besides initialization
		//This state should probably be reworked to be used during state transitions...
		id:1, 
		onEnter:function(oldstate){ //Determine new state to load
			console.log("Begin LOADING");
		},
		onExit:function(newstate){
			console.log("End LOADING");
		},
		update:function(dt){ //Check for end of loading

		}
	},
	SAVING: { //Saving stuff to database, or possibly just exporting JSON for the level editor
		id:2, 
		onEnter:function(oldstate){
			console.log("Begin SAVING");
		},
		onExit:function(newstate){ //Determine if saving was successful or not?
			console.log("End SAVING");
		},
		update:function(dt){

		}
	},
	MENU: { //Main menus. Game is not in progress on these, or at least not controllable
		id:3, 
		onEnter:function(oldstate){
			console.log("Begin MENU");
		},
		onExit:function(newstate){ //Clean up
			console.log("End MENU");
		},
		update:function(dt){

		}
	},
	GAME: { //The actual game state
		id:4, 
		onEnter:function(oldstate){ //Game initialization? This should probably happen in LOADING
			console.log("Begin GAME");
		},
		onExit:function(newstate){ //Clean up, unless just pausing
			console.log("End GAME");
		},
		update:function(dt){ //Main game update

		}
	},
	PAUSED: { //Game is paused; may have pause menus here
		id:5, 
		onEnter:function(oldstate){ 
			console.log("Begin PAUSED")
		},
		onExit:function(newstate){
			console.log("End PAUSED")
		},
		update:function(dt){ 

		}
	},
	EDITOR: EDITOR
}

var now;
var dt = 0;
var last = timestamp();
var step = 1/60;
var time_in_state = timestamp();

function switchState(newstate) {
	if(state)
		state.onExit(newstate);
	var oldstate = state;
	state = newstate;
	state.onEnter(oldstate);
}

function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function frame() { //Fixed timesetp
	now = timestamp();
	dt = dt + Math.min(1, (now - last) / 1000);
	while(dt > step) {
		dt = dt - step;
		state.update(step);
		INPUT.update(step);
	}
	displayManager.redraw();
	last = now;
	requestAnimationFrame(frame);
}