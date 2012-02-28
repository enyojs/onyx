enyo.kind({
	name: "onyx.TooltipDecorator",
	defaultKind: "onyx.Button",
	classes: "onyx-popup-decorator",
	handlers: {
		onenter: "enter",
		onleave: "leave"
	},
	enter: function() {
		this.requestShowTooltip();
	},
	leave: function() {
		this.requestHideTooltip();
	},
	tap: function() {
		this.requestHideTooltip();
	},
	requestShowTooltip: function() {
		this.waterfallDown("onRequestShowTooltip");
	},
	requestHideTooltip: function() {
		this.waterfallDown("onRequestHideTooltip");
	}
});