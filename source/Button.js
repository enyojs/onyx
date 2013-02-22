/**
	_onyx.Button_ is an <a href="#enyo.Button">enyo.Button</a> with Onyx styling
	applied. The color of the button may be customized by specifying a
	background color.

	The *onyx-affirmative*, *onyx-negative*, and *onyx-blue* classes provide
	some built-in presets.

		{kind: "onyx.Button", content: "Button"},
		{kind: "onyx.Button", content: "Affirmative", classes: "onyx-affirmative"},
		{kind: "onyx.Button", content: "Negative", classes: "onyx-negative"},
		{kind: "onyx.Button", content: "Blue", classes: "onyx-blue"},
		{kind: "onyx.Button", content: "Custom", style: "background-color: purple; color: #F1F1F1;"}

	For more information, see the documentation on
	<a href="https://github.com/enyojs/enyo/wiki/Buttons">Buttons</a> in the
	Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.Button",
	kind: "enyo.Button",
	classes: "onyx-button enyo-unselectable",
	//* @protected
	create: function() {
		//workaround for FirefoxOS which doesn't support :active:hover css selectors
		//FirefoxOS simulator does :active:hover css selectors, so do additional srcEvent check
		if(enyo.platform.firefoxOS) {
			this.handlers.onenter = "enter";
			this.handlers.onleave = "leave";
		}
		this.inherited(arguments);
	},
	enter: function(inSender, inEvent) {
		if(inEvent.srcEvent.type!="mouseover")
			this.addClass("pressed");
	},
	leave: function(inSender, inEvent) {
		if(inEvent.srcEvent.type!="mouseout")
			this.removeClass("pressed");
	}
});