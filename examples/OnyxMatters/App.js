enyo.kind({
	name: "App",
	components: [
		{kind: "onyx.Toolbar", components: [
			{kind: "Image", src: "../../resources/grabbutton.png"},
			{content: "Header"},
			{kind: "onyx.Button", content: "Label"},
			{kind: "onyx.Button", content: "Label", classes: "active"}
		]},
		{name: "panel", classes: "onyx", style: "padding: 8px;", components: [
			{content: "RadioGroup"},
			{kind: "onyx.RadioGroup", components: [
				{content: "Alpha", active: true},
				{content: "Beta"},
				{content: "Gamma"}
			]},
			{content: "Buttons"},
			{classes: "tools", defaultKind: "onyx.Button", components: [
				{content: "Button"},
				{content: "Affirmative", style: "background-color: #91BA07; color: #F1F1F1;"},
				{content: "Negative", style: "background-color: #C51616; color: #F1F1F1;"},
				{content: "Blue", style: "background-color: #35A8EE; color: #F1F1F1;"}
			]},
			{content: "Button Group"},
			{kind: "Group", classes: "tools", style: "margin: 8px; padding: 4px; border: 1px solid lightblue;", defaultKind: "onyx.Button", highlander: true, components: [
				{content: "Button A", style: "background-color: #35A8EE; color: #F1F1F1;"},
				{content: "Button B", style: "background-color: #C51616; color: #F1F1F1;"},
				{content: "Button C", style: "background-color: #91BA07; color: #F1F1F1;"}
			]},
			{content: "Toggle Buttons"},
			{classes: "tools", defaultKind: "onyx.ToggleButton", components: [
				{},
				{value: true},
				{}
			]},
			{content: "Toggle Buttons Group"},
			{kind: "Group", classes: "tools", style: "margin: 8px; padding: 4px; border: 1px solid lightblue;", defaultKind: "onyx.ToggleButton", highlander: true, components: [
				{},
				{value: true},
				{}
			]},
			{content: "Checkboxes"},
			{classes: "tools", defaultKind: "onyx.Checkbox", components: [
				{},
				{value: true},
				{}
			]},
			{content: "Checkboxes Group"},
			{kind: "Group", classes: "tools", style: "margin: 8px; padding: 4px; border: 1px solid lightblue;", defaultKind: "onyx.Checkbox", highlander: true, components: [
				{},
				{value: true},
				{}
			]}
		]}
	]
});
