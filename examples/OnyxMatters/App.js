enyo.kind({
	name: "App",
	components: [
		{kind: "onyx.Toolbar", components: [
			{kind: "Image", src: "../../resources/grabbutton.png"},
			{content: "Header"},
			{kind: "onyx.Button", content: "Label"},
			{kind: "onyx.Button", content: "Label", classes: "active"}
		]},
		{name: "panel", classes: "onyx", components: [
			{classes: "tools", components: [
				{kind: "onyx.Button", content: "Button"},
				{kind: "onyx.Button", content: "Affirmative", style: "background-color: #91BA07; color: #F1F1F1;"},
				{kind: "onyx.Button", content: "Negative", style: "background-color: #C51616; color: #F1F1F1;"},
				{kind: "onyx.Button", content: "Blue", style: "background-color: #35A8EE; color: #F1F1F1;"}
			]},
			{kind: "Group", classes: "tools", defaultKind: "onyx.Button", highlander: true, components: [
				{content: "Button A", style: "background-color: #35A8EE; color: #F1F1F1;"},
				{content: "Button B", style: "background-color: #C51616; color: #F1F1F1;"},
				{content: "Button C", style: "background-color: #91BA07; color: #F1F1F1;"}
			]},
			{classes: "tools", components: [
				{kind: "onyx.ToggleButton"},
				{kind: "onyx.ToggleButton", value: true},
				{kind: "onyx.ToggleButton"}
			]}
		]}
	]
});
