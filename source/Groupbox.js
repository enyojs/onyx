/**
	_onyx.Groupbox_ displays rows of controls as a vertically-stacked group. It
	is designed to have container controls as its children, with each container
	representing a row in the Groupbox.

	A header may be added by specifying an
	<a href="#onyx.GroupboxHeader">onyx.GroupboxHeader</a> as the first control
	in the Groupbox, e.g.:

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
	A GroupboxHeader is designed to be placed inside an <a href="#onyx.Groupbox">onyx.Groupbox</a>. When a header for a group is desired,
	make a GroupboxHeader the first control inside a Groupbox.

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