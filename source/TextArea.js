/**
	_onyx.TextArea_ is an Onyx-styled TextArea control, derived from
	<a href="#enyo.TextArea">enyo.TextArea</a>. Typically, an _onyx.TextArea_
	is placed inside an <a href="#onyx.InputDecorator">onyx.InputDecorator</a>,
	which provides styling, e.g.:

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.TextArea", onchange: "inputChange"}
		]}

	For more information, see the documentation on
	[Text Fields](https://github.com/enyojs/enyo/wiki/Text-Fields) in the Enyo
	Developer Guide.
*/
enyo.kind({
	name: "onyx.TextArea",
	kind: "enyo.TextArea",
	classes: "onyx-textarea"
});
