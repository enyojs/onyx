/**
	_onyx.TooltipDecorator_ is a control that couples an
	[onyx.Tooltip](#onyx.Tooltip) with an activating control, such as a button.
	The tooltip is displayed when the activator generates an _onEnter_ event:

		{kind: "onyx.TooltipDecorator", components: [
			{kind: "onyx.Button", content: "Tooltip"},
			{kind: "onyx.Tooltip", content: "I'm a tooltip for a button."}
		]}

	Here's an example with an [onyx.Input](#onyx.Input) control and a decorator
	around the input:

		{kind: "onyx.TooltipDecorator", components: [
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placeholder: "Just an input..."}
			]},
			{kind: "onyx.Tooltip", content: "I'm a tooltip for an input."}
		]}
*/
enyo.kind({
	name: "onyx.TooltipDecorator",
	defaultKind: "onyx.Button",
	//* @protected
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