/**
	_onyx.Slider_ is a control that presents a range of selection options in the
	form of a horizontal slider with a control knob. The knob may be tapped and
	dragged	to the desired location.

		{kind: "onyx.Slider", value: 30}

	_onChanging_ events are fired while the control knob is being dragged, and
	an _onChange_ event is fired when the position is set, either by finishing a
	drag or by tapping the bar.

	For more information, see the documentation on
	<a href="https://github.com/enyojs/enyo/wiki/Progress-Indicators">Progress Indicators</a>
	in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.Slider",
	kind: "onyx.ProgressBar",
	classes: "onyx-slider",
	published: {
		//* Position of slider, expressed as an integer between 0 and 100,
		//* inclusive
		value: 0,
		//* If true, current progress will be styled differently from rest of bar
		lockBar: true,
		//* If true, tapping on bar will change current position
		tappable: true
	},
	events: {
		//* Fires when bar position is set. The _value_ property contains the
		//* new position.
		onChange: "",
		//* Fires while control knob is being dragged. The _value_ property
		//* contains the current position.
		onChanging: "",
		//* Fires when animation to a position finishes.
		onAnimateFinish: ""
	},
	//* If true, stripes are shown in the slider bar
	showStripes: false,
	//* @protected
	handlers: {
		ondragstart: "dragstart",
		ondrag: "drag",
		ondragfinish: "dragfinish"
	},
	moreComponents: [
		{kind: "Animator", onStep: "animatorStep", onEnd: "animatorComplete"},
		{classes: "onyx-slider-taparea"},
		{name: "knob", classes: "onyx-slider-knob"}
	],
	create: function() {
		this.inherited(arguments);
		//workaround for FirefoxOS which doesn't support :active:hover css selectors
		if(enyo.platform.firefoxOS) {
			this.moreComponents[2].ondown = "down";
			this.moreComponents[2].onleave = "leave";
		}
		this.createComponents(this.moreComponents);
		this.valueChanged();
	},
	valueChanged: function() {
		this.value = this.clampValue(this.min, this.max, this.value);
		var p = this.calcPercent(this.value);
		this.updateKnobPosition(p);
		if (this.lockBar) {
			this.setProgress(this.value);
		}
	},
	updateKnobPosition: function(inPercent) {
		this.$.knob.applyStyle("left", inPercent + "%");
	},
	calcKnobPosition: function(inEvent) {
		var x = inEvent.clientX - this.hasNode().getBoundingClientRect().left;
		return (x / this.getBounds().width) * (this.max - this.min) + this.min;
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
			var v = this.calcKnobPosition(inEvent);
			v = (this.increment) ? this.calcIncrement(v) : v;
			this.setValue(v);
			this.doChanging({value: this.value});
			return true;
		}
	},
	dragfinish: function(inSender, inEvent) {
		this.dragging = false;
		inEvent.preventTap();
		this.doChange({value: this.value});
		return true;
	},
	tap: function(inSender, inEvent) {
		if (this.tappable) {
			var v = this.calcKnobPosition(inEvent);
			v = (this.increment) ? this.calcIncrement(v) : v;
			this.tapped = true;
			this.animateTo(v);
			return true;
		}
	},
	down: function(inSender, inEvent) {
		this.addClass("pressed");
	},
	leave: function(inSender, inEvent) {
		this.removeClass("pressed");
	},
	//* @public
	//* Animates to the given value.
	animateTo: function(inValue) {
		this.$.animator.play({
			startValue: this.value,
			endValue: inValue,
			node: this.hasNode()
		});
	},
	//* @protected
	animatorStep: function(inSender) {
		this.setValue(inSender.value);
		return true;
	},
	animatorComplete: function(inSender) {
		if (this.tapped) {
			this.tapped = false;
			this.doChange({value: this.value});
		}
		this.doAnimateFinish(inSender);
		return true;
	}
});
