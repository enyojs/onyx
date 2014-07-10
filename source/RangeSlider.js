(function (enyo, scope) {

	/**
	* Requests that the knob label be changed
	* 
	* @event onyx.RangeSlider#event:onSetLabel
	* @type {String}
	* @public
	* @todo  Event payload is a string rather than an object
	*/

	/**
	* Fires when bar position is set
	*
	* @event onyx.RangeSlider#event:onChange
	* @type {Object}
	* @property {Number} value - New bar position
	* @property {Boolean} startChanged - Indicates that the first slider (`rangeStart`)
	* 	triggered the event
	* @public
	*/

	/**
	* Fires while control knob is being dragged
	*
	* @event onyx.RangeSlider#event:onChanging
	* @type {Object}
	* @property {Number} value - Current bar position
	* @public
	*/

	/**
	* _onyx.RangeSlider_ is a control that combines a horizontal slider with two
	* control knobs. The user may drag the knobs to select a desired range of
	* values.
	*
	* ```
	* {kind: 'onyx.RangeSlider', rangeMin: 100, rangeMax: 500, 
	* 	rangeStart: 200, rangeEnd: 400, interval: 20}
	* ```
	* 
	* {@link onyx.RangeSlider#event:onChanging} events are fired while the control knobs are 
	* being dragged, and an {@link onyx.RangeSlider#event:onChange} event is fired when the 
	* position is set by finishing a drag.
	* 
	* @class  onyx.RangeSlider
	* @extends onyx.ProgressBar
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.RangeSlider.prototype */ {
		
		/**
		* @private
		*/
		name: 'onyx.RangeSlider',
		
		/**
		* @private
		*/
		kind: 'onyx.ProgressBar',
		
		/**
		* @private
		*/
		classes: 'onyx-slider',
		
		/**
		* @lends  onyx.RangeSlider.prototype 
		* @private
		*/
		published: {
			/**
			* Minimum slider value
			* 
			* @type {Number}
			* @default  0
			* @public
			*/
			rangeMin: 0,
			
			/**
			* Maximum slider value
			* 
			* @type {Number}
			* @default  100
			* @public
			*/
			rangeMax: 100,

			/**
			* Value of first slider, expressed as an integer between 
			* {@link onyx.RangeSlider#rangeMin} and {@link onyx.RangeSlider#rangeMax}
			* 
			* @type {Number}
			* @default  0
			* @public
			*/
			rangeStart: 0,

			/**
			* Value of second slider, expressed as an integer between 
			* {@link onyx.RangeSlider#rangeMin} and {@link onyx.RangeSlider#rangeMax}
			* 
			* @type {Number}
			* @default  100
			* @public
			*/
			rangeEnd: 100,

			/**
			* Position of first slider, expressed as an integer between 0 and 100 (percentage)
			* 
			* @type {Number}
			* @default  0
			* @public
			*/
			beginValue: 0,

			/**
			* Position of second slider, expressed as an integer between 0 and 100 (percentage)
			* 
			* @type {Number}
			* @default  0
			* @public
			*/
			endValue: 0
		},
		
		/**
		* @private
		*/
		events: {
			onChange: '',
			onChanging: ''
		},

		/**
		* If true, stripes are shown in the slider bar
		* 
		* @type {Boolean}
		* @private
		*/
		showStripes: false,

		/**
		* If true, labels are shown above each slider knob
		*
		* *Design-time property*
		* 
		* @type {Boolean}
		* @public
		*/
		showLabels: false,
		
		/**
		* @private
		*/
		handlers: {
			ondragstart: 'dragstart',
			ondrag: 'drag',
			ondragfinish: 'dragfinish',
			ondown: 'down'
		},
		
		/**
		* @private
		*/
		moreComponents: [
			{name: 'startKnob', classes: 'onyx-slider-knob'},
			{name: 'endKnob', classes: 'onyx-slider-knob onyx-range-slider-knob'}
		],
		
		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.createComponents(this.moreComponents);
			this.initControls();
		},
		
		/**
		* @private
		*/
		rendered: function () {
			this.inherited(arguments);
			var p = this.calcPercent(this.beginValue);
			this.updateBarPosition(p);
		},
		
		/**
		* @private
		* @todo  Why are handlers for ondown/onup added here instead of in the components block?
		*/
		initControls: function () {
			this.$.bar.applyStyle('position', 'relative');
			this.refreshRangeSlider();
			if (this.showLabels) {
				this.$.startKnob.createComponent({name: 'startLabel', kind: 'onyx.RangeSliderKnobLabel'});
				this.$.endKnob.createComponent({name: 'endLabel', kind: 'onyx.RangeSliderKnobLabel'});
			}
			// add handlers for up/down events on knobs for pressed state (workaround for inconsistent (timing-wise) active:hover styling)
			this.$.startKnob.ondown = 'knobDown';
			this.$.startKnob.onup = 'knobUp';
			this.$.endKnob.ondown = 'knobDown';
			this.$.endKnob.onup = 'knobUp';
		},
		
		/**
		* Refreshes the knob positions
		* 
		* @private
		*/
		refreshRangeSlider: function () {
			// Calculate range percentages, in order to position sliders
			this.beginValue = this.calcKnobPercent(this.rangeStart);
			this.endValue = this.calcKnobPercent(this.rangeEnd);
			this.beginValueChanged();
			this.endValueChanged();
		},
		
		/**
		* Calculates the ratio complete given `inValue`
		* 
		* @param  {Number} inValue
		* @return {Number}         - Ratio complete between 0 and 1
		*/
		calcKnobRatio: function (inValue) {
			return (inValue - this.rangeMin) / (this.rangeMax - this.rangeMin);
		},
		
		/**
		* Calculates the percentage complete given `inValue`
		* 
		* @param  {Number} inValue
		* @return {Number}         - Percentage complete between 0 and 100
		*/
		calcKnobPercent: function (inValue) {
			return this.calcKnobRatio(inValue) * 100;
		},
		
		/**
		* @private
		*/
		beginValueChanged: function (sliderPos) {
			if (sliderPos === undefined) {
				var p = this.calcPercent(this.beginValue);
				this.updateKnobPosition(p, this.$.startKnob);
			}
		},
		
		/**
		* @private
		*/
		endValueChanged: function (sliderPos) {
			if (sliderPos === undefined) {
				var p = this.calcPercent(this.endValue);
				this.updateKnobPosition(p, this.$.endKnob);
			}
		},
		
		/**
		* Calculates the appropriate knob position during a drag event
		* @param  {Event} inEvent - Drag event
		* @return {Number}        - Knob position
		*/
		calcKnobPosition: function (inEvent) {
			var x = inEvent.clientX - this.hasNode().getBoundingClientRect().left;
			return (x / this.getBounds().width) * (this.max - this.min) + this.min;
		},
		
		/**
		* @private
		*/
		updateKnobPosition: function (inPercent, inControl) {
			inControl.applyStyle('left', inPercent + '%');
			this.updateBarPosition();
		},
		
		/**
		* Updates the position of the bar between the knobs
		* 
		* @private
		*/
		updateBarPosition: function () {
			if ((this.$.startKnob !== undefined) && (this.$.endKnob !== undefined)) {
				var barStart = this.calcKnobPercent(this.rangeStart);
				var barWidth = this.calcKnobPercent(this.rangeEnd) - barStart;
				this.$.bar.applyStyle('left', barStart + '%');
				this.$.bar.applyStyle('width', barWidth + '%');
			}
		},
		
		/**
		* Calculates the ratio of the value within the allowed range
		*
		* @return {Number}
		* @private
		*/
		calcRangeRatio: function (inValue) {
			return ((inValue / 100) * (this.rangeMax - this.rangeMin) + this.rangeMin) - (this.increment/2);
		},
		
		/**
		* Ensures the active knob is on top
		*
		* @param {String} inControl - Name of active knob
		* @private
		*/
		swapZIndex: function (inControl) {
			if (inControl === 'startKnob') {
				this.$.startKnob.applyStyle('z-index', 1);
				this.$.endKnob.applyStyle('z-index', 0);
			} else if (inControl === 'endKnob') {
				this.$.startKnob.applyStyle('z-index', 0);
				this.$.endKnob.applyStyle('z-index', 1);
			}
		},
		
		/**
		* @private
		*/
		down: function (inSender, inEvent) {
			this.swapZIndex(inSender.name);
		},
		
		/**
		* @private
		*/
		dragstart: function (inSender, inEvent) {
			if (inEvent.horizontal) {
				inEvent.preventDefault();
				this.dragging = true;
				inSender.addClass('pressed');
				return true;
			}
		},
		
		/**
		* @fires onyx.RangeSlider#event:onChanging
		* @private
		*/
		drag: function (inSender, inEvent) {
			if (this.dragging) {
				var knobPos = this.calcKnobPosition(inEvent);
				var _val, val, p;

				if ((inSender.name === 'startKnob') && (knobPos >= 0)) {
					if (((knobPos <= this.endValue) && (inEvent.xDirection === -1)) || (knobPos <= this.endValue)) {
						this.setBeginValue(knobPos);
						_val = this.calcRangeRatio(this.beginValue);
						val = (this.increment) ? this.calcIncrement(_val+0.5*this.increment) : _val;
						p = this.calcKnobPercent(val);
						this.updateKnobPosition(p, this.$.startKnob);
						this.setRangeStart(val);
						this.doChanging({value: val});
					} else {
						return this.drag(this.$.endKnob, inEvent);
					}
				} else if ((inSender.name === 'endKnob') && (knobPos <= 100)) {
					if (((knobPos >= this.beginValue) && (inEvent.xDirection === 1)) || (knobPos >= this.beginValue)) {
						this.setEndValue(knobPos);
						_val = this.calcRangeRatio(this.endValue);
						val = (this.increment) ? this.calcIncrement(_val+0.5*this.increment) : _val;
						p = this.calcKnobPercent(val);
						this.updateKnobPosition(p, this.$.endKnob);
						this.setRangeEnd(val);
						this.doChanging({value: val});
					} else {
						return this.drag(this.$.startKnob, inEvent);
					}
				}
				return true;
			}
		},
		
		/**
		* @fires onyx.RangeSlider#event:onChange
		* @private
		*/
		dragfinish: function (inSender, inEvent) {
			this.dragging = false;
			inEvent.preventTap();
			var val;
			if (inSender.name === 'startKnob') {
				val = this.calcRangeRatio(this.beginValue);
				this.doChange({value: val, startChanged: true});
			} else if (inSender.name === 'endKnob') {
				val = this.calcRangeRatio(this.endValue);
				this.doChange({value: val, startChanged: false});
			}
			inSender.removeClass('pressed');
			return true;
		},
		
		/**
		* @private
		*/
		knobDown: function (inSender, inEvent) {
			inSender.addClass('pressed');
		},
		
		/**
		* @private
		*/
		knobUp: function (inSender, inEvent) {
			inSender.removeClass('pressed');
		},
		
		/**
		* @private
		*/
		rangeMinChanged: function () {
			this.refreshRangeSlider();
		},
		
		/**
		* @private
		*/
		rangeMaxChanged: function () {
			this.refreshRangeSlider();
		},
		
		/**
		* @private
		*/
		rangeStartChanged: function () {
			this.refreshRangeSlider();
		},
		
		/**
		* @private
		*/
		rangeEndChanged: function () {
			this.refreshRangeSlider();
		},
		
		/**
		* Set the label of the start knob
		* 
		* @param {String} inContent - New knob label
		* @fires onyx.RangeSlider#event:onSetLabel
		* @public
		*/
		setStartLabel: function (inContent) {
			this.$.startKnob.waterfallDown('onSetLabel', inContent);
		},
		
		/**
		* Sets the label of the end knob
		* 
		* @param {String} inContent - New knob label
		* @fires onyx.RangeSlider#event:onSetLabel
		* @public
		*/
		setEndLabel: function (inContent) {
			this.$.endKnob.waterfallDown('onSetLabel', inContent);
		}
	});

	/**
	* _onyx.RangeSliderKnobLabel_ provides the labels for the knobs
	* within a {@link onyx.RangeSlider}
	* 
	* @class onyx.RangeSliderKnobValue
	* @extends enyo.Control
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.RangeSliderKnobLabel */ {
		
		/**
		* @private
		*/
		name: 'onyx.RangeSliderKnobLabel',
		
		/**
		* @private
		*/
		classes: 'onyx-range-slider-label',
		
		/**
		* @private
		*/
		handlers: {
			onSetLabel: 'setLabel'
		},
		
		/**
		* Handler {@link onyx.RangeSlider#event:onSetLabel}
		* 
		* @private
		*/
		setLabel: function (inSender, inContent) {
			this.setContent(inContent);
		}
	});

})(enyo, this);
