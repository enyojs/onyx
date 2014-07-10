(function (enyo, scope) {

	/**
	* Fires when progress bar finishes animating to a position
	*
	* @event onyx.ProgressBar#event:onAnimateProgressFinish
	* @type {enyo.Animator}
	* @todo Not sure why the animator is passed as the payload to the event ...
	* @public
	*/

	/**
	* _onyx.ProgressBar_ is a  control that shows the current progress of a
	* process in a horizontal bar.
	*
	* ```
	* {kind: 'onyx.ProgressBar', progress: 10}
	* ```
	* 
	* To animate progress changes, call the {@link onyx.ProgressBar#animateProgressTo} method:
	*
	* ```
	* this.$.progressBar.animateProgressTo(50);
	* ```
	* 
	* You may customize the color of the bar by applying a style via the
	* {@link onyx.ProgressBar#barClasses} property, e.g.:
	*
	* ```
	* {kind: 'onyx.ProgressBar', barClasses: 'onyx-dark'}
	* ```
	* 
	* For more information, see the documentation on [Progress
	* Indicators](building-apps/controls/progress-indicators.html) in the Enyo
	* Developer Guide.
	*
	* @class  onyx.ProgressBar
	* @extends enyo.Control
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.ProgressBar.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.ProgressBar',

		/**
		* @private
		*/
		classes: 'onyx-progress-bar',

		/**
		* @lends  onyx.ProgressBar.prototype
		* @private
		*/
		published: {
			/**
			* Current position of progress bar
			* 
			* @type {Number}
			* @default  0
			* @public
			*/
			progress: 0,

			/**
			* Minimum progress value (i.e., no progress made)
			* 
			* @type {Number}
			* @default  0
			* @public
			*/
			min: 0,

			/**
			* Maximum progress value (i.e., process complete)
			* 
			* @type {Number}
			* @default  100
			* @public
			*/
			max: 100,

			/**
			* CSS classes to apply to progress bar
			* 
			* @type {String}
			* @default  ''
			* @public
			*/
			barClasses: '',

			/**
			* If true, stripes are shown in progress bar
			* 
			* @type {Boolean}
			* @default  true
			* @public
			*/
			showStripes: true,

			/**
			* If true (and _showStripes_ is true), stripes shown in progress bar are animated
			* 
			* @type {Boolean}
			* @default  true
			* @public
			*/
			animateStripes: true,

			/**
			* Sliders may be 'snapped to' multiples of this value in either direction
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
			{name: 'progressAnimator', kind: 'enyo.Animator', onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
			{name: 'bar', classes: 'onyx-progress-bar-bar'}
		],

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.progressChanged();
			this.barClassesChanged();
			this.showStripesChanged();
			this.animateStripesChanged();
		},

		/**
		* @private
		*/
		barClassesChanged: function (inOld) {
			this.$.bar.removeClass(inOld);
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
		* Clamps `inValue` to the nearest {@link onyx.ProgressBar#increment} value.
		* 
		* @param  {Number} inValue - value to clamp
		* @return {Number}         - clamped value
		* @private
		*/
		calcIncrement: function (inValue) {
			return (Math.round(inValue / this.increment) * this.increment);
		},

		/**
		* Ensures `inValue` is between `inMin` and `inMax`
		* 
		* @param  {Number} inMin   - minimum value
		* @param  {Number} inMax   - maximum value
		* @param  {Number} inValue - value to clamp
		* @return {Number}         - clamped value
		* @private
		*/
		clampValue: function (inMin, inMax, inValue) {
			return Math.max(inMin, Math.min(inValue, inMax));
		},

		/**
		* Calculates the ratio complete
		* 
		* @param  {Number} inValue - Value between `min` and `max`
		* @return {Number}         - Ratio complete (between 0 and 1)
		* @private
		*/
		calcRatio: function (inValue) {
			return (inValue - this.min) / (this.max - this.min);
		},

		/**
		* Calculates the percent complete
		* 
		* @param  {Number} inValue - Value between `min` and `max`
		* @return {Number}         - Percent complete (between 0 and 100)
		* @private
		*/
		calcPercent: function (inValue) {
			return this.calcRatio(inValue) * 100;
		},

		/**
		* Positions the progress bar at `inPercent`
		* 
		* @param  {Number} inPercent - Percent complete
		* @private
		*/
		updateBarPosition: function (inPercent) {
			this.$.bar.applyStyle('width', inPercent + '%');
		},

		/**
		* Animates progress to the given value
		* 
		* @param  {Number} inValue - Desired value. Will be clamped between
		* 	{@link onyx.ProgressBar#min} and {@link onyx.ProgressBar#max}
		* @public
		*/
		animateProgressTo: function (inValue) {
			this.$.progressAnimator.play({
				startValue: this.progress,
				endValue: inValue,
				node: this.hasNode()
			});
		},

		/**
		* Handler for {@link enyo.Animator#event:onStep}
		* 
		* @private
		*/
		progressAnimatorStep: function (inSender) {
			this.setProgress(inSender.value);
			return true;
		},

		/**
		* Handler for {@link enyo.Animator#event:onEnd}
		* 
		* @fires onyx.ProgressBar#event:onAnimateProgressFinish
		* @private
		*/
		progressAnimatorComplete: function (inSender) {
			this.doAnimateProgressFinish(inSender);
			return true;
		}
	});

})(enyo, this);