/**
	_onyx.Input_ is an Onyx-styled input control, derived from
	<a href="#enyo.Input">enyo.Input</a>. Typically, an _onyx.Input_ is placed
	inside an <a href="#onyx.InputDecorator">onyx.InputDecorator</a>, which
	provides styling, e.g.:

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.Input", placeholder: "Enter some text...", onchange: "inputChange"}
		]}

	For more information, see the documentation on
	[Text Fields](https://github.com/enyojs/enyo/wiki/Text-Fields) in the Enyo
	Developer Guide.
*/
enyo.kind({
	name: "onyx.Input",
	kind: "enyo.Input",
	classes: "onyx-input"
});
