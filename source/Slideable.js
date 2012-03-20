/**
	Slideable is a control that can be dragged either left/right or up/down between a minimum and maximum value.
	When relesed from dragging, a Slideable will animate to it's minimum or maximum position based on the direction dragged.

	The min value may be specified to indicate a position left or top of initial position to which the Slideable may be dragged.
	The max value may be specified to indicate a position right or bottom of initial position to which the Slideable may be dragged.
	The value property may be specified to position the Slideable between its minimum and maximum positions.

	The units may be specified as "px" or "%" and indicate the unit for min, max, and value. The axis property controls if the 
	Slideable slides left-right (h) or up-down (v).

	The following control is placed 90% off the screen to the right and slides to its natural position.

		{kind: "onyx.Slideable", value: -90, min: -90, unit: "%", classes: "enyo-fit", style: "width: 300px;", components: [
			{content: "stuff"}
		]}
*/
enyo.kind({
	name: "onyx.Slideable",
	kind: "Control",
	published: {
		//* Specifies direction of sliding h or v
		axis: "h",
		//* A value between min and max to position the Slideable
		value: 0,
		//* Unit for min, max, and value; can be "px" or "%"
		unit: "px",
		//* A minimum value to slide to
		min: 0,
		//* A maximum value to slide to
		max: 0,
		accelerated: "auto",
		//* Set to false to prevent the Slideable from dragging with elasticity past its min/max value.
		overMoving: true,
		//* Set to false to disable dragging.
		draggable: true
	},
	events: {
		//* Event which fires when the Slideable finishes animating.
		onAnimateFinish: "",
		onChange: ""
	},
	// Set to true to prevent a drag from bubbling beyond the Slideable.
	preventDragPropagation: false,
	//* @protected
	tools: [
		{kind: "Animator", onStep: "animatorStep", onEnd: "animatorComplete"}
	],
	handlers: {
		ondragstart: "dragstart",
		ondrag: "drag",
		ondragfinish: "dragfinish"
	},
	kDragScalar: 1,
	dragEventProp: "dx",
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.acceleratedChanged();
		this.axisChanged();
		this.valueChanged();
		this.addClass("enyo-slideable");
	},
	initComponents: function() {
		this.createComponents(this.tools);
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
		this.updateDragScalar();
	},
	resizeHandler: function() {
		this.inherited(arguments);
		this.updateDragScalar();
	},
	updateDragScalar: function() {
		if (this.unit == "%") {
			var d = this.getBounds()[this.dimension];
			this.kDragScalar = d ? 100 / d : 1;
		}
	},
	acceleratedChanged: function() {
		enyo.Layout.accelerate(this, this.accelerated);
	},
	axisChanged: function() {
		var h = this.axis == "h";
		this.dragMoveProp = h ? "dx" : "dy";
		this.shouldDragProp = h ? "horizontal" : "vertical";
		this.transform = h ? "translateX" : "translateY";
		this.dimension = h ? "width" : "height";
	},
	valueChanged: function() {
		var v = this.value;
		if (this.isOob(v) && !this.isAnimating()) {
				this.value = this.overMoving ? this.dampValue(v) : this.clampValue(v);
		}
		enyo.Layout.transformValue(this, this.transform, this.value + this.unit);
		this.doChange();
	},
	getAnimator: function() {
		return this.$.animator;
	},
	isAtMin: function() {
		return this.value <= this.calcMin();
	},
	isAtMax: function() {
		return this.value >= this.calcMax();
	},
	calcMin: function() {
		return this.min;
	},
	calcMax: function() {
		return this.max;
	},
	clampValue: function(inValue) {
		var min = this.calcMin();
		var max = this.calcMax();
		return Math.max(min, Math.min(inValue, max));
	},
	dampValue: function(inValue) {
		return this.dampBound(this.dampBound(inValue, this.min, 1), this.max, -1);
	},
	dampBound: function(inValue, inBoundary, inSign) {
		var v = inValue;
		if (v * inSign < inBoundary * inSign) {
			v = inBoundary + (v - inBoundary) / 4;
		}
		return v;
	},
	// dragging
	shouldDrag: function(inEvent) {
		return this.draggable && inEvent[this.shouldDragProp];
	},
	isOob: function(inValue) {
		return inValue > this.calcMax() || inValue < this.calcMin();
	},
	dragstart: function(inSender, inEvent) {
		if (this.shouldDrag(inEvent)) {
			inEvent.preventNativeDefault();
			this.$.animator.stop();
			inEvent.dragInfo = {};
			this.dragging = true;
			this.drag0 = this.value;
			this.dragd0 = 0;
			return this.preventDragPropagation;
		}
	},
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			inEvent.preventNativeDefault();
			var d = inEvent[this.dragMoveProp] * this.kDragScalar;
			var v = this.drag0 + d;
			var dd = d - this.dragd0;
			this.dragd0 = d;
			if (dd) {
				inEvent.dragInfo.minimizing = dd < 0;
			}
			this.setValue(v);
			return this.preventDragPropagation;
		}
	},
	dragfinish: function(inSender, inEvent) {
		if (this.dragging) {
			this.dragging = false;
			this.completeDrag(inEvent);
			inEvent.preventTap();
			return this.preventDragPropagation;
		}
	},
	completeDrag: function(inEvent) {
		if (this.value !== this.calcMax() && this.value != this.calcMin()) {
			this.animateToMinMax(inEvent.dragInfo.minimizing);
		}
	},
	// animation
	isAnimating: function() {
		return this.$.animator.isAnimating();
	},
	play: function(inStart, inEnd) {
		this.$.animator.play({
			startValue: inStart,
			endValue: inEnd,
			node: this.hasNode()
		});
	},
	//* @public
	//* Animate to the given value.
	animateTo: function(inValue) {
		this.play(this.value, inValue);
	},
	//* Animate to the minimum value
	animateToMin: function() {
		this.animateTo(this.calcMin());
	},
	//* Animate to the maximum value
	animateToMax: function() {
		this.animateTo(this.calcMax());
	},
	//* @protected
	animateToMinMax: function(inMin) {
		if (inMin) {
			this.animateToMin();
		} else {
			this.animateToMax();
		}
	},
	animatorStep: function(inSender) {
		this.setValue(inSender.value);
		return true;
	},
	animatorComplete: function(inSender) {
		this.doAnimateFinish(inSender);
		return true;
	},
	//* @public
	//* Toggle between min and max with animation.
	toggleMinMax: function() {
		this.animateToMinMax(!this.isAtMin());
	}
});