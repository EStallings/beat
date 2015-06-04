function AssetManager() {
	this.assetList = {};
	this.assetListLoaded = false;
	this.assets = {};

	this.assetTracker = {};

	this.checkAssets = function(){
		if(!this.assetListLoaded) return false;
		for(var i in this.assetTracker) {
			if(!this.assetTracker[i]) return false;
		}
		return true;
	}

	var that = this;
	this.getAssetList = function() {
		loadJSON(this._getAssetListCallback, ASSET_LIST_LOCATION);
	}

	this._getAssetListCallback = function(rsp) {
		that.assetList = rsp.contents;
		that.assetListLoaded = true;
		that.loadAssets();
	}

	this.loadAssets = function() {
		if(!this.assetListLoaded) {
			this.getAssetList();
			return;
		}
		assets = {};
		this.loadWorldAssets();
	}

	this.loadWorldAssets = function() {
		var worldAssetList = this.assetList.world;
		assets.world = this.assetList.world;
		for(var t in worldAssetList) {
			var type = worldAssetList[t];
			for(var a in type) {
				this.loadImage(type[a], "images/" + t + "/" + type[a].src, 'img');
			}
		}
	}

	this.imgLoadSucc = function(list, img, src, name) {
		return function(){
			console.log(img);
			list[name] = img;
			that.assetTracker[src] = true;
		}
	}

	this.imgLoadFail = function(src, name) {
		return function(){
			console.log(src);
		}
	}

	this.loadImage = function(list, src, name){
		this.assetTracker[src] = false;
		console.log(list);
		var img = new Image();
		img.onload = this.imgLoadSucc(list, img, src, name);
		img.onerror = this.imgLoadFail(src);
		img.src = ASSET_LOCATION + src;
	}
}


//Images
