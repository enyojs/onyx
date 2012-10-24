/**
    _onyx.RangeSlider_ is a control that combines a horizontal slider with two
    control knobs. The user may drag the knobs to select a desired range of
    values.

        {kind: "onyx.RangeSlider", rangeMin: 100, rangeMax: 500,
            rangeStart: 200, rangeEnd: 400, interval: 20}

    _onChanging_ events are fired while the control knobs are being dragged, and
    an _onChange_ event is fired when the position is set by finishing a drag.
*/
enyo.kind({
	name: "onyx.RangeSlider",
	kind: "onyx.ProgressBar",
	classes: "onyx-slider",
	published: {
		//* @public
		//* Minimum slider value
		rangeMin: 0,
		//* Maximum slider value
		rangeMax: 100,
		/**
		    Value of first slider, expressed as an integer between _rangeMin_
		    and _rangeMax_
		*/
		rangeStart: 0,
		/**
		    Value of second slider, expressed as an integer between _rangeMin_
		    and _rangeMax_
		*/
		rangeEnd: 100,
		//* Value range increment that the sliders can be "snapped to" in either direction
		increment: 0,
		//* @protected
		// Position of first slider, expressed as an integer between 0 and 100 (percentage)
		beginValue: 0,
		// Position of second slider, expressed as an integer between 0 and 100 (percentage)
		endValue: 0
	},
	//* @public
	events: {
		/**
		    Fires when bar position is set.

		    _inEvent.value_ contains the new position.
		    
		    _inEvent.startChanged_ is a boolean value indicating whether the
		    first slider (_rangeStart_) triggered the event.
		*/
		onChange: "",
		/**
		    Fires while control knob is being dragged.

		    _inEvent.value_ contains the current position.
		*/
		onChanging: ""
	},
	//* If true, stripes are shown in the slider bar
	showStripes: false,
	//* If true, labels are shown above each slider knob
	showLabels: false,
	//* @protected
	handlers: {
		ondragstart: "dragstart",
		ondrag: "drag",
		ondragfinish: "dragfinish",
		ondown: "down"
	},
	moreComponents: [
		{name: "startKnob", classes: "onyx-slider-knob"},
		{name: "endKnob", classes: "onyx-slider-knob onyx-range-slider-knob"}
	],
	create: function() {
		this.inherited(arguments);
		this.createComponents(this.moreComponents);
		this.initControls();
	},
	rendered: function() {
		this.inherited(arguments);
		var p = this.calcPercent(this.beginValue);
		this.updateBarPosition(p);
	},
	initControls: function() {
		this.$.bar.applyStyle("position", "relative");
		this.refreshRangeSlider();
		if (this.showLabels) {
			this.$.startKnob.createComponent({name: "startLabel", kind: "onyx.RangeSliderKnobLabel"});
			this.$.endKnob.createComponent({name: "endLabel", kind: "onyx.RangeSliderKnobLabel"});
		}
	},
	refreshRangeSlider: function() {
		// Calculate range percentages, in order to position sliders
		this.beginValue = this.calcKnobPercent(this.rangeStart);
		this.endValue = this.calcKnobPercent(this.rangeEnd);
		this.beginValueChanged();
		this.endValueChanged();
	},
	calcKnobRatio: function(inValue) {
		return (inValue - this.rangeMin) / (this.rangeMax - this.rangeMin);
	},
	calcKnobPercent: function(inValue) {
		return this.calcKnobRatio(inValue) * 100;
	},
	beginValueChanged: function(sliderPos) {
		if (sliderPos === undefined) {
			var p = this.calcPercent(this.beginValue);
			this.updateKnobPosition(p, this.$.startKnob);
		}
	},
	endValueChanged: function(sliderPos) {
		if (sliderPos === undefined) {
			var p = this.calcPercent(this.endValue);
			this.updateKnobPosition(p, this.$.endKnob);
		}
	},
	calcKnobPosition: function(inEvent) {
		var x = inEvent.clientX - this.hasNode().getBoundingClientRect().left;
		return (x / this.getBounds().width) * (this.max - this.min) + this.min;
	},
	updateKnobPosition: function(inPercent, inControl) {
		inControl.applyStyle("left", inPercent + "%");
		this.updateBarPosition();
	},
	updateBarPosition: function() {
		if ((this.$.startKnob !== undefined) && (this.$.endKnob !== undefined)) {
			var barStart = this.calcKnobPercent(this.rangeStart);
			var barWidth = this.calcKnobPercent(this.rangeEnd) - barStart;
			this.$.bar.applyStyle("left", barStart + "%");
			this.$.bar.applyStyle("width", barWidth + "%");
		}
	},
	calcIncrement: function(inValue) {
    	return (Math.ceil(inValue / this.increment) * this.increment);
	},
	calcRangeRatio: function(inValue) {
		return ((inValue / 100) * (this.rangeMax - this.rangeMin) + this.rangeMin) - (this.increment/2);
	},
	swapZIndex: function(inControl) {
		if (inControl === "startKnob") {
			this.$.startKnob.applyStyle("z-index", 1);
			this.$.endKnob.applyStyle("z-index", 0);
		} else if (inControl === "endKnob") {
			this.$.startKnob.applyStyle("z-index", 0);
			this.$.endKnob.applyStyle("z-index", 1);
		}
	},
	down: function(inSender, inEvent) {
		this.swapZIndex(inSender.name);
	},
	dragstart: function(inSender, inEvent) {
		if (inEvent.horizontal) {
			inEvent.preventDefault();
			this.dragging = true;
			return true;
		}
	},
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			var knobPos = this.calcKnobPosition(inEvent);

			if ((inSender.name === "startKnob") && (knobPos >= 0)) {
				if (((knobPos <= this.endValue) && (inEvent.xDirection === -1)) || (knobPos <= this.endValue)) {
					this.setBeginValue(knobPos);
					var _val = this.calcRangeRatio(this.beginValue);
					var val = (this.increment) ? this.calcIncrement(_val) : _val;
					var p = this.calcKnobPercent(val);
					this.updateKnobPosition(p, this.$.startKnob);
					this.setRangeStart(val);
					this.doChanging({value: val});
				}
			} else if ((inSender.name === "endKnob") && (knobPos <= 100)) {
				if (((knobPos >= this.beginValue) && (inEvent.xDirection === 1)) || (knobPos >= this.beginValue)) {
					this.setEndValue(knobPos);
					var _val = this.calcRangeRatio(this.endValue);
					var val = (this.increment) ? this.calcIncrement(_val) : _val;
					var p = this.calcKnobPercent(val);
					this.updateKnobPosition(p, this.$.endKnob);
					this.setRangeEnd(val);
					this.doChanging({value: val});
				}
			}
			return true;
		}
	},
	dragfinish: function(inSender, inEvent) {
		this.dragging = false;
		inEvent.preventTap();

		if (inSender.name === "startKnob") {
			var val = this.calcRangeRatio(this.beginValue);
			this.doChange({value: val, startChanged: true});
		} else if (inSender.name === "endKnob") {
			var val = this.calcRangeRatio(this.endValue);
			this.doChange({value: val, startChanged: false});
		}
		return true;
	},
	rangeMinChanged: function() {
		this.refreshRangeSlider();
	},
	rangeMaxChanged: function() {
		this.refreshRangeSlider();
	},
	rangeStartChanged: function() {
		this.refreshRangeSlider();
	},
	rangeEndChanged: function() {
		this.refreshRangeSlider();
	},
	setStartLabel: function(inContent) {
		this.$.startKnob.waterfallDown("onSetLabel", inContent);
	},
	setEndLabel: function(inContent) {
		this.$.endKnob.waterfallDown("onSetLabel", inContent);
	}
});

enyo.kind({
	name: "onyx.RangeSliderKnobLabel",
	classes: "onyx-range-slider-label",
	handlers: {
		onSetLabel: "setLabel"
	},
	setLabel: function(inSender, inContent) {
		this.setContent(inContent);
	},
});
