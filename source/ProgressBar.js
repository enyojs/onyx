/**
A control that shows the current progress of a process in a horizontal bar.

	{kind: "onyx.ProgressBar", progress: 10}

To animate progress changes, use animateProgressTo:

	this.$.progressBar.animateProgressTo(50);
*/
enyo.kind({
	name: "onyx.ProgressBar",
	classes: "onyx-progress-bar",
	published: {
		progress: 0,
		min: 0,
		max: 100
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