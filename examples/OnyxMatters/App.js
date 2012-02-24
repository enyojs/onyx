enyo.kind({
	name: "App",
	handlers: {
		onmove: "moveHandler"
	},
	components: [
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber"},
			{content: "Header"},
			{kind: "onyx.Button", content: "Label"},
			{kind: "onyx.Button", content: "Label", classes: "active"}
		]},
		{classes: "onyx", style: "padding: 10px;", components: [
			{content: "RadioGroup"},
			{kind: "onyx.RadioGroup", components: [
				{content: "Alpha", active: true},
				{content: "Beta"},
				{content: "Gamma"}
			]},
			{tag: "br"},
			{content: "Buttons"},
			{classes: "tools", defaultKind: "onyx.Button", components: [
				{content: "Button"},
				{content: "Affirmative", style: "background-color: #91BA07; color: #F1F1F1;"},
				{content: "Negative", style: "background-color: #C51616; color: #F1F1F1;"},
				{content: "Blue", style: "background-color: #35A8EE; color: #F1F1F1;"}
			]},
			{tag: "br"},
			{content: "Button Group"},
			{kind: "Group", classes: "tools", style: "margin: 8px; padding: 4px; border: 1px solid lightblue;", defaultKind: "onyx.Button", highlander: true, components: [
				{content: "Button A", style: "background-color: #35A8EE; color: #F1F1F1;"},
				{content: "Button B", style: "background-color: #C51616; color: #F1F1F1;"},
				{content: "Button C", style: "background-color: #91BA07; color: #F1F1F1;"}
			]},
			{tag: "br"},
			{content: "Toggle Buttons"},
			{classes: "tools", defaultKind: "onyx.ToggleButton", components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{content: "Toggle Buttons Group"},
			{kind: "Group", classes: "tools", style: "margin: 8px; padding: 4px; border: 1px solid lightblue;", defaultKind: "onyx.ToggleButton", highlander: true, components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{content: "Checkboxes"},
			{classes: "tools", defaultKind: "onyx.Checkbox", components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{content: "Checkboxes Group"},
			{kind: "Group", classes: "tools", style: "margin: 8px; padding: 4px; border: 1px solid lightblue;", defaultKind: "onyx.Checkbox", highlander: true, components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{content: "Inputs"},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", defaultFocus: true, placeholder: "Enter text here"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placeholder: "Search term"},
				{kind: "Image", src: "images/search-input-search.png"}
			]},
			{tag: "br"},
			{tag: "br"},
			{content: "Groupboxes"},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.GroupboxHeader", content: "Header"},
				{content: "I'm a group item!"},
				{content: "I'm a group item!"}
			]},
			{tag: "br"},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.GroupboxHeader", content: "Header"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", placeholder: "Enter text here"},
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", value: "Middle"},
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", value: "Last"}
				]}
			]}
		]}
	],
	// allow touch move
	moveHandler: function(inSender, inEvent) {
		inEvent.allowTouchmove = true;
	}
});
