/**
	_onyx.ProgressBar_ is a  control that shows the current progress of a
	process in a horizontal bar.

		{kind: "onyx.ProgressBar", progress: 10}

	To animate progress changes, call the _animateProgressTo()_ method:

		this.$.progressBar.animateProgressTo(50);

	You may customize the color of the bar by applying a style via the
	_barClasses_ property, e.g.:

		{kind: "onyx.ProgressBar", barClasses: "onyx-dark"}

	For more information, see the documentation on [Progress
	Indicators](building-apps/controls/progress-indicators.html) in the Enyo
	Developer Guide.
*/
enyo.kind({
	name: "onyx.ProgressBar",
	kind: "enyo.common.ProgressBar",
	classes: "onyx-progress-bar",
	//* @protected
	_barClasses: "onyx-progress-bar-bar"
});
