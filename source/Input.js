/**
	An onyx styled Input control. In addition to the features of <a href="#enyo.Input">enyo.Input</a>, the defaultFocus property can be set to true to 
	focus the input when it's rendered. Only one input should be set as the defaultFocus.

	Typically an Input is surrounded with an <a href="#onyx.InputDecorator">onyx.InputDecorator</a> which provides styling.

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.Input", placeholder: "Enter some text...", onchange: "inputChange"}
		]}

*/
enyo.kind({
	name: "onyx.Input",
	kind: "enyo.Input",
	classes: "onyx-input",
	//* Set to true to focus this control when it is rendered.
	defaultFocus: false,
	//* @protected
	rendered: function() {
		this.inherited(arguments);
		if (this.defaultFocus) {
			this.focus();
		}
	}
});
