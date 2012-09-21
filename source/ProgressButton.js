/**
	_onyx.ProgressButton_ is a progress bar that has a cancel button on the
	right and may have other controls inside of it.
	
		{kind: "onyx.ProgressButton"},
		{kind: "onyx.ProgressButton", barClasses: "onyx-light", progress: 20, components: [
			{content: "0"},
			{content: "100", style: "float: right;"}
		]}

	For more information, see the documentation on
	<a href="https://github.com/enyojs/enyo/wiki/Progress-Indicators">Progress Indicators</a>
	in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.ProgressButton",
	kind: "onyx.ProgressBar",
	classes: "onyx-progress-button",
	events: {
		//* Fires when cancel button is tapped.
		onCancel: ""
	},
	//* @protected
	components: [
		{name: "progressAnimator", kind: "Animator", onStep: "progressAnimatorStep", onEnd: "progressAnimatorComplete"},
		{name: "bar", classes: "onyx-progress-bar-bar onyx-progress-button-bar"},
		{name: "client", classes: "onyx-progress-button-client"},
		{kind: "onyx.Icon", src: "$lib/onyx/images/progress-button-cancel.png", classes: "onyx-progress-button-icon", ontap: "cancelTap"}
	],
	cancelTap: function() {
		this.doCancel();
	}
});
