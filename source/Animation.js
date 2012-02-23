//* @protected
enyo.kind({
	name: "enyo.Animation",
	kind: null,
	duration: 350,
	startValue: 0,
	endValue: 1,
	alwaysAnimate: false,
	easingFunc: enyo.easing.cubicOut,
	constructed: function(inProps) {
		enyo.mixin(this, inProps);
		this._next = enyo.bind(this, "next");
	},
	play: function(inProps) {
		this.stop();
		if (inProps) {
			enyo.mixin(this, inProps);
		}
		this.t0 = this.t1 = new Date().getTime();
		this.value = this.startValue;
		this.job = true;
		this.requestNext();
		return this;
	},
	requestNext: function() {
		this.job = enyo.requestAnimationFrame(this._next, this.alwaysAnimate ? null : this.node);
	},
	cancel: function() {
		enyo.cancelRequestAnimationFrame(this.job);
		this.node = null;
		this.job = null;
	},
	stop: function() {
		if (this.job) {
			this.cancel();
			this.fire("onStop");
			return this;
		}
	},
	shouldEnd: function() {
		return (this.dt >= this.duration);
	},
	next: function() {
		this.t1 = new Date().getTime();
		this.dt = this.t1 - this.t0;
		// time independent
		var f = this.fraction = enyo.easedLerp(this.t0, this.duration, this.easingFunc);
		this.value = this.startValue + f * (this.endValue - this.startValue);
		if (f >= 1 || this.shouldEnd()) {
			this.value = this.endValue;
			this.fraction = 1;
			this.fire("onStep");
			this.fire("onEnd");
			this.cancel();
		} else {
			this.fire("onStep");
			this.requestNext();
		}
	},
	fire: function(inEventName) {
		var fn = this[inEventName];
		if (enyo.isString(fn)) {
			fn = this.context && this.context[fn];
		}
		if (fn) {
			fn.call(this.context || window, this);
		}
	},
	isAnimating: function() {
		return this.job;
	}
});