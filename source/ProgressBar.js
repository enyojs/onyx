/**
	_onyx.ProgressBar_ is a  control that shows the current progress of a
	process in a horizontal bar.
	
		{kind: "onyx.ProgressBar", progress: 10}
	
	To animate progress changes, call the _animateProgressTo_ method:
	
		this.$.progressBar.animateProgressTo(50);
		
	You may customize the color of the bar by applying a style via the
	_barClasses_ property, e.g.:
	
		{kind: "onyx.ProgressBar", barClasses: "onyx-dark"}
	
	For more information, see the documentation on
	<a href="https://github.com/enyojs/enyo/wiki/Progress-Indicators">Progress Indicators</a>
	in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.ProgressBar",
	classes: "onyx-progress-bar",
	published: {
		//* Current position of progress bar
		progress: 0,
		//* Minimum progress value (i.e., no progress made)
		min: 0,
		//* Maximum progress value (i.e., process complete)
		max: 100,
		//* CSS classes to apply to progress bar
		barClasses: "",
		//* If true, stripes are shown in progress bar
		showStripes: true,
		//* If true (and _showStripes_ is true), stripes shown in progress bar
		//* are animated
		animateStripes: true
	},
	events: {
		//* Fires when progress bar finishes animating to a position.
		onAnimateProgressFinish: ""
	},
	//* @protected
	components: [
		{name: "progressAnimator", kind: "Animator", onStep: "progressAnimatorStep", onEnd: "progressAnimatorComplete"},
		{name: "bar", classes: "onyx-progress-bar-bar"}
	],
	create: function() {
		this.inherited(arguments);
		this.progressChanged();
		this.barClassesChanged();
		this.showStripesChanged();
		this.animateStripesChanged();
	},
	barClassesChanged: function(inOld) {
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},
	showStripesChanged: function() {
		this.$.bar.addRemoveClass("striped", this.showStripes);
	},
	animateStripesChanged: function() {
		this.$.bar.addRemoveClass("animated", this.animateStripes);
	},
	progressChanged: function() {
		this.progress = this.clampValue(this.min, this.max, this.progress);
		var p = this.calcPercent(this.progress);
		this.updateBarPosition(p);
	},
	clampValue: function(inMin, inMax, inValue) {
		return Math.max(inMin, Math.min(inValue, inMax));
	},
	calcRatio: function(inValue) {
		return (inValue - this.min) / (this.max - this.min);
	},
	calcPercent: function(inValue) {
		return this.calcRatio(inValue) * 100;
	},
	updateBarPosition: function(inPercent) {
		this.$.bar.applyStyle("width", inPercent + "%");
	},
	//* @public
	//* Animates progress to the given value.
	animateProgressTo: function(inValue) {
		this.$.progressAnimator.play({
			startValue: this.progress,
			endValue: inValue,
			node: this.hasNode()
		});
	},
	//* @protected
	progressAnimatorStep: function(inSender) {
		this.setProgress(inSender.value);
		return true;
	},
	progressAnimatorComplete: function(inSender) {
		this.doAnimateProgressFinish(inSender);
		return true;
	}
});