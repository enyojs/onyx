/**
	An onyx styled RichText control. In addition to the features of <a href="#enyo.RichText">enyo.RichText</a>, the defaultFocus property can be set to true to 
	focus the richtext when it's rendered. Only one richtext should be set as the defaultFocus.

	Typically an RichText is surrounded with an <a href="#onyx.InputDecorator">onyx.InputDecorator</a> which provides styling.

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.RichText", style: "width: 100px;", onchange: "inputChange"}
		]}

	**Note**: RichTexts need to be explicitly sized for width. RichText is not supported on Android < 3.

*/
enyo.kind({
	name: "onyx.RichText",
	kind: "enyo.RichText",
	classes: "onyx-richtext"
});
