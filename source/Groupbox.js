/**
	_onyx.Groupbox_ displays rows of controls as a vertically-stacked group. It
	is designed to have container controls as its children, with each container
	representing a row in the Groupbox.

	To add a header, specify an [onyx.GroupboxHeader](#onyx.GroupboxHeader) as the
	first control in the Groupbox, e.g.:

		{kind: "onyx.Groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Sounds"},
				{components: [
					{content: "System Sounds"},
					{kind: "onyx.ToggleButton", value: true}
				]},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input"}
				]}
			]}
		]}

*/
enyo.kind({
	name: "onyx.Groupbox",
	classes: "onyx-groupbox"
});

/**
	_onyx.GroupboxHeader_ is a control designed to be placed inside an
	[onyx.Groupbox](#onyx.Groupbox). When a header is desired, make a
	GroupboxHeader the first control inside the Groupbox.

		{kind: "onyx.Groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Sounds"},
			{content: "Yawn"},
			{content: "Beep"}
		]}
*/
enyo.kind({
	name: "onyx.GroupboxHeader",
	classes: "onyx-groupbox-header"
});