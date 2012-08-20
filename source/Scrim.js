﻿/**
	_onyx.Scrim_ provides an overlay that will prevent taps from propagating to
	controls that it covers.  A Scrim can be "floating" or not.  Floating Scrims
	will fill the entire viewport, while non-floating Scrims will be constrained
	by their container.

	The Scrim should have a CSS class of "onyx-scrim-transparent", "onyx-scrim-translucent",
	or any other class that has pointer-events: auto in its style properties.

	You may specify at which Z-index you want the Scrim to occupy with the _showAtZIndex_
	method, but you will need to use _hideAtZIndex_  with the same value when you want to
	hide it again.
*/

enyo.kind({
	name: "onyx.Scrim",
	//* Current visibility state of scrim
	showing: false,
	classes: "onyx-scrim enyo-fit",
	/**
	    If true, scrim is rendered in a floating layer outside of other
	    controls. This can be used to guarantee that the scrim will be shown
	    on top of other controls.
	*/
	floating: false,
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.zStack = [];
		if (this.floating) {
			this.setParent(enyo.floatingLayer);
		}
	},
	showingChanged: function() {
	// auto render when shown.
		if (this.floating && this.showing && !this.hasNode()) {
			this.render();
		}
		this.inherited(arguments);
		//this.addRemoveClass(this.showingClassName, this.showing);
	},
	//* @protected
	addZIndex: function(inZIndex) {
		if (enyo.indexOf(inZIndex, this.zStack) < 0) {
			this.zStack.push(inZIndex);
		}
	},
	removeZIndex: function(inControl) {
		enyo.remove(inControl, this.zStack);
	},
	//* @public
	//* Shows Scrim at the specified z-index.  Note: If you use showAtZIndex, you
	//*  must call hideAtZIndex to properly unwind the z-index stack.
	showAtZIndex: function(inZIndex) {
		this.addZIndex(inZIndex);
		if (inZIndex !== undefined) {
			this.setZIndex(inZIndex);
		}
		this.show();
	},
	//* Hides Scrim at the specified z-Index.
	hideAtZIndex: function(inZIndex) {
		this.removeZIndex(inZIndex);
		if (!this.zStack.length) {
			this.hide();
		} else {
			var z = this.zStack[this.zStack.length-1];
			this.setZIndex(z);
		}
	},
	//* @protected
	// Set scrim to show at `inZIndex`
	setZIndex: function(inZIndex) {
		this.zIndex = inZIndex;
		this.applyStyle("z-index", inZIndex);
	},
	make: function() {
		return this;
	}
});

//* @protected
//
// Scrim singleton exposing a subset of Scrim API. 
// is replaced with a proper enyo.Scrim instance.
//
enyo.kind({
	name: "onyx.scrimSingleton",
	kind: null,
	constructor: function(inName, inProps) {
		this.instanceName = inName;
		enyo.setObject(this.instanceName, this);
		this.props = inProps || {};
	},
	make: function() {
		var s = new onyx.Scrim(this.props);
		enyo.setObject(this.instanceName, s);
		return s;
	},
	showAtZIndex: function(inZIndex) {
		var s = this.make();
		s.showAtZIndex(inZIndex);
	},
	// in case somebody does this out of order
	hideAtZIndex: enyo.nop,
	show: function() {
		var s = this.make();
		s.show();
	}
});

new onyx.scrimSingleton("onyx.scrim", {floating: true, classes: "onyx-scrim-translucent"});
new onyx.scrimSingleton("onyx.scrimTransparent", {floating: true, classes: "onyx-scrim-transparent"});
