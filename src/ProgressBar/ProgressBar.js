require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ProgressBar~ProgressBar} kind.
* @module onyx/ProgressBar
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control');

/**
* Fires when progress bar finishes animating to a position.
*
* @event module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish
* @type {module:enyo/Animator~Animator}
* @todo Not sure why the animator is passed as the payload to the event ...
* @public
*/

/**
* {@link module:onyx/ProgressBar~ProgressBar} is a control that shows the current progress of a
* process in a horizontal bar.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('onyx/ProgressBar');
*
* 	{kind: ProgressBar, progress: 10}
* ```
*
* To animate a progress change, call the
* [animateProgressTo()]{@link module:onyx/ProgressBar~ProgressBar#animateProgressTo} method:
*
* ```javascript
* 	this.$.progressBar.animateProgressTo(50);
* ```
*
* You may customize the color of the bar by applying a style via the
* [barClasses]{@link module:onyx/ProgressBar~ProgressBar#barClasses} property, e.g.:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('onyx/ProgressBar');
*
* 	{kind: ProgressBar, barClasses: 'onyx-dark'}
* ```
*
* @class ProgressBar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ProgressBar~ProgressBar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ProgressBar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-progress-bar',

	/**
	* @lends module:onyx/ProgressBar~ProgressBar.prototype
	* @private
	*/
	published: {
		/**
		* Current position of progress bar.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		progress: 0,

		/**
		* Minimum progress value (i.e., no progress made).
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		min: 0,

		/**
		* Maximum progress value (i.e., process complete).
		*
		* @type {Number}
		* @default  100
		* @public
		*/
		max: 100,

		/**
		* CSS classes to apply to progress bar.
		*
		* @type {String}
		* @default  ''
		* @public
		*/
		barClasses: '',

		/**
		* When `true`, stripes are shown in progress bar.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		showStripes: true,

		/**
		* If `true` (and [showStripes]{@link module:onyx/ProgressBar~ProgressBar#showStripes} is `true`),
		* stripes shown in progress bar are animated.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		animateStripes: true,

		/**
		* Sliders may be "snapped to" multiples of this value in either direction.
		*
		* @type {Number}
		* @default  0
		* @public
		* @todo  This doesn't appear to be supported. Only referenced by a method which
		* 	itself isn't called by anthing
		*/
		increment: 0
	},

	/**
	* @private
	*/
	events: {
		onAnimateProgressFinish: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'progressAnimator', kind: Animator, onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
		{name: 'bar', classes: 'onyx-progress-bar-bar'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.progressChanged();
		this.barClassesChanged();
		this.showStripesChanged();
		this.animateStripesChanged();
	},

	/**
	* @private
	*/
	barClassesChanged: function (old) {
		this.$.bar.removeClass(old);
		this.$.bar.addClass(this.barClasses);
	},

	/**
	* @private
	*/
	showStripesChanged: function () {
		this.$.bar.addRemoveClass('striped', this.showStripes);
	},

	/**
	* @private
	*/
	animateStripesChanged: function () {
		this.$.bar.addRemoveClass('animated', this.animateStripes);
	},

	/**
	* @private
	*/
	progressChanged: function () {
		this.progress = this.clampValue(this.min, this.max, this.progress);
		var p = this.calcPercent(this.progress);
		this.updateBarPosition(p);
	},

	/**
	* Clamps a specified value to the nearest [increment]{@link module:onyx/ProgressBar~ProgressBar#increment}
	* value.
	*
	* @param  {Number} value - The value to clamp.
	* @return {Number}         - The clamped value.
	* @private
	*/
	calcIncrement: function (value) {
		return (Math.round(value / this.increment) * this.increment);
	},

	/**
	* Ensures that passed-in value is between the specified minimum and maximum.
	*
	* @param  {Number} min   - Minimum value.
	* @param  {Number} max   - Maximum value.
	* @param  {Number} value - The value to clamp.
	* @return {Number}         - The clamped value.
	* @private
	*/
	clampValue: function (min, max, value) {
		return Math.max(min, Math.min(value, max));
	},

	/**
	* Calculates the completion ratio.
	*
	* @param  {Number} value - Value between `min` and `max`.
	* @return {Number}         - Completion ratio (between `0` and `1`).
	* @private
	*/
	calcRatio: function (value) {
		return (value - this.min) / (this.max - this.min);
	},

	/**
	* Calculates the completion percentage.
	*
	* @param  {Number} value - Value between `min` and `max`.
	* @return {Number}         - Completion percentage (between `0` and `100`).
	* @private
	*/
	calcPercent: function (value) {
		return this.calcRatio(value) * 100;
	},

	/**
	* Positions the progress bar at specified completion percentage.
	*
	* @param  {Number} percent - Completion percentage corresponding to desired position.
	* @private
	*/
	updateBarPosition: function (percent) {
		this.$.bar.applyStyle('width', percent + '%');
	},

	/**
	* Animates progress to the given value.
	*
	* @param  {Number} value - The desired value. Will be clamped between
	* 	[min]{@link module:onyx/ProgressBar~ProgressBar#min} and [max]{@link module:onyx/ProgressBar~ProgressBar#max}.
	* @public
	*/
	animateProgressTo: function (value) {
		this.$.progressAnimator.play({
			startValue: this.progress,
			endValue: value,
			node: this.hasNode()
		});
	},

	/**
	* Handles [onStep]{@link module:enyo/Animator~Animator#onStep} animation events.
	*
	* @private
	*/
	progressAnimatorStep: function (sender) {
		this.setProgress(sender.value);
		return true;
	},

	/**
	* Handles [onEnd]{@link module:enyo/Animator~Animator#onEnd} animation events.
	*
	* @fires module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish
	* @private
	*/
	progressAnimatorComplete: function (sender) {
		this.doAnimateProgressFinish(sender);
		return true;
	}
});
