/**
	A control that activates an <a href="#onyx.Tooltip">onyx.Tooltip</a>. It surrounds a control such as a button
	or other kind and displays the tooltip when the contained control generates an onEnter event.

		{kind: "onyx.TooltipDecorator", components: [
			{kind: "onyx.Button", content: "Tooltip"},
			{kind: "onyx.Tooltip", content: "I'm a tooltip for a button."}
		]}

	Or an example with an input control and decorator around the input:

		{kind: "onyx.TooltipDecorator", components: [
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placholder: "Just an input..."}
			]},
			{kind: "onyx.Tooltip", content: "I'm a tooltip for an input."}
		]}
*/
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