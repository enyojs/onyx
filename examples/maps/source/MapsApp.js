enyo.kind({
	name: "MapsApp",
	classes: "app onyx enyo-unselectable",
	components: [
		{kind: "onyx.Toolbar", classes: "toolbar", components: [
			{kind: "onyx.RadioGroup", defaultKind: "RadioIconButton", components: [
				{icon: "images/topbar-search-icon.png", active: true},
				{icon: "images/topbar-direct-icon.png"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", defaultFocus: true, classes: "search-input", placeholder: "Search or Address"},
				{kind: "Image", src: "images/search-input-search.png"}
			]},
			/* using "float: right" to make menu buttons right-aligned */
			{kind: "IconButton", classes: "menu-button", style: "float: right;", icon: "images/menu-icon-mylocation.png", ontap: "findCurrentLocation"},
			{kind: "IconButton", classes: "menu-button", style: "float: right;", icon: "images/menu-icon-bookmark.png", panel: "bookmark", ontap: "togglePullout"},
			{kind: "IconButton", classes: "menu-button", style: "float: right;", icon: "images/menu-icon-info.png", panel: "info", ontap: "togglePullout"}
		]},
		{name: "map", kind: "BingMap", classes: "enyo-fit", style: "top: 56px;", 
			options: {showDashboard: false, showCopyright: false, showScalebar: false},
			credentials: "Ah2oavKf-raTJYVgMxnxJg9E2E2_53Wb3jz2lD4N415EFSKwFlhlMe9U2dJpMZyJ",
			onLoaded: "findCurrentLocation"},
		{kind: "Pullout", max: 100, value: 100, unit: "%", classes: "pullout", onDropPin: "dropPin", onShowTraffic: "showTraffic", onMapTypeSelect: "mapTypeSelect"},
		{kind: "CurrentLocation", onSuccess: "currentLocationSuccess"}
	],
	togglePullout: function(inSender) {
		this.$.pullout.toggle(inSender.panel);
	},
	mapTypeSelect: function(inSender, inEvent) {
		this.$.map.setMapType(inEvent.mapType)
	},
	dropPin: function(inSender, inEvent) {
		var loc = this.$.map.hasMap().getCenter();
		this.$.map.setCenter(loc.latitude, loc.longitude);
		this.$.map.setShowPin(inEvent.value);
	},
	showTraffic: function(inSender, inEvent) {
		this.$.map.setShowTraffic(inEvent.value);
	},
	findCurrentLocation: function() {
		this.$.currentLocation.go();
	},
	currentLocationSuccess: function(inSender, inData) {
		var c = inData.coords;
		this.$.map.setCenter(c.latitude, c.longitude);
		this.$.map.setZoom(14);
		inSender.stopTracking();
		this.showMyLocationPin(c.latitude, c.longitude);
	},
	showMyLocationPin: function(inLatitude, inLongitude) {
		if (this.myLocationPin) {
			this.myLocationPin.setLocation(new Microsoft.Maps.Location(inLatitude, inLongitude));
		} else {
			this.myLocationPin = this.$.map.createPushpin(inLatitude, inLongitude,
				{icon: "images/mylocation.png", height: 48, width: 48, anchor: new Microsoft.Maps.Point(24, 24)});
		}
	}
});
