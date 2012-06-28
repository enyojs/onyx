enyo.kind({
	name: "InputSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Inputs"},
		{classes: "onyx-toolbar-inline", components: [
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placeholder: "Enter text here", onchange:"inputChanged"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placeholder: "Search term", onchange:"inputChanged"},
				{kind: "Image", src: "assets/search-input-search.png"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", type:"password", placeholder: "Enter password", onchange:"inputChanged"}
			]}
		]},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "RichTexts"},
		{classes: "onyx-toolbar-inline", components: [
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.RichText", style: "width: 200px;", placeholder: "Enter text here", onchange:"inputChanged"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.RichText", style: "width: 200px;", placeholder: "Search term", onchange:"inputChanged"},
				{kind: "Image", src: "assets/search-input-search.png"}
			]}
		]},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "TextAreas"},
		{classes: "onyx-toolbar-inline", components: [
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.TextArea", placeholder: "Enter text here", onchange:"inputChanged"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.TextArea", placeholder: "Search term", onchange:"inputChanged"},
				{kind: "Image", src: "assets/search-input-search.png"}
			]}
		]},
		{tag: "br"},
		{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
			{kind: "onyx.GroupboxHeader", content: "Result"},
			{name:"result", classes:"onyx-sample-result", content:"No input entered yet."}
		]}
	],
	inputChanged: function(inSender, inEvent) {
		this.$.result.setContent("Input: " + inSender.getValue());
	}
});
