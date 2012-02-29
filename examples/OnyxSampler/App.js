enyo.kind({
	name: "App",
	classes: "onyx",
	components: [
		{kind: "onyx.Toolbar", content: "Onyx Widget Sampler"},
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
			]},
			{classes: "tools", defaultKind: "onyx.Button", components: [
				{content: "Affirmative", classes: "onyx-affirmative"},
				{content: "Negative", classes: "onyx-negative"},
				{content: "Blue", classes: "onyx-blue"},
				{content: "Custom", style: "background-color: purple; color: #F1F1F1;"},
			]},
			{classes: "tools", defaultKind: "onyx.Button", components: [
				{content: "Active", classes: "active"},
				{content: "Disabled", disabled: true},
				{content: "Active Disabled", classes: "active", disabled: true}
			]},
			{classes: "tools", defaultKind: "onyx.Button", components: [
				{content: "Tall Button", style: "height: 70px;"}
			]},
			{tag: "br"},
			{classes: "divider", content: "Button Group"},
			{kind: "Group", classes: "tools group", defaultKind: "onyx.Button", highlander: true, components: [
				{content: "Button A", active: true, classes: "onyx-affirmative"},
				{content: "Button B", classes: "onyx-negative"},
				{content: "Button C", classes: "onyx-blue"}
			]},
			{tag: "br"},
			{classes: "divider", content: "Icon Button"},
			{kind: "onyx.IconButton", src: "images/menu-icon-bookmark.png"},
			{tag: "br"},
			{tag: "br"},
			{classes: "divider", content: "Grouped Icon Buttons"},
			{kind: "Group", components: [
				{kind: "onyx.IconButton", active: true, src: "images/menu-icon-bookmark.png"},
				{kind: "onyx.IconButton", src: "images/menu-icon-bookmark.png"},
				{kind: "onyx.IconButton", src: "images/menu-icon-bookmark.png"}
			]},
			{tag: "br"},
			{classes: "divider", content: "Icon Buttons in Toolbar"},
			{kind: "onyx.Toolbar", defaultKind: "onyx.IconButton", components: [
				{src: "images/menu-icon-bookmark.png"},
				{src: "images/menu-icon-bookmark.png"},
				{src: "images/menu-icon-bookmark.png"},
				{kind: "Control"},
				{kind: "Group", noDom: true, defaultKind: "onyx.IconButton", components: [
					{active: true, src: "images/menu-icon-bookmark.png"},
					{src: "images/menu-icon-bookmark.png"},
					{src: "images/menu-icon-bookmark.png"}
				]}
			]},
			{tag: "br"},
			{classes: "divider", content: "Toggle Buttons"},
			{classes: "tools", defaultKind: "onyx.ToggleButton", components: [
				{value: true},
				{},
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
				{},
				{value: true}
			]},
			{tag: "br"},
			{classes: "divider", content: "Checkboxes Group"},
			{kind: "Group", classes: "tools group", defaultKind: "onyx.Checkbox", highlander: true, components: [
				{value: true},
				{},
				{}
			]},
			{tag: "br"},
			{classes: "divider", content: "Inputs"},
			{classes: "onyx-toolbar-inline", components: [
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", defaultFocus: false, placeholder: "Enter text here"}
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", placeholder: "Search term"},
					{kind: "Image", src: "images/search-input-search.png"}
				]}
			]},
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
					{kind: "onyx.Input", style: "width: 100%", placeholder: "Enter text here"}
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", style: "width: 100%", value: "Middle"}
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", style: "width: 100%", value: "Last"}
				]}
			]},
			{tag: "br"},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", style: "width: 100%", placeholder: "Enter text here"}
				]}
			]},
			{tag: "br"},
			{classes: "divider", content: "Slideable"},
			{style: "border: 1px solid silver; height: 200px; position: relative; overflow: hidden; margin: 10px;", components: [
				{kind: "onyx.Slideable", value: -60, min: -60, unit: "%", classes: "enyo-fit", style: "width: 200px; background: #404040;", components: [
					{kind: "onyx.Grabber", style: "position: absolute; bottom: 14px; right: 14px;"}
				]},
				{kind: "onyx.Slideable", value: 60, max: 60, unit: "%", classes: "enyo-fit", style: "left: auto; width: 200px; background: #1E5D89;", components: [
					{kind: "onyx.Grabber", style: "position: absolute; bottom: 14px; left: 14px;"}
				]}
			]}
		]}
	]
});
