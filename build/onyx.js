
// minifier: path aliases

enyo.path.addPaths({css: "../source/css/"});

// Animator.js

enyo.kind({
name: "enyo.Animator",
kind: "Component",
published: {
duration: 350,
startValue: 0,
endValue: 1,
node: null,
easingFunction: enyo.easing.cubicOut
},
events: {
onStep: "",
onEnd: "",
onStop: ""
},
constructed: function() {
this.inherited(arguments), this._next = enyo.bind(this, "next");
},
destroy: function() {
this.stop(), this.inherited(arguments);
},
play: function(a) {
return this.stop(), a && enyo.mixin(this, a), this.t0 = this.t1 = enyo.now(), this.value = this.startValue, this.job = !0, this.requestNext(), this;
},
stop: function() {
if (this.isAnimating()) return this.cancel(), this.fire("onStop"), this;
},
isAnimating: function() {
return Boolean(this.job);
},
requestNext: function() {
this.job = enyo.requestAnimationFrame(this._next, this.node);
},
cancel: function() {
enyo.cancelRequestAnimationFrame(this.job), this.node = null, this.job = null;
},
shouldEnd: function() {
return this.dt >= this.duration;
},
next: function() {
this.t1 = enyo.now(), this.dt = this.t1 - this.t0;
var a = this.fraction = enyo.easedLerp(this.t0, this.duration, this.easingFunction);
this.value = this.startValue + a * (this.endValue - this.startValue), a >= 1 || this.shouldEnd() ? (this.value = this.endValue, this.fraction = 1, this.fire("onStep"), this.fire("onEnd"), this.cancel()) : (this.fire("onStep"), this.requestNext());
},
fire: function(a) {
var b = this[a];
enyo.isString(b) ? this.bubble(a) : b && b.call(this.context || window, this);
}
});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: ""
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged();
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable"
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
create: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
published: {
active: !1,
value: !1,
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondown: "downHandler"
},
create: function() {
this.inherited(arguments), this.valueChanged(), this.disabledChanged();
},
contentChanged: function() {},
disabledChanged: function() {
this.setAttribute("disabled", this.disabled);
},
valueChanged: function() {
this.addRemoveClass("onyx-checkbox-checked", this.value), this.setActive(this.value);
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
downHandler: function(a, b) {
return this.disabled || (this.setValue(!this.value), this.doChange({
value: this.value
})), !0;
},
tap: function(a, b) {
return !this.disabled;
}
});

// FloatingLayer.js

enyo.kind({
name: "onyx.FloatingLayer",
create: function() {
this.inherited(arguments), this.setParent(null);
},
render: function() {
return this.parentNode = document.body, this.inherited(arguments);
},
generateInnerHtml: function() {
return "";
},
beforeChildRender: function() {
this.hasNode() || this.render();
},
teardownChildren: function() {}
}), onyx.floatingLayer = new onyx.FloatingLayer({
classes: "onyx"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
classes: "onyx-popup",
published: {
modal: !1,
autoDismiss: !0,
floating: !1,
centered: !1
},
showing: !1,
handlers: {
ondown: "down",
onkeydown: "keydown",
onfocus: "focus",
onblur: "blur",
onRequestShow: "requestShow",
onRequestHide: "requestHide"
},
captureEvents: !0,
events: {
onShow: "",
onHide: ""
},
tools: [ {
kind: "Signals",
onKeydown: "keydown"
} ],
create: function() {
this.inherited(arguments), this.floating && this.setParent(onyx.floatingLayer);
},
destroy: function() {
this.showing && this.release(), this.inherited(arguments);
},
getBubbleTarget: function() {
return this.floating ? this.owner : this.inherited(arguments);
},
reflow: function() {
this.updatePosition(), this.inherited(arguments);
},
calcViewportSize: function() {
if (window.innerWidth) return {
width: window.innerWidth,
height: window.innerHeight
};
var a = document.documentElement;
return {
width: a.offsetWidth,
height: a.offsetHeight
};
},
updatePosition: function() {
if (this.centered) {
var a = this.calcViewportSize(), b = this.getBounds();
this.addStyles("top: " + (a.height - b.height) / 2 + "px; left: " + (a.width - b.width) / 2 + "px;");
}
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.centered && this.applyStyle("visibility", "hidden"), this.inherited(arguments), this.showing ? (this.reflow(), this.captureEvents && this.capture()) : this.captureEvents && this.release(), this.centered && this.applyStyle("visibility", null), this.hasNode() && this[this.showing ? "doShow" : "doHide"]();
},
capture: function() {
enyo.dispatcher.capture(this, !this.modal);
},
release: function() {
enyo.dispatcher.release();
},
down: function(a, b) {
this.modal && !b.dispatchTarget.isDescendantOf(this) && b.preventDefault();
},
tap: function(a, b) {
if (this.autoDismiss && !b.dispatchTarget.isDescendantOf(this)) return this.hide(), !0;
},
keydown: function(a, b) {
this.showing && this.autoDismiss && b.keyCode == 27 && this.hide();
},
blur: function(a, b) {
b.dispatchTarget.isDescendantOf(this) && (this.lastFocus = b.originator);
},
focus: function(a, b) {
var c = b.dispatchTarget;
if (this.modal && !c.isDescendantOf(this)) {
c.hasNode() && c.node.blur();
var d = this.lastFocus && this.lastFocus.hasNode() || this.hasNode();
d && d.focus();
}
},
requestShow: function(a, b) {
return this.show(), !0;
},
requestHide: function(a, b) {
return this.hide(), !0;
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input",
defaultFocus: !1,
rendered: function() {
this.inherited(arguments), this.defaultFocus && this.focus();
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea",
defaultFocus: !1,
rendered: function() {
this.inherited(arguments), this.defaultFocus && this.focus();
}
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext",
defaultFocus: !1,
rendered: function() {
this.inherited(arguments), this.defaultFocus && this.focus();
}
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
receiveFocus: function() {
this.addClass("onyx-focused");
},
receiveBlur: function() {
this.removeClass("onyx-focused");
},
disabledChange: function(a, b) {
this.addRemoveClass("onyx-disabled", b.originator.disabled);
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
highlander: !0,
defaultKind: "onyx.RadioButton"
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.valueChanged(), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
valueChanged: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value);
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(a) {
this.disabled || (this.setValue(a), this.doChange({
value: this.value
}));
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(a, b) {
if (b.horizontal) return b.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(a, b) {
if (this.dragging) {
var c = b.dx;
return Math.abs(c) > 10 && (this.updateValue(c > 0), this.dragged = !0), !0;
}
},
dragfinish: function(a, b) {
this.dragging = !1, this.dragged && b.preventTap();
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline"
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(a) {
this.$.bar.removeClass(a), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var a = this.calcPercent(this.progress);
this.updateBarPosition(a);
},
clampValue: function(a, b, c) {
return Math.max(a, Math.min(c, b));
},
calcRatio: function(a) {
return (a - this.min) / (this.max - this.min);
},
calcPercent: function(a) {
return this.calcRatio(a) * 100;
},
updateBarPosition: function(a) {
this.$.bar.applyStyle("width", a + "%");
},
animateProgressTo: function(a) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: a,
node: this.hasNode()
});
},
progressAnimatorStep: function(a) {
return this.setProgress(a.value), !0;
},
progressAnimatorComplete: function(a) {
return this.doAnimateProgressFinish(a), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var a = this.calcPercent(this.value);
this.updateKnobPosition(a), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(a) {
this.$.knob.applyStyle("left", a + "%");
},
calcKnobPosition: function(a) {
var b = a.clientX - this.hasNode().getBoundingClientRect().left;
return b / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(a, b) {
if (b.horizontal) return b.preventDefault(), this.dragging = !0, !0;
},
drag: function(a, b) {
if (this.dragging) {
var c = this.calcKnobPosition(b);
return this.setValue(c), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(a, b) {
return this.dragging = !1, b.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(a, b) {
if (this.tappable) {
var c = this.calcKnobPosition(b);
return this.tapped = !0, this.animateTo(c), !0;
}
},
animateTo: function(a) {
this.$.animator.play({
startValue: this.value,
endValue: a,
node: this.hasNode()
});
},
animatorStep: function(a) {
return this.setValue(a.value), !0;
},
animatorComplete: function(a) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(a), !0;
}
});

// Slideable.js

enyo.kind({
name: "onyx.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
updateDragScalar: function() {
if (this.unit == "%") {
var a = this.getBounds()[this.dimension];
this.kDragScalar = a ? 100 / a : 1;
}
},
acceleratedChanged: function() {
enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var a = this.axis == "h";
this.dragMoveProp = a ? "dx" : "dy", this.shouldDragProp = a ? "horizontal" : "vertical", this.transform = a ? "translateX" : "translateY", this.dimension = a ? "width" : "height";
},
valueChanged: function() {
var a = this.value;
this.isOob(a) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(a) : this.clampValue(a)), enyo.dom.transformValue(this, this.transform, this.value + this.unit), this.doChange();
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
clampValue: function(a) {
var b = this.calcMin(), c = this.calcMax();
return Math.max(b, Math.min(a, c));
},
dampValue: function(a) {
return this.dampBound(this.dampBound(a, this.min, 1), this.max, -1);
},
dampBound: function(a, b, c) {
var d = a;
return d * c < b * c && (d = b + (d - b) / 4), d;
},
shouldDrag: function(a) {
return this.draggable && a[this.shouldDragProp];
},
isOob: function(a) {
return a > this.calcMax() || a < this.calcMin();
},
dragstart: function(a, b) {
if (this.shouldDrag(b)) return b.preventDefault(), this.$.animator.stop(), b.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(a, b) {
if (this.dragging) {
b.preventDefault();
var c = b[this.dragMoveProp] * this.kDragScalar, d = this.drag0 + c, e = c - this.dragd0;
return this.dragd0 = c, e && (b.dragInfo.minimizing = e < 0), this.setValue(d), this.preventDragPropagation;
}
},
dragfinish: function(a, b) {
if (this.dragging) return this.dragging = !1, this.completeDrag(b), b.preventTap(), this.preventDragPropagation;
},
completeDrag: function(a) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(a.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(a, b) {
this.$.animator.play({
startValue: a,
endValue: b,
node: this.hasNode()
});
},
animateTo: function(a) {
this.play(this.value, a);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(a) {
a ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(a) {
return this.setValue(a.value), !0;
},
animatorComplete: function(a) {
return this.doAnimateFinish(a), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});
