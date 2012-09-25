/**
	_onyx.RangeSlider_ is a control that presents a range of selection values in the
	form of a horizontal slider with two control knobs. The knobs may be dragged	
	to the desired location.
	
		{kind: "onyx.RangeSlider", rangeMin: 100, rangeMax: 500, rangeStart: 200, rangeEnd: 400, interval: 20}
	
	_onChanging_ events are fired while the control knobs are being dragged, and
	an _onChange_ event is fired when the position is set, by finishing a drag.
*/
enyo.kind({
	name: "onyx.RangeSlider",
	kind: "onyx.ProgressBar",
	classes: "onyx-slider",
	published: {
		//* @public
		//* Minimum value sliders can be positioned
		rangeMin: 0,
		//* Maximum value sliders can be positioned
		rangeMax: 100,
		//* Value of 1st slider, expressed as an integer between rangeMin and rangeMax,
		rangeStart: 0,
		//* Value of 2nd slider, expressed as an integer between rangeMin and rangeMax,
		rangeEnd: 100,
		//* Value range increment that the sliders can be "snapped to" in either direction,
		increment: 0,
		//* @protected
		// Position of 1st slider, expressed as an integer between 0 and 100 (percentage),
		beginValue: 0,
		// Position of 2nd slider, expressed as an integer between 0 and 100 (percentage),
		endValue: 0
	},
	//* @public
	events: {
		//* Fires when bar position is set. The _value_ property contains the
		//* new position. The _startChanged_ property is a boolean value that
		//* indicates whether the 1st slider (rangeStart) triggered this event 
		onChange: "",
		//* Fires while control knob is being dragged. The _value_ property
		//* contains the current position.
		onChanging: ""
	},
	//* If true, stripes are shown in the slider bar
	showStripes: false,
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
	}
});