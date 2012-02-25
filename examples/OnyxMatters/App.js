enyo.kind({
	name: "App",
	classes: "onyx",
	components: [
		{kind: "onyx.Toolbar", content: "Onyx Style Matters"},
		{style: "padding: 10px;", components: [
			{classes: "divider", content: "Header"},
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.Grabber"},
				{content: "Header"},
				{kind: "onyx.Button", content: "Button"},
				{kind: "onyx.Button", content: "Down", classes: "active"},
				{kind: "onyx.Button", content: "Button"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", placeholder: "Input"}
				]},
				{kind: "onyx.Button", content: "Right"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", placeholder: "Right Input"}
				]},
				{kind: "onyx.Button", content: "More Right"}
			]},
			{tag: "br"},
			{classes: "divider", content: "RadioGroup"},
			{kind: "onyx.RadioGroup", components: [
				{content: "Alpha", active: true},
				{content: "Beta"},
				{content: "Gamma"}
			]},
			{tag: "br"},
			{classes: "divider", content: "TabGroup"},
			{kind: "onyx.RadioGroup", controlClasses: "onyx-tabbutton", components: [
				{content: "Alpha", active: true},
				{content: "Beta"},
				{content: "Gamma"}
			]},
			{tag: "br"},
			{classes: "divider", content: "Buttons"},
			{classes: "tools", defaultKind: "onyx.Button", components: [
				{content: "Button"},
				{content: "Affirmative", style: "background-color: #91BA07; color: #F1F1F1;"},
				{content: "Negative", style: "background-color: #C51616; color: #F1F1F1;"},
				{content: "Blue", style: "background-color: #35A8EE; color: #F1F1F1;"}
			]},
			{tag: "br"},
			{classes: "divider", content: "Button Group"},
			{kind: "Group", classes: "tools group", defaultKind: "onyx.Button", highlander: true, components: [
				{content: "Button A", style: "background-color: #35A8EE; color: #F1F1F1;"},
				{content: "Button B", style: "background-color: #C51616; color: #F1F1F1;"},
				{content: "Button C", style: "background-color: #91BA07; color: #F1F1F1;"}
			]},
			{tag: "br"},
			{classes: "divider", content: "Toggle Buttons"},
			{classes: "tools", defaultKind: "onyx.ToggleButton", components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{classes: "divider", content: "Toggle Buttons Group"},
			{kind: "Group", classes: "tools group", defaultKind: "onyx.ToggleButton", highlander: true, components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{classes: "divider", content: "Checkboxes"},
			{classes: "tools", defaultKind: "onyx.Checkbox", components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{classes: "divider", content: "Checkboxes Group"},
			{kind: "Group", classes: "tools group", defaultKind: "onyx.Checkbox", highlander: true, components: [
				{},
				{value: true},
				{}
			]},
			{tag: "br"},
			{classes: "divider", content: "Inputs"},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", defaultFocus: false, placeholder: "Enter text here"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placeholder: "Search term"},
				{kind: "Image", src: "images/search-input-search.png"}
			]},
			{tag: "br"},
			{tag: "br"},
			{classes: "divider", content: "Groupboxes"},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.GroupboxHeader", content: "Header"},
				{content: "I'm a group item!", style: "padding: 8px;"},
				{content: "I'm a group item!", style: "padding: 8px;"}
			]},
			{tag: "br"},
			{kind: "onyx.Groupbox", components: [
				{content: "I'm a group item!", style: "padding: 8px;"}
			]},
			{tag: "br"},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.GroupboxHeader", content: "Header"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", placeholder: "Enter text here"}
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", value: "Middle"}
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", value: "Last"}
				]}
			]},
			{tag: "br"},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", placeholder: "Enter text here"}
				]}
			]}
		]}
	],
	handlers: {
		onmove: "moveHandler"
	},
	// allow touch move
	moveHandler: function(inSender, inEvent) {
		inEvent.allowTouchmove = true;
	}
});
