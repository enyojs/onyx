/**
	_onyx.RichText_ is an Onyx-styled rich text control, derived from
	[enyo.RichText](#enyo.RichText). Typically, an _onyx.RichText_ is placed
	inside an [onyx.InputDecorator](#onyx.InputDecorator), which provides styling,
	e.g.:

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.RichText", style: "width: 100px;", onchange: "inputChange"}
		]}

	For more information, see the documentation on [Text
	Fields](building-apps/controls/text-fields.html) in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.RichText",
	kind: "enyo.RichText",
	classes: "onyx-richtext"
});
