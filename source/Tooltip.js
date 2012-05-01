enyo.kind({
	name: "onyx.Tooltip",
	kind: "onyx.Popup",
	classes: "onyx-tooltip",
	autoDismiss: false,
	showDelay: 500,
	handlers: {
		onRequestShowTooltip: "requestShow",
		onRequestHideTooltip: "requestHide"
	},
	requestShow: function() {
		this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay);
		return true;
	},
	cancelShow: function() {
		clearTimeout(this.showJob);
	},
	requestHide: function() {
		this.cancelShow();
		return this.inherited(arguments);
	},
	showingChanged: function() {
		this.cancelShow();
		this.inherited(arguments);
	}
});
