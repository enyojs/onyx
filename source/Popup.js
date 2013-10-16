/**
	_onyx.Popup_ is an enhanced [enyo.Popup](#enyo.Popup) with built-in scrim and
	z-index handling.

	To avoid obscuring popup contents, scrims require the dialog to be floating;
	otherwise, they won't render. A modal popup will get a transparent scrim
	unless the popup isn't floating. To get a translucent scrim	when modal,
	specify _scrim: true, scrimWhenModal: false_.

	For more information, see the documentation on
	[Popups](building-apps/controls/popups.html) in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.Popup",
	kind: "enyo.Popup",
	classes: "onyx-popup",
	published: {
		/**
			Determines whether a scrim will appear when the dialog is modal.
			Note that modal scrims are transparent, so you won't see them.
		*/
		scrimWhenModal: true,
		//* Determines whether or not to display a scrim. Only displays scrims
		//* when floating.
		scrim: false,
		/**
			Optional class name to apply to the scrim. Be aware that the scrim
			is a singleton and you will be modifying the scrim instance used for
			other popups.
		*/
		scrimClassName: ""
	},
	//* @protected
	protectedStatics: {
		count: 0,
		highestZ: 120
	},
	defaultZ: 120,
	showingChanged: function() {
		if(this.showing) {
			onyx.Popup.count++;
			this.applyZIndex();
		}
		else {
			if(onyx.Popup.count > 0) {
				onyx.Popup.count--;
			}
		}
		this.showHideScrim(this.showing);
		this.inherited(arguments);
	},
	showHideScrim: function(inShow) {
		if (this.floating && (this.scrim || (this.modal && this.scrimWhenModal))) {
			var scrim = this.getScrim();
			if (inShow) {
				// move scrim to just under the popup to obscure rest of screen
				var i = this.getScrimZIndex();
				this._scrimZ = i;
				scrim.showAtZIndex(i);
			} else {
				scrim.hideAtZIndex(this._scrimZ);
			}
			enyo.call(scrim, "addRemoveClass", [this.scrimClassName, scrim.showing]);
		}
	},
	getScrimZIndex: function() {
		// Position scrim directly below popup
		return onyx.Popup.highestZ >= this._zIndex ? this._zIndex - 1 : onyx.Popup.highestZ;
	},
	getScrim: function() {
		// show a transparent scrim for modal popups if scrimWhenModal is true
		// if scrim is true, then show a regular scrim.
		if (this.modal && this.scrimWhenModal && !this.scrim) {
			return onyx.scrimTransparent.make();
		}
		return onyx.scrim.make();
	},
	applyZIndex: function() {
		// Adjust the zIndex so that popups will properly stack on each other.
		this._zIndex = (onyx.Popup.count * 2) + this.findZIndex() + 1;
		if (this._zIndex <= onyx.Popup.highestZ) {
			this._zIndex = onyx.Popup.highestZ + 1;
		}
		if (this._zIndex > onyx.Popup.highestZ) {
			onyx.Popup.highestZ = this._zIndex;
		}
		// leave room for scrim
		this.applyStyle("z-index", this._zIndex);
	},
	findZIndex: function() {
		// a default z value
		var z = this.defaultZ;
		if (this._zIndex) {
			z = this._zIndex;
		} else if (this.hasNode()) {
			// Re-use existing zIndex if it has one
			z = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || z;
		}
		if (z < this.defaultZ) {
			z = this.defaultZ;
		}
		this._zIndex = z;
		return this._zIndex;
	}
});
