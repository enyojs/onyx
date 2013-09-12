/**
	_onyx.Input_ is an Onyx-styled input control, derived from
	[enyo.Input](#enyo.Input). Typically, an _onyx.Input_ is placed inside an
	[onyx.InputDecorator](#onyx.InputDecorator), which provides styling, e.g.:

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.Input", placeholder: "Enter some text...", onchange: "inputChange"}
		]}

	For more information, see the documentation on [Text
	Fields](building-apps/controls/text-fields.html) in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.Input",
	kind: "enyo.Input",
	classes: "onyx-input"
});
