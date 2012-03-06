/**
A progress bar that looks like a list item.

	{kind: "onyx.ProgressButton"}

*/
enyo.kind({
	name: "onyx.ProgressButton",
	kind: "onyx.ProgressBar",
	classes: "onyx-progress-button",
	events: {
		onCancel: ""
	},
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
