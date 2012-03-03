enyo.kind({
	name: "MapsApp",
	classes: "app onyx",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", components: [
				{name: "menu", classes: "menu", defaultKind: "onyx.IconButton", components: [
					{src: "images/menu-icon-info.png", panel: "info", ontap: "togglePullout"},
					{src: "images/menu-icon-bookmark.png", panel: "bookmark", ontap: "togglePullout"},
					{src: "images/menu-icon-mylocation.png", ontap: "findCurrentLocation"}
				]},
				{kind: "Group", defaultKind: "onyx.IconButton", noDom: true, components: [
					{src: "images/topbar-search-icon.png", active: true},
					{src: "images/topbar-direct-icon.png"}
				]},
				{kind: "onyx.InputDecorator", components: [
					{name: "searchInput", classes: "search-input", kind: "onyx.Input", placeholder: "Search (e.g. Coffee)", onkeypress: "searchInputKeypress"},
					{kind: "Image", src: "images/search-input-search.png", ontap: "search"}
				]}
			]},
			{name: "map", kind: "BingMap", fit: true, onLoaded: "findCurrentLocation",
				options: {showDashboard: false, showScalebar: false},
					credentials: "Ah2oavKf-raTJYVgMxnxJg9E2E2_53Wb3jz2lD4N415EFSKwFlhlMe9U2dJpMZyJ"
			}
		]},
		{kind: "Pullout", classes: "pullout", onDropPin: "dropPin", onShowTraffic: "showTraffic", onMapTypeSelect: "mapTypeSelect", onBookmarkSelect: "bookmarkSelect", components: [
			{classes: "pullout-menu", defaultKind: "onyx.IconButton", components: [
				{src: "images/menu-icon-info.png", panel: "info", ontap: "togglePullout"},
				{src: "images/menu-icon-bookmark.png", panel: "bookmark", ontap: "togglePullout"},
				{src: "images/menu-icon-mylocation.png", ontap: "findCurrentLocation"}
			]}
		]},
		{kind: "Infobox"},
		{kind: "CurrentLocation", onSuccess: "currentLocationSuccess"},
		{kind: "SearchPlaces", credentials: "D7819411124F1FE57C72D3DB61E03F47470F143A", onResults: "searchResults"}
	],
	togglePullout: function(inSender) {
		this.$.pullout.toggle(inSender.panel);
	},
	mapTypeSelect: function(inSender, inEvent) {
		this.$.map.setMapType(inEvent.mapType)
	},
	bookmarkSelect: function(inSender, inItem) {
		var isNew = !this.bookmarkPin;
		this.bookmarkPin = this.$.map.updatePushpin(this.bookmarkPin, inItem.Latitude, inItem.Longitude,
			{icon: "images/poi_search.png", height: 48, width: 48});
		this.bookmarkPin.item = inItem
		if (isNew) {
			Microsoft.Maps.Events.addHandler(this.bookmarkPin, "mouseup", enyo.bind(this, "openInfobox"));
		}
		this.$.map.setCenter(inItem.Latitude, inItem.Longitude);
	},
	openInfobox: function(e) {
		var pix = this.$.map.hasMap().tryLocationToPixel(e.target.getLocation(), Microsoft.Maps.PixelReference.control);
		e.originalEvent && e.originalEvent.stopPropagation && e.originalEvent.stopPropagation();
		this.$.infobox.openWithItem(e.target.item, pix.y, pix.x + 18);
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
		this.currentLocationPin = this.$.map.updatePushpin(this.currentLocationPin, c.latitude, c.longitude,
			{icon: "images/mylocation.png", height: 48, width: 48, anchor: new Microsoft.Maps.Point(24, 24)});
	},
	searchInputKeypress: function(inSender, inEvent) {
		if (inEvent.keyCode == 13) {
			this.search();
			inSender.hasNode().blur();
		}
	},
	clearAll: function() {
		this.$.map.clearAll([this.currentLocationPin]);
		this.bookmarkPin = null;
	},
	search: function() {
		this.clearAll();
		var v = this.$.searchInput.getValue();
		if (v) {
			var c = this.$.map.hasMap().getCenter();
			this.$.searchPlaces.search({
				Latitude: c.latitude,
				Longitude: c.longitude,
				Query: v
			});
		}
	},
	searchResults: function(inSender, inResponse) {
		var r = inResponse.results;
		for (var i=0, item; item=r[i]; i++) {
			var p = this.$.map.createPushpin(item.Latitude, item.Longitude, {
				icon: "images/poi_search.png", height: 48, width: 48, text: String(i+1),
				textOffset: new Microsoft.Maps.Point(0, 7)});
			p.item = item;
			Microsoft.Maps.Events.addHandler(p, 'mouseup', enyo.bind(this, "openInfobox"));
			!i && this.$.map.setCenter(item.Latitude, item.Longitude);
		}
	}
});
