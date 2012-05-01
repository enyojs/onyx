/**
	An onyx styled TextArea control. In addition to the features of <a href="#enyo.TextArea">enyo.TextArea</a>, the defaultFocus property can be set to true to 
	focus the richtext when it's rendered. Only one richtext should be set as the defaultFocus.

	Typically an TextArea is surrounded with an <a href="#onyx.InputDecorator">onyx.InputDecorator</a> which provides styling.

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.TextArea", onchange: "inputChange"}
		]}

*/
enyo.kind({
	name: "onyx.TextArea",
	kind: "enyo.TextArea",
	classes: "onyx-textarea"
});
