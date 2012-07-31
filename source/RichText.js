/**
	_onyx.RichText_ is an Onyx-styled RichText control, derived from
	<a href="#enyo.RichText">enyo.RichText</a>. Typically, an _onyx.RichText_
	is placed inside an <a href="#onyx.InputDecorator">onyx.InputDecorator</a>,
	which provides styling, e.g.:

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.RichText", style: "width: 100px;", onchange: "inputChange"}
		]}

	For more information, see the documentation on
	[Text Fields](https://github.com/enyojs/enyo/wiki/Text-Fields) in the Enyo
	Developer Guide.
*/
enyo.kind({
	name: "onyx.RichText",
	kind: "enyo.RichText",
	classes: "onyx-richtext"
});
