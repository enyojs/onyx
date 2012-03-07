/**
A control that shows the current progress of a process in a horizontal bar.

	{kind: "onyx.ProgressBar", progress: 10}

To animate progress changes, use animateProgressTo:

	this.$.progressBar.animateProgressTo(50);
	
The properties showStripes and animateStripes can be used to show the stripes and make them animated. The animated
stripes use CSS3 gradients and animation to produce the effects.  For browsers that don't support these features
the effects will not be visible.
*/
enyo.kind({
	name: "onyx.ProgressBar",
	classes: "onyx-progress-bar",
	published: {
		progress: 0,
		min: 0,
		max: 100,
		showStripes: true,
		animateStripes: true
	},
	events: {
		onAnimateProgressFinish: ""
	},
	components: [
		{name: "progressAnimator", kind: "Animator", onStep: "progressAnimatorStep", onEnd: "progressAnimatorComplete"},
		{name: "bar", classes: "onyx-progress-bar-bar"}
	],
	create: function() {
		this.inherited(arguments);
		this.progressChanged();
		this.showStripesChanged();
		this.animateStripesChanged();
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
	animateProgressTo: function(inValue) {
		this.$.progressAnimator.play({
			startValue: this.progress,
			endValue: inValue,
			node: this.hasNode()
		});
	},
	progressAnimatorStep: function(inSender) {
		this.setProgress(inSender.value);
		return true;
	},
	progressAnimatorComplete: function(inSender) {
		this.doAnimateProgressFinish(inSender);
		return true;
	}
});