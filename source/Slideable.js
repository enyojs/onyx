/**
	Drags and animates a transform between a min and max value.
*/
enyo.kind({
	name: "enyo.Slideable",
	kind: enyo.Control,
	published: {
		axis: "h",
		value: 0,
		unit: "px",
		min: 0,
		max: 0,
		accelerated: "auto",
		overMoving: true,
		draggable: true
	},
	preventDragPropagation: false,
	events: {
		onAnimateFinish: ""
	},
	handlers: {
		ondragstart: "dragstartHandler",
		ondrag: "dragHandler",
		ondragfinish: "dragfinishHandler"
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
	rendered: function() {
		this.inherited(arguments);
		this.updateDragScalar();
	},
	teardownRender: function() {
		this.inherited(arguments);
		if (this.animation) {
			this.animator.node = null;
		}
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
	dragstartHandler: function(inSender, inEvent) {
		if (this.shouldDrag(inEvent)) {
			this.stop();
			inEvent.dragInfo = {};
			this.dragging = true;
			this.drag0 = this.value;
			this.dragd0 = 0;
			return this.preventDragPropagation;
		}
	},
	dragHandler: function(inSender, inEvent) {
		if (this.dragging) {
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
	dragfinishHandler: function(inSender, inEvent) {
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
		return this.animation;
	},
	play: function(inStart, inEnd) {
		this.animation = new enyo.Animation({
			startValue: inStart,
			endValue: inEnd,
			node: this.hasNode(),
			context: this,
			onStep: function(inEvent) {
				this.setValue(inEvent.value);
			},
			onEnd: this.animationComplete
		}).play();
	},
	stop: function() {
		if (this.animation) {
			this.animation.stop();
			this.animation = null;
		}
	},
	animateTo: function(inValue) {
		this.play(this.value, inValue);
	},
	animateToMin: function() {
		this.animateTo(this.calcMin());
	},
	animateToMax: function() {
		this.animateTo(this.calcMax());
	},
	animateToMinMax: function(inMin) {
		if (inMin) {
			this.animateToMin();
		} else {
			this.animateToMax();
		}
	},
	animationComplete: function(inEvent) {
		this.doAnimateFinish(inEvent);
	},
	toggleMinMax: function() {
		this.animateToMinMax(!this.isAtMin());
	}
});