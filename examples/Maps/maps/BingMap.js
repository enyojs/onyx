/**
A map control which is a wrapper around Bing map control.

To initialize a Map control:

	{name: "map", kind: "BingMap", credentials: "my_bing_app_id"}
	
You can get a handle to the actual Bing map control uisng hasMap(), like this:

	var bingMap = this.$.map.hasMap();
	
*/
enyo.kind({
	name: "enyo.BingMap",
	classes: "enyo-bingmap",
	published: {
		/**
		  The latitude of the location.
		 */
		latitude: 37.029043436050415,
		/**
		  The longitde of the location.
		 */
		longitude: -101.55550763010979,
		/**
		  The zoom level of the map view.
		 */
		zoom: 4,
		/**
		  Show a pin at the center of the current map view.
		 */
		showPin: false,
		/**
		  The map type of the map view.  Valid map types are aerial, auto, birdseye, collinsBart, mercator, ordnanceSurvey and road.
		 */
		mapType: "road",
		/**
		  The Bing Maps Key used to authenticate the application.
		 */
		credentials: "",
		/**
		  Show traffic info
		 */
		showTraffic: false,
		/**
		  Represents Bing options to customize the map that is displayed.  Can only be set at create time.  For example,
		  {kind: "enyo.Map", options: {showDashboard: false, showCopyright: false}}
		 */
		options: ""
	},
	events: {
		onPinClick: "",
		onLoaded: "",
		onLoadFailure: ""
	},
	//* @protected
	rendered: function() {
		this.inherited(arguments);
		enyo.BingMap.loadScript(enyo.bind(this, "renderMap"));
	},
	destroy: function() {
		this.inherited(arguments);
		if (this.pinClickEvent) {
			Microsoft.Maps.Events.removeHandler(this.pinClickEvent);
		}
	},
	createMap: function() {
		var props = {
			credentials: this.credentials,
			disableKeyboardInput: true  // make keyboard not to popout
		};
		enyo.mixin(props, this.options);
		this.map = new Microsoft.Maps.Map(this.hasNode(), props);
	},
	destroyMap: function() {
		this.map = null;
	},
	renderMap: function() {
		this.destroyMap();
		try {
			this.createMap();
		} catch (e) {
			this.doLoadFailure(e);
			return;
		}
		this.mapTypeChanged();
		this.updateCenter();
		this.zoomChanged();
		this.showPinChanged();
		this.doLoaded();
	},
	//* @public
	/**
	  Returns the actual Bing map control.
	 */
	hasMap: function() {
		return this.map;
	},
	/**
	  Removes all entities from the map except the dropped pin and the pins in inExcludes.
	 */
	clearAll: function(inExcludes) {
		this.map.entities.clear();
		if (this.showPin && this.pin) {
			this.map.entities.push(this.pin);
		}
		if (inExcludes) {
			for (var i=0, ex; ex=inExcludes[i]; i++) {
				if (ex) {
					this.map.entities.push(ex);
				}
			}
		}
	},
	/**
	  Sets the location of the center of the map view.
	  @param {number} inLatitude The latitude of the location.
	  @param {number} inLongitude The longitude of the location.
	 */
	setCenter: function(inLatitude, inLongitude) {
		this.latitude = inLatitude;
		this.longitude = inLongitude;
		this.updateCenter();
	},
	//* @protected
	credentialsChanged: function() {
		this.renderMap();
	},
	latitudeChanged: function() {
		this.latitude = Number(this.latitude);
		this.updateCenter();
	},
	longitudeChanged: function() {
		this.longitude = Number(this.longitude);
		this.updateCenter();
	},
	updateCenter: function() {
		this.centerLoc = new Microsoft.Maps.Location();
		this.centerLoc.latitude = this.latitude;
		this.centerLoc.longitude = this.longitude;
		this.map.setView({center: this.centerLoc});
	},
	zoomChanged: function() {
		this.zoom = Number(this.zoom);
		this.map.setView({zoom: this.zoom});
	},
	getZoom: function() {
		return this.map.getZoom();
	},
	showPinChanged: function() {
		if (this.showPin) {
			if (this.pin) {
				this.pin.setLocation(this.centerLoc);
			} else {
				this.pin = new Microsoft.Maps.Pushpin(this.centerLoc, {draggable: true});
				this.pinClickEvent = Microsoft.Maps.Events.addHandler(this.pin, 'click', enyo.bind(this, "pinClick")); 
				this.pin.setOptions({icon: enyo.path.rewrite("$maps/") + "images/poi_precise_location.png"});
			}
			this.map.entities.push(this.pin);
		} else {
			if (this.pin) {
				this.map.entities.remove(this.pin);
			}
		}
	},
	pinClick: function(e) {
		this.doPinClick(e);
	},
	mapTypeChanged: function() {
		var id = Microsoft.Maps.MapTypeId[this.mapType] || Microsoft.Maps.MapTypeId.road;
		this.map.setView({mapTypeId: id});
	},
	showTrafficChanged: function() {
		if (this.trafficTileLayer) {
			this.map.entities.remove(this.trafficTileLayer);
			this.trafficTileLayer = null;
		}
		if (this.showTraffic) {
			var time = (new Date()).getTime();
			var tileSource = new Microsoft.Maps.TileSource({uriConstructor: 'http://t0.tiles.virtualearth.net/tiles/t{quadkey}?tc=' + time});
			// Construct the layer using the tile source
			this.trafficTileLayer = new Microsoft.Maps.TileLayer({mercator: tileSource, opacity: .7});
			this.map.entities.push(this.trafficTileLayer);
		}
	},
	//* @public
	createPushpin: function(inLatitude, inLongitude, inOptions, inProps) {
		return this.updatePushpin(null, inLatitude, inLongitude, inOptions, inProps);
	},
	updatePushpin: function(inPushpin, inLatitude, inLongitude, inOptions, inProps) {
		var pushpin = inPushpin, location = new Microsoft.Maps.Location(inLatitude, inLongitude);
		if (!pushpin) {
			pushpin = new Microsoft.Maps.Pushpin(location, inOptions);
			this.map.entities.push(pushpin);
		} else {
			pushpin.setOptions(inOptions);
			pushpin.setLocation(location);
		}
		enyo.mixin(pushpin, inProps);
		pushpin.location = {latitude: inLatitude, longitude: inLongitude};
		return pushpin;
	},
	//* @protected
	statics: {
		scriptLoadedCbs: [],
		alreadyCalled: false,
		loadScript: function(inCallback) {
			if (window["Microsoft"] && window["Microsoft"]["Maps"]) {
				inCallback && inCallback();
			} else {
				this.scriptLoadedCbs.push(inCallback);
				if (!this.alreadyCalled) {
					this.alreadyCalled =  true;
					this.addScript();
				}
			}
		},
		addScript: function() {
			var script = document.createElement("script");
	    	script.type = "text/javascript";
			script.src = "http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&onscriptload=enyo_BingMap_scriptLoaded";
	    	document.body.appendChild(script);
		},
		scriptLoaded: function() {
			for (var i=0, c; c=enyo.BingMap.scriptLoadedCbs[i]; i++) {
				c();
			}
			enyo.BingMap.scriptLoadedCbs = [];
		}
	}
});

// onscriptload in Bing API doesn't work if  "." is in the callback function name
enyo_BingMap_scriptLoaded = enyo.BingMap.scriptLoaded;
