enyo.kind({
	name: "CurrentLocation",
	kind: "Component",
	events: {
		onSuccess: "",
		onFailure: ""
	},
	destroy: function() {
		this.stopTracking();
		this.inherited(arguments);
	},
	stopTracking: function() {
		if (this._watchId) {
			navigator.geolocation.clearWatch(this._watchId);
		}
	},
	go: function() {
		this._watchId = navigator.geolocation.watchPosition(
			enyo.bind(this, "doSuccess"),
			enyo.bind(this, "doFailure"),
			{maximumAge: 600, timeout: 10000});
	}
});
