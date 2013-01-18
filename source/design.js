//* @protected
// Design description of the Onyx controls for use in the Ares designer tool.
Palette.model.push(
	{name: "onyx", items: [
		{name: "onyx.Button", description: "A Pushbutton",
			inline: {content: "onyx.Button", kind: "onyx.Button"},
			config: {content: "$name", isContainer: true, kind: "onyx.Button"}
		},
		{name: "onyx.Checkbox", description: "A checkbox",
			inline: {kind: "onyx.Checkbox"},
			config: {kind: "onyx.Checkbox"}
		},
		{name: "onyx.DatePicker", description: "A control for choosing a date",
			inline: {kind: "onyx.DatePicker"},
			config: {kind: "onyx.DatePicker"}
		},
		{name: "onyx.Drawer", description: "A drawer that opens and closes",
			inline: {kind: "onyx.Drawer"},
			config: {kind: "onyx.Drawer"}
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
		},
		{name: "onyx.Icon", description: "An Icon",
			inline: {kind: "onyx.Icon"},
			config: {kind: "onyx.Icon"}
		},
		{name: "onyx.IconButton", description: "An IconButton",
			inline: {kind: "onyx.IconButton"},
			config: {kind: "onyx.IconButton"}
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
		{name: "onyx.Item", description: "Stackable item, for lists and menus",
			inline: {value: "onyx.Item", kind: "onyx.Item"},
			config: {content: "$name", kind: "onyx.Item"}
		},
		{name: "onyx.MenuDecorator", description: "A Menu and activating control",
			inline: {},
			config: {kind: "onyx.MenuDecorator", components: [
				{content: "Show menu"},
			    {kind: "onyx.Menu", components: [
			       	{content: "1"},
			       	{content: "2"},
			       	{classes: "onyx-menu-divider"},
			       	{content: "Label", classes: "onyx-menu-label"},
			       	{content: "3"}
				]}
			]}
		},
		{name: "onyx.PickerDecorator", description: "A Picker and activating control",
			inline: {},
			config: {kind: "onyx.PickerDecorator", components: [
			    {content: "Pick1"}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
			    {kind: "onyx.Picker", components: [
			        {content: "Pick1", active: true},
			        {content: "Pick2"},
			        {content: "Pick3"},
			        {content: "Pick4"}
			    ]}
			]}
		},
		{name: "onyx.ProgressBar", description: "A progress bar",
			inline: {},
			config: {kind: "onyx.ProgressBar"}
		},
		{name: "onyx.ProgressButton", description: "A progress button",
			inline: {},
			config: {kind: "onyx.ProgressButton"}
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
		{name: "onyx.RangeSlider", description: "A Slider with two knobs",
			inline: {value: "onyx.RangeSlider", kind: "onyx.RangeSlider"},
			config: {kind: "onyx.RangeSlider"}
		},
		{name: "onyx.RichText", description: "A Rich text input",
			inline: {value: "onyx.RichText", kind: "onyx.RichText"},
			config: {kind: "onyx.RichText", style: "height: 100px"}
		},
		{name: "onyx.Slider", description: "A Slider",
			inline: {value: "onyx.Slider", kind: "onyx.Slider"},
			config: {kind: "onyx.Slider"}
		},
		{name: "onyx.Spinner", description: "A Spinner",
			inline: {kind: "onyx.Spinner"},
			config: {kind: "onyx.Spinner", classes: "onyx-light"}
		},
		{name: "onyx.TextArea", description: "A multi-line text input",
			inline: {kind: "onyx.TextArea"},
			config: {kind: "onyx.TextArea"}
		},
		{name: "onyx.TimePicker", description: "A Picker for time",
			inline: {kind: "onyx.TimePicker"},
			config: {kind: "onyx.TimePicker"}
		},
		{name: "onyx.ToggleButton", description: "A pushbutton that toggles between active and inactive states",
			inline: {kind: "onyx.ToggleButton"},
			config: {kind: "onyx.ToggleButton"}
		},
		{name: "onyx.ToggleIconButton", description: "A ToggleButton that toggles between active and inactive images",
			inline: {kind: "onyx.ToggleIconButton"},
			config: {kind: "onyx.ToggleIconButton"}
		},
		{name: "onyx.Toolbar", description: "A toolbar",
			inline: {kind: "onyx.Toolbar"},
			config: {isContainer: true, kind: "onyx.Toolbar"}
		},
		{name: "onyx.MoreToolbar", description: "A toolbar which adapts to screen width ",
			inline: {kind: "onyx.Toolbar"},
			config: {isContainer: true, kind: "onyx.MoreToolbar", components: [
				{content: "MoreToolbar"},
				{kind: "onyx.Item", content: "Resize Me!"},
				{kind: "onyx.Button", content: "this"},
				{kind: "onyx.Button", content: "toolbar"},
				{kind: "onyx.Button", content: "has"},
				{kind: "onyx.Button", content: "many"},
				{kind: "onyx.Button", content: "items"},
				{kind: "onyx.Button", content: "in"},
				{kind: "onyx.Button", content: "it"}
			]}
		},
		{name: "onyx.Grabber", description: "Graphical 'handle' for dragging",
			inline: {kind: "onyx.Grabber", style: "background-color: #333; padding: 4px 12px;"},
			config: {kind: "onyx.Grabber"}
		},
		{name: "onyx.TooltipDecorator", description: "Combines a conrol (typically a button) and a tooltip describing it",
			inline: {kind: "onyx.Tooltip"},
			config: {kind: "onyx.TooltipDecorator", components: [
			    {kind: "onyx.Button", content: "Hover for tooltip"},
			    {kind: "onyx.Tooltip", content: "I'm a tooltip for a button."}
			]}
		}
	]}
);
