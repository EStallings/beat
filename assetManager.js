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
		this.loadImages();
	}

	this.loadImages = function() {
		var imgAssetList = this.assetList.images;
		assets.images = {};
		for(var t in imgAssetList) {
			assets.images[t] = [];
			var type = imgAssetList[t];
			for(var a in type) {
				this.loadImage(assets.images[t], "images/" + t + "/" + type[a], a);
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
		var img = new Image();
		img.onload = this.imgLoadSucc(list, img, src, name);
		img.onerror = this.imgLoadFail(src);
		img.src = ASSET_LOCATION + src;
	}
}


//Images
