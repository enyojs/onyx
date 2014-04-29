/**
	_onyx.RadioGroup_ is a group of [onyx.RadioButton](#onyx.RadioButton) objects
	laid out horizontally. Within the same radio group, tapping on one radio
	button will release any previously-tapped radio button.

		{kind: "onyx.RadioGroup", components: [
			{content: "foo", active: true},
			{content: "bar"},
			{content: "baz"}
		]}
*/
enyo.kind({
	name: "onyx.RadioGroup",
	kind: "enyo.Group",
	defaultKind: "onyx.RadioButton",
	//* @protected
	// set to true to provide radio button behavior
	highlander: true
});
