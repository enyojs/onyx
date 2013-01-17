//* @protected
// Design description of the Onyx controls for use in the Ares designer tool.
Palette.model.push(
	{name: "onyx", items: [
		{name: "onyx.Button", description: "A Pushbutton",
			inline: {content: "onyx.Button", kind: "onyx.Button"},
			config: {content: "$name", isContainer: true, kind: "onyx.Button"}
		},
		{name: "onyx.InputDecorator", description: "Style an Input",
			inline: {kind: "onyx.InputDecorator", components: [
				{kind: "Input", placeholder: "Enter text here"}
			]},
			config: {kind: "onyx.InputDecorator", components: [
				{kind: "Input", placeholder: "Enter text here"}
			]}
		},
		{name: "onyx.Input", description: "Text input control",
			inline: {value: "onyx.Input", kind: "onyx.Input"},
			config: {kind: "onyx.Input"}
		},
		{name: "onyx.ToggleButton", description: "A bushbutton that toggles between active and inactive states",
			inline: {kind: "onyx.ToggleButton"},
			config: {kind: "onyx.ToggleButton"}
		},
		{name: "onyx.Checkbox", description: "A checkbox",
			inline: {kind: "onyx.Checkbox"},
			config: {kind: "onyx.Checkbox"}
		},
		{name: "onyx.RadioGroup", description: "Only one control in a group can be 'active' at a time",
			inline: {kind: "onyx.RadioGroup", components: [
				{content: "A"},
				{content: "B"},
				{content: "C"}
			]},
			config: {kind: "onyx.RadioGroup", isContainer: true, components: [
				{content: "RadioButton"}
			]}
		},
		{name: "onyx.RadioButton", description: "An on-off button, for use with RadioGroup",
			inline: {content: "RadioButton", kind: "onyx.RadioButton"},
			config: {content: "$name", kind: "onyx.RadioButton"}
		},
		{name: "onyx.Toolbar", description: "A toolbar",
			inline: {kind: "onyx.Toolbar"},
			config: {isContainer: true, kind: "onyx.Toolbar"}
		},
		{name: "onyx.Grabber", description: "Graphical 'handle' for dragging",
			inline: {kind: "onyx.Grabber", style: "background-color: #333; padding: 4px 12px;"},
			config: {kind: "onyx.Grabber"}
		},
		{name: "onyx.Groupbox", description: "A container for a group of controls",
			inline: {kind: "onyx.Groupbox", components: [
				{content: "Header", kind: "onyx.GroupboxHeader"},
				{content: "Item", style: "padding: 10px;"}
			]},
			config: {kind: "onyx.Groupbox", isContainer: true, components: [
				{content: "Header", kind: "onyx.GroupboxHeader", isContainer: true},
				{content: "Item", style: "padding: 10px;"}
			]}
		},
		{name: "onyx.GroupboxHeader", description: "A header for the Groupbox",
			inline: {content: "Header", kind: "onyx.GroupboxHeader"},
			config: {content: "$name", kind: "onyx.GroupboxHeader", isContainer: true}
		}
	]}
);
